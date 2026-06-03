import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    Lock,
    Loader2,
    Banknote,
    CreditCard,
    Smartphone,
} from "lucide-react";
import AddressForm from "@/components/checkout/AddressForm";
import PaymentUPI from "@/components/checkout/PaymentUPI";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { hapticFeedback } from "@/utils/haptics";
import TrustBadge from "@/components/TrustBadge";
import { cn } from "@/lib/utils";
import { api } from "@/api/api";

// ── Extend Window so TS knows about Razorpay ──────────────────────────────
declare global {
    interface Window {
        Razorpay: any;
    }
}

// ── Dynamically inject the Razorpay checkout script ───────────────────────
function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

// ── Payment method types ───────────────────────────────────────────────────
type PaymentMethod = "gpay" | "phonepe" | "paytm" | "upi" | "card" | "cod";

const UPI_METHODS: PaymentMethod[] = ["gpay", "phonepe", "paytm", "upi"];

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const { user, addOrder, openAuthModal } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gpay");
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate("/cart");
        }
    }, [cart, navigate]);

    // ── Razorpay: open checkout modal ─────────────────────────────────────
    const openRazorpay = (orderData: {
        key: string;
        amount: number;
        currency: string;
        order_id: string;
        db_order_id: string;
    }) => {
        return new Promise<void>((resolve, reject) => {
            // Choose prefill method based on payment selection
            const isUPI = UPI_METHODS.includes(paymentMethod);

            const prefillMethod =
                paymentMethod === "gpay"
                    ? "upi"
                    : paymentMethod === "phonepe"
                    ? "upi"
                    : paymentMethod === "paytm"
                    ? "upi"
                    : paymentMethod === "upi"
                    ? "upi"
                    : "card";

            const options: Record<string, any> = {
                key: orderData.key,
                amount: orderData.amount,
                currency: orderData.currency,
                order_id: orderData.order_id,
                name: "Kirakart",
                description: "Order Payment",
                image: "/kirakart_logo.svg",

                // Pre-select the payment method tab
                ...(isUPI && { method: { upi: true, card: false, netbanking: false, wallet: false } }),
                ...(!isUPI && paymentMethod === "card" && {
                    method: { upi: false, card: true, netbanking: false, wallet: false },
                }),

                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                    contact: user?.phone || "",
                    method: prefillMethod,
                },

                theme: { color: "#1a1a2e" },

                modal: {
                    ondismiss: () => {
                        toast.info("Payment cancelled");
                        setIsProcessing(false);
                        reject(new Error("dismissed"));
                    },
                },

                handler: async (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) => {
                    try {
                        // STEP 3 — Verify payment with backend
                        const verifyData = await api.post<{
                            success: boolean;
                            message?: string;
                            error?: string;
                        }>("/api/subscriptions/payments/verify/", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyData.success) {
                            // Record order locally
                            addOrder({
                                items: cart,
                                total: getTotalPrice(),
                                paymentMethod,
                            });
                            clearCart();
                            hapticFeedback.success();
                            toast.success("🎉 Order placed successfully!");
                            navigate("/orders");
                            resolve();
                        } else {
                            toast.error(verifyData.error || "Payment verification failed");
                            reject(new Error("verify-failed"));
                        }
                    } catch (err: any) {
                        toast.error("Verification error: " + (err.message || "Unknown error"));
                        reject(err);
                    } finally {
                        setIsProcessing(false);
                    }
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", (response: any) => {
                hapticFeedback.error();
                toast.error("Payment failed: " + response.error.description);
                setIsProcessing(false);
                reject(new Error(response.error.description));
            });

            rzp.open();
        });
    };

    // ── Main handler ──────────────────────────────────────────────────────
    const handlePlaceOrder = async () => {
        hapticFeedback.medium();

        // ── Auth gate — backend requires a real logged-in user ────────────
        if (!user) {
            toast.info("Please log in to complete your purchase");
            openAuthModal("login");
            return;
        }

        // ── COD flow ──────────────────────────────────────────────────────
        if (paymentMethod === "cod") {
            setIsProcessing(true);
            try {
                addOrder({
                    items: cart,
                    total: getTotalPrice(),
                    paymentMethod: "Cash on Delivery",
                });
                clearCart();
                hapticFeedback.success();
                toast.success("Order placed! Pay on delivery 🚚");
                navigate("/orders");
            } catch (err: any) {
                toast.error("Failed to place order. Please try again.");
            } finally {
                setIsProcessing(false);
            }
            return;
        }

        // ── Razorpay flow (UPI / Card) ────────────────────────────────────
        setIsProcessing(true);

        try {
            // Load Razorpay SDK
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                toast.error("Unable to load payment gateway. Check your connection.");
                setIsProcessing(false);
                return;
            }

            // STEP 1 — Create order on backend
            const orderData = await api.post<{
                success: boolean;
                key: string;
                amount: number;
                currency: string;
                order_id: string;
                db_order_id: string;
                message?: string;
                error?: string;
            }>("/api/subscriptions/orders/create/", {
                products: cart.map((item) => ({
                    product_id: item.dbId || item.id,
                    quantity: item.quantity,
                })),
            });

            if (!orderData.success) {
                toast.error(orderData.message || orderData.error || "Failed to create order");
                setIsProcessing(false);
                return;
            }

            // STEP 2 — Open Razorpay checkout
            await openRazorpay(orderData);
        } catch (err: any) {
            if (err?.message !== "dismissed") {
                console.error("Payment error:", err);
                toast.error(err.message || "Payment failed. Please try again.");
            }
            setIsProcessing(false);
        }
    };

    const isUPISelected = UPI_METHODS.includes(paymentMethod);
    const totalPrice = getTotalPrice();

    return (
        <div className="min-h-screen bg-background pb-32 lg:pb-12 animate-fade-in">
            {/* ── Header ────────────────────────────────────────────────── */}
            <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md p-4 flex items-center border-b lg:px-8">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="-ml-2 mr-2"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <span className="font-serif font-bold text-lg">Checkout</span>
                <div className="ml-auto flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">100% Secure</span>
                </div>
            </div>

            <main className="container max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── LEFT COLUMN: Address & Payment ──────────────── */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Delivery Address */}
                        <section>
                            <h2 className="text-lg font-serif font-bold text-foreground mb-4">
                                Shipping Address
                            </h2>
                            <div className="card-shadow rounded-xl bg-card p-6 border">
                                <AddressForm />
                            </div>
                        </section>

                        {/* 2. Payment Methods */}
                        <section>
                            <h2 className="text-lg font-serif font-bold text-foreground mb-4 flex items-center justify-between">
                                Payment Method
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1 font-sans font-medium">
                                    <Lock className="w-3 h-3" /> Secured by Razorpay
                                </span>
                            </h2>

                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={(val) => {
                                    hapticFeedback.selection?.() ?? hapticFeedback.light();
                                    setPaymentMethod(val as PaymentMethod);
                                }}
                                className="space-y-4"
                            >
                                {/* ── UPI / Apps ───────────────────────── */}
                                <div
                                    className={cn(
                                        "rounded-xl border-2 transition-all overflow-hidden bg-card card-shadow",
                                        isUPISelected
                                            ? "border-primary ring-1 ring-primary/20 shadow-md"
                                            : "border-border"
                                    )}
                                >
                                    {/* Header row */}
                                    <div
                                        className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center cursor-pointer"
                                        onClick={() => setPaymentMethod("gpay")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Smartphone className="w-4 h-4 text-primary" />
                                            <span className="font-bold text-sm">UPI / Apps</span>
                                        </div>
                                        <span className="text-[10px] font-bold bg-white px-2 py-1 rounded text-primary border border-primary/20 shadow-sm">
                                            FASTEST
                                        </span>
                                    </div>

                                    {/* UPI app selector */}
                                    <div className="p-4 pt-5">
                                        <PaymentUPI value={paymentMethod} />
                                    </div>
                                </div>

                                {/* ── Credit / Debit Card ──────────────── */}
                                <div
                                    className={cn(
                                        "rounded-xl border transition-all bg-card p-4 flex items-center justify-between card-shadow cursor-pointer hover:border-primary/50",
                                        paymentMethod === "card"
                                            ? "border-primary ring-1 ring-primary/20"
                                            : "border-border"
                                    )}
                                    onClick={() => setPaymentMethod("card")}
                                >
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="card" id="card" />
                                        <div>
                                            <Label
                                                htmlFor="card"
                                                className="font-semibold block cursor-pointer"
                                            >
                                                Credit / Debit Card
                                            </Label>
                                            <span className="text-xs text-muted-foreground">
                                                Visa · Mastercard · RuPay — all banks
                                            </span>
                                        </div>
                                    </div>
                                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                                </div>

                                {/* ── Cash on Delivery ─────────────────── */}
                                <div
                                    className={cn(
                                        "rounded-xl border transition-all bg-card p-4 flex items-center justify-between card-shadow cursor-pointer hover:border-primary/50",
                                        paymentMethod === "cod"
                                            ? "border-primary ring-1 ring-primary/20"
                                            : "border-border"
                                    )}
                                    onClick={() => setPaymentMethod("cod")}
                                >
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="cod" id="cod" />
                                        <div>
                                            <Label
                                                htmlFor="cod"
                                                className="font-semibold block cursor-pointer"
                                            >
                                                Cash on Delivery
                                            </Label>
                                            <span className="text-xs text-muted-foreground">
                                                Pay when you receive the order
                                            </span>
                                        </div>
                                    </div>
                                    <TrustBadge type="cod" />
                                </div>
                            </RadioGroup>

                            {/* COD disclaimer */}
                            {paymentMethod === "cod" && (
                                <p className="mt-3 text-xs text-muted-foreground bg-amber-50 border border-amber-100 rounded-lg px-4 py-2 flex items-start gap-2">
                                    <Banknote className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                                    ₹{totalPrice.toLocaleString()} will be collected at the time of delivery.
                                </p>
                            )}
                        </section>
                    </div>

                    {/* ── RIGHT COLUMN: Order Summary ──────────────────── */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-5">
                            <div className="bg-card rounded-xl border card-shadow overflow-hidden">
                                {/* Summary header */}
                                <div className="p-4 bg-muted/30 border-b">
                                    <h3 className="font-serif font-bold text-lg">Order Summary</h3>
                                </div>

                                {/* Cart items list */}
                                <div className="p-4 max-h-[300px] overflow-y-auto space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-3 text-sm">
                                            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image?.startsWith("http") ? item.image : `/src/assets/${item.image}`}
                                                    className="w-full h-full object-cover"
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium line-clamp-2 leading-tight">
                                                    {item.name}
                                                </p>
                                                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span className="font-semibold text-foreground">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                {/* Price breakdown */}
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    {paymentMethod !== "cod" && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Payment fee</span>
                                            <span className="text-green-600 font-medium">₹0</span>
                                        </div>
                                    )}
                                    <Separator className="my-1" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Desktop CTA */}
                                <div className="p-4 pt-0 hidden lg:block">
                                    <Button
                                        size="lg"
                                        className="w-full h-12 text-base shadow-lg hover:translate-y-[-2px] transition-all duration-200 relative overflow-hidden group"
                                        onClick={handlePlaceOrder}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <>
                                                {paymentMethod === "cod"
                                                    ? `Place Order • ₹${totalPrice.toLocaleString()}`
                                                    : `Pay ₹${totalPrice.toLocaleString()}`}
                                            </>
                                        )}
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                                        <ShieldCheck className="w-3 h-3" />
                                        Secured by Razorpay — 100% Safe
                                    </div>
                                </div>
                            </div>

                            {/* Free shipping badge */}
                            <div className="flex items-center justify-center gap-2 text-xs text-green-700 bg-green-50 p-3 rounded-xl border border-green-100">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium">Free Shipping on this order!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Sticky Mobile CTA ─────────────────────────────────────── */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:hidden safe-area-bottom">
                <div className="container max-w-lg mx-auto">
                    <Button
                        size="lg"
                        className="w-full text-lg h-14 shadow-xl transition-all duration-200 relative overflow-hidden"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing payment…
                            </span>
                        ) : paymentMethod === "cod" ? (
                            `Place Order • ₹${totalPrice.toLocaleString()}`
                        ) : (
                            `Pay ₹${totalPrice.toLocaleString()}`
                        )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Secure &amp; Encrypted
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
