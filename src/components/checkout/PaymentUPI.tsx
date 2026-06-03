import { useState } from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Smartphone } from "lucide-react";

interface PaymentUPIProps {
    /** The currently selected RadioGroup value from the parent */
    value: string;
}

const UPI_APPS = [
    {
        id: "gpay",
        label: "Google Pay",
        icon: (
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                alt="GPay"
                className="w-7 h-7"
            />
        ),
        bg: "bg-white",
    },
    {
        id: "phonepe",
        label: "PhonePe",
        icon: (
            <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <rect width="40" height="40" rx="20" fill="#5f259f" />
                <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                    Pe
                </text>
            </svg>
        ),
        bg: "bg-indigo-50",
    },
    {
        id: "paytm",
        label: "Paytm",
        icon: (
            <svg viewBox="0 0 40 14" className="w-16 h-5" fill="none">
                <text x="0" y="12" fill="#00BAF2" fontSize="14" fontWeight="bold" fontFamily="Arial">
                    Paytm
                </text>
            </svg>
        ),
        bg: "bg-sky-50",
    },
] as const;

const PaymentUPI = ({ value }: PaymentUPIProps) => {
    const [upiId, setUpiId] = useState("");
    const [upiError, setUpiError] = useState("");

    const validateUPI = (id: string) => {
        // basic UPI ID validation: something@something
        if (!id) return "";
        const valid = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(id);
        return valid ? "" : "Enter a valid UPI ID (e.g. name@upi)";
    };

    return (
        <div className="space-y-4 animate-fade-in">
            {/* ── App shortcut buttons ─────────────────────── */}
            <div className="grid grid-cols-3 gap-3">
                {UPI_APPS.map((app) => (
                    <div key={app.id} className="relative">
                        <RadioGroupItem
                            value={app.id}
                            id={app.id}
                            className="peer sr-only"
                        />
                        <Label
                            htmlFor={app.id}
                            className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all h-24 tap-feedback",
                                "border-muted hover:border-primary/40 hover:bg-accent/40",
                                "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-sm",
                                app.bg
                            )}
                        >
                            <div className="w-11 h-11 rounded-full flex items-center justify-center mb-2 shadow-sm bg-white">
                                {app.icon}
                            </div>
                            <span className="text-xs font-semibold text-center leading-tight">
                                {app.label}
                            </span>
                        </Label>
                    </div>
                ))}
            </div>

            {/* ── Enter UPI ID manually ─────────────────────── */}
            <div className="relative">
                <RadioGroupItem value="upi" id="upi-id-option" className="peer sr-only" />
                <Label
                    htmlFor="upi-id-option"
                    className={cn(
                        "block rounded-xl border-2 p-4 cursor-pointer transition-all",
                        "border-muted hover:border-primary/40",
                        "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                    )}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Smartphone className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">Other UPI ID</span>
                    </div>

                    {/* Show input only when this option is selected */}
                    {value === "upi" && (
                        <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                            <Input
                                id="upi-id-input"
                                placeholder="yourname@upi"
                                value={upiId}
                                className="bg-background text-sm h-9"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUpiId(val);
                                    setUpiError(validateUPI(val));
                                }}
                            />
                            {upiError && (
                                <p className="text-xs text-destructive">{upiError}</p>
                            )}
                        </div>
                    )}
                </Label>
            </div>

            {/* ── Security note ─────────────────────────────── */}
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                </div>
                <p className="text-xs text-green-700 font-medium">
                    Lightning fast &amp; 100% Secure — powered by Razorpay
                </p>
            </div>
        </div>
    );
};

export default PaymentUPI;
