import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const AdminRoute = () => {
    const { isLoggedIn, user, checkAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            await checkAuth();
            setIsLoading(false);
        };
        verify();
    }, [checkAuth]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!isLoggedIn || !user?.is_staff) {
        toast({
            title: "Access Denied",
            description: "You must be an admin to access this area.",
            variant: "destructive",
        });
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
