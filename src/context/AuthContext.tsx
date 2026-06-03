import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { toast } from "sonner";
import { hapticFeedback } from "@/utils/haptics";
import { api } from "@/api/api";
import AuthModal from "@/components/auth/AuthModal";

export interface UserProfile {
    name: string;
    email: string;
    phone?: string;
    mobile?: string;
    avatar?: string;
    is_staff?: boolean;
}

export interface Address {
    id: string;
    name: string;
    phone: string;
    pincode: string;
    addressLine: string;
    isDefault?: boolean;
}

export interface Order {
    id: string;
    date: string;
    items: any[];
    total: number;
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
    paymentMethod: string;
}

interface AuthContextType {
    user: UserProfile | null;
    isLoggedIn: boolean;
    addresses: Address[];
    orders: Order[];
    login: (provider: "email" | "google" | "facebook" | "amazon", data?: any) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
    addAddress: (address: Omit<Address, "id">) => void;
    deleteAddress: (id: string) => void;
    addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
    openAuthModal: (tab?: "login" | "signup") => void;
    closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    // Load data from local storage on mount
    // Load data from local storage on mount and initialize guest
    useEffect(() => {
        const storedUser = localStorage.getItem("kc_user");
        const storedAddresses = localStorage.getItem("kc_addresses");
        const storedOrders = localStorage.getItem("kc_orders");
        const storedToken = localStorage.getItem("kc_token");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedAddresses) setAddresses(JSON.parse(storedAddresses));
        if (storedOrders) setOrders(JSON.parse(storedOrders));

        // Initialize Guest Session if no token exists
        if (!storedToken) {
            const initGuest = async () => {
                try {
                    // distinct import to avoid circular dependency if possible, or move authApi usage inside
                    // For now, assuming authApi is safe to use here
                    const { authApi } = await import("@/api/auth");
                    const res = await authApi.createGuest();
                    localStorage.setItem("kc_token", res.token);
                    localStorage.setItem("kc_guest_id", res.guest_id);
                    console.log("Guest session initialized:", res.guest_id);
                } catch (error) {
                    console.error("Failed to initialize guest session", error);
                }
            };
            initGuest();
        }
    }, []);

    // Update local storage when state changes
    useEffect(() => {
        if (user) localStorage.setItem("kc_user", JSON.stringify(user));
        else localStorage.removeItem("kc_user");
    }, [user]);

    useEffect(() => {
        localStorage.setItem("kc_addresses", JSON.stringify(addresses));
    }, [addresses]);

    useEffect(() => {
        localStorage.setItem("kc_orders", JSON.stringify(orders));
    }, [orders]);

    const checkAuth = useCallback(async () => {
        try {
            const res = await api.get<{ is_authenticated: boolean, user?: UserProfile }>('/check-auth/');
            if (res.is_authenticated && res.user) {
                setUser(res.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            // silent fail
        }
    }, []);

    const login = async (provider: string, data?: any) => {
        if (provider === "email") {
            try {
                const res = await api.post<{ success: boolean, token?: string, user: UserProfile, message?: string }>('/api/accounts/login/', {
                    username: data.username,
                    password: data.password
                });

                if (res.success && res.token) {
                    localStorage.setItem("kc_token", res.token);
                    setUser(res.user);
                    hapticFeedback.success();
                    toast.success(`Welcome back, ${res.user.name}!`);
                } else {
                    throw new Error(res.message || "Login failed");
                }
            } catch (error: any) {
                toast.error(error.message || "Login failed");
                throw error;
            }
        } else if (provider === "google") {
            try {
                const res = await api.post<{ success: boolean, access?: string, user: UserProfile, message?: string }>('/api/accounts/auth/google/', {
                    token: data.token
                });

                if (res.success && res.access) {
                    localStorage.setItem("kc_token", res.access);
                    setUser(res.user);
                    hapticFeedback.success();
                    toast.success(`Welcome back, ${res.user.name}!`);
                } else {
                    throw new Error(res.message || "Google Login failed");
                }
            } catch (error: any) {
                toast.error(error.message || "Google Login failed");
                throw error;
            }
        } else {
            // Social login simulation
            let mockUser: UserProfile;
            if (provider === "facebook") {
                mockUser = { name: "Surya Dev", email: "surya.fb@example.com" };
            } else if (provider === "amazon") {
                mockUser = { name: "Surya Amazon", email: "surya.amz@example.com" };
            } else {
                mockUser = { name: "Demo User", email: data?.email || "user@example.com" };
            }
            setUser(mockUser);
            hapticFeedback.success();
            toast.success(`Welcome back, ${mockUser.name}!`);
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/accounts/logout/', {});
            localStorage.removeItem("kc_token");
        } catch (e) {
            console.error(e);
        }
        setUser(null);
        hapticFeedback.light();
        toast.info("Logged out successfully");
    };

    const addAddress = (newAddress: Omit<Address, "id">) => {
        const address: Address = { ...newAddress, id: Date.now().toString() };
        setAddresses((prev) => [...prev, address]);
        toast.success("Address saved");
    };

    const deleteAddress = (id: string) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        toast.success("Address removed");
    };

    const signup = async (data: any) => {
        try {
            const guestId = localStorage.getItem("kc_guest_id");
            const payload = { ...data, guest_id: guestId };
            const res = await api.post<{ success: boolean, token?: string, user: UserProfile, message?: string }>('/api/accounts/signup/', payload);

            if (res.success && res.token) {
                localStorage.setItem("kc_token", res.token);
                // Clear guest ID as it is now merged/deleted
                localStorage.removeItem("kc_guest_id");

                setUser(res.user);
                hapticFeedback.success();
                toast.success(`Account created! Welcome, ${res.user.name}`);
            } else {
                throw new Error(res.message || "Signup failed");
            }
        } catch (error: any) {
            toast.error(error.message || "Signup failed");
            throw error;
        }
    };

    const addOrder = (newOrder: Omit<Order, "id" | "date" | "status">) => {
        const order: Order = {
            ...newOrder,
            id: "ORD-" + Math.floor(Math.random() * 100000),
            date: new Date().toISOString(),
            status: "Processing",
        };
        setOrders((prev) => [order, ...prev]);
    };

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

    const openAuthModal = (tab: "login" | "signup" = "login") => {
        setAuthModalTab(tab);
        setShowAuthModal(true);
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
    };

    // Lazy load the modal logic via standard import at top if possible, 
    // but to avoid circular deps during dev, we imported it? 
    // Wait, AuthModal uses useAuth, so circularly importing it here might be tricky if AuthModal is defined in value.
    // Actually, AuthModal uses useAuth. AuthProvider renders AuthModal. 
    // This is fine as long as AuthContext is defined first.
    // We need to import AuthModal at the top of file.

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                addresses,
                orders,
                login,
                signup,
                logout,
                checkAuth,
                addAddress,
                deleteAddress,
                addOrder,
                openAuthModal,
                closeAuthModal,
            }}
        >
            {children}
            <AuthModal
                isOpen={showAuthModal}
                onClose={closeAuthModal}
                defaultTab={authModalTab}
            />
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
