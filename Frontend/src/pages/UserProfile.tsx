import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, LogOut, Package, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const UserProfile = () => {
    const { user, addresses, logout, addAddress, deleteAddress } = useAuth();
    const navigate = useNavigate();
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "", phone: "", pincode: "", addressLine: "",
    });

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault();
        addAddress(newAddress);
        setShowAddressForm(false);
        setNewAddress({ name: "", phone: "", pincode: "", addressLine: "" });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-2">
                        <div className="bg-card border rounded-lg p-6 text-center shadow-sm">
                            <Avatar className="w-20 h-20 mx-auto mb-4">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="text-xl bg-primary/10 text-primary font-bold">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="font-bold text-lg">{user.name}</h2>
                            <p className="text-sm text-muted-foreground truncate">
                                {user.email || user.mobile || user.phone || "No email provided"}
                            </p>
                        </div>

                        <nav className="flex flex-col gap-1">
                            <Link to="/orders">
                                <Button variant="ghost" className="w-full justify-start">
                                    <Package className="mr-2 h-4 w-4" /> My Orders
                                </Button>
                            </Link>
                            <Button variant="ghost" className="w-full justify-start bg-accent/50">
                                <User className="mr-2 h-4 w-4" /> Profile & Addresses
                            </Button>
                            <Separator className="my-2" />
                            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50" onClick={() => {
                                logout();
                                navigate("/");
                            }}>
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        {/* Profile Details */}
                        <section className="bg-card border rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <Label>Full Name</Label>
                                    <div className="p-2 bg-muted/30 rounded border text-sm min-h-[38px] flex items-center">{user.name || "—"}</div>
                                </div>
                                <div className="space-y-1">
                                    <Label>Email</Label>
                                    <div className="p-2 bg-muted/30 rounded border text-sm min-h-[38px] flex items-center">
                                        {user.email || "Not provided"}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label>Mobile Number</Label>
                                    <div className="p-2 bg-muted/30 rounded border text-sm min-h-[38px] flex items-center">
                                        {user.mobile || user.phone || "Not provided"}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Addresses */}
                        <section className="bg-card border rounded-lg p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Saved Addresses</h3>
                                <Button size="sm" onClick={() => setShowAddressForm(!showAddressForm)} variant={showAddressForm ? "secondary" : "default"}>
                                    {showAddressForm ? "Cancel" : "Add New"}
                                </Button>
                            </div>

                            {showAddressForm && (
                                <form onSubmit={handleAddAddress} className="bg-muted/20 p-4 rounded-lg border mb-6 space-y-4 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Name</Label>
                                            <Input required value={newAddress.name} onChange={e => setNewAddress({ ...newAddress, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input required value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Pincode</Label>
                                            <Input required value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Address Area / Street</Label>
                                            <Input required value={newAddress.addressLine} onChange={e => setNewAddress({ ...newAddress, addressLine: e.target.value })} />
                                        </div>
                                    </div>
                                    <Button type="submit" size="sm">Save Address</Button>
                                </form>
                            )}

                            {addresses.length === 0 ? (
                                <p className="text-muted-foreground text-sm italic">No saved addresses.</p>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {addresses.map(addr => (
                                        <div key={addr.id} className="border rounded-lg p-4 relative group">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-4 w-4 text-primary mt-1" />
                                                <div className="text-sm">
                                                    <p className="font-bold">{addr.name}</p>
                                                    <p className="text-muted-foreground">{addr.addressLine}</p>
                                                    <p className="text-muted-foreground">{addr.pincode}</p>
                                                    <p className="text-muted-foreground">Ph: {addr.phone}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => deleteAddress(addr.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserProfile;
