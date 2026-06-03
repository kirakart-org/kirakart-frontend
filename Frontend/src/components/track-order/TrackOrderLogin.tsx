import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TrackOrderLogin = () => {
    const [orderId, setOrderId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) {
            toast.error("Please enter an Order ID");
            return;
        }
        navigate(`/track-order/${orderId}`);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-xl card-shadow border animate-fade-in">
            <div className="text-center mb-6">
                <h2 className="text-xl font-serif font-bold mb-2">Track Your Order</h2>
                <p className="text-sm text-muted-foreground">Enter your Order ID to see where your saree is.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="orderId">Order ID</Label>
                    <Input
                        id="orderId"
                        placeholder="e.g. SRK-1234"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="uppercase"
                    />
                </div>
                <Button type="submit" className="w-full tap-target" size="lg">
                    Track Status
                </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-4">
                Can't find your Order ID? Check your SMS or Email.
            </p>
        </div>
    );
};

export default TrackOrderLogin;
