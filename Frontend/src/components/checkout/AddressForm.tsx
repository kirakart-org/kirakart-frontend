import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const AddressForm = () => {
    const { user, addresses } = useAuth();
    const [selectedAddressId, setSelectedAddressId] = useState<string>("new");
    const [isNewAddress, setIsNewAddress] = useState(true);

    useEffect(() => {
        if (addresses.length > 0) {
            setSelectedAddressId(addresses[0].id);
            setIsNewAddress(false);
        }
    }, [addresses]);

    const handleAddressChange = (value: string) => {
        setSelectedAddressId(value);
        setIsNewAddress(value === "new");
    };

    return (
        <div className="space-y-4 animate-fade-in">
            {addresses.length > 0 && (
                <div className="mb-6 space-y-3">
                    <Label className="text-base">Saved Addresses</Label>
                    <RadioGroup value={selectedAddressId} onValueChange={handleAddressChange} className="grid grid-cols-1 gap-3">
                        {addresses.map((addr) => (
                            <div key={addr.id} className={cn(
                                "flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all cursor-pointer",
                                selectedAddressId === addr.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "hover:border-primary/50"
                            )}
                                onClick={() => handleAddressChange(addr.id)}
                            >
                                <RadioGroupItem value={addr.id} id={addr.id} className="mt-1" />
                                <div className="grid gap-1.5 cursor-pointer">
                                    <Label htmlFor={addr.id} className="font-semibold cursor-pointer">
                                        {addr.name}
                                    </Label>
                                    <p className="text-sm text-muted-foreground w-full break-words">
                                        {addr.addressLine} - {addr.pincode}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                                </div>
                            </div>
                        ))}

                        <div className={cn(
                            "flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-all",
                            isNewAddress ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "hover:border-primary/50"
                        )}
                            onClick={() => handleAddressChange("new")}
                        >
                            <RadioGroupItem value="new" id="new-address" />
                            <Label htmlFor="new-address" className="font-semibold flex items-center gap-2 cursor-pointer">
                                <Plus className="h-4 w-4" /> Add New Address
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            )}

            {isNewAddress && (
                <div className={cn("grid grid-cols-1 gap-4", addresses.length > 0 && "pt-4 border-t animate-in fade-in slide-in-from-top-2")}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" className="bg-muted/30" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                +91
                            </span>
                            <Input id="phone" placeholder="98765 43210" className="rounded-l-none bg-muted/30" type="tel" maxLength={10} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="560001" className="bg-muted/30" maxLength={6} type="tel" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address (Area and Street)</Label>
                        <Input id="address" placeholder="Flat 101, Silk Apartments, MG Road" className="bg-muted/30 h-20" />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="save-address" defaultChecked />
                        <Label htmlFor="save-address" className="text-sm font-normal text-muted-foreground">Save this address for future</Label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressForm;
