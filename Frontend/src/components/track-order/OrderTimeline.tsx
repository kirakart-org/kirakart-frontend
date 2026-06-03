import { cn } from "@/lib/utils";
import { Check, Package, Truck, Home, ShoppingBag, Clock } from "lucide-react";

interface OrderTimelineProps {
    status: "confirmed" | "packed" | "shipped" | "out_for_delivery" | "delivered";
}

const steps = [
    { id: "confirmed", label: "Order Confirmed", description: "We've received your order.", icon: ShoppingBag },
    { id: "packed", label: "Packed", description: "Your saree is carefully packed.", icon: Package },
    { id: "shipped", label: "Shipped", description: "It's on the way.", icon: Truck },
    { id: "out_for_delivery", label: "Out for Delivery", description: "Arriving today.", icon: Clock },
    { id: "delivered", label: "Delivered", description: "Delivered successfully.", icon: Home },
];

const OrderTimeline = ({ status }: OrderTimelineProps) => {
    const currentIndex = steps.findIndex((s) => s.id === status);

    return (
        <div className="relative pl-4 space-y-8 my-8">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-border -z-10" />

            {steps.map((step, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
                const Icon = step.icon;

                return (
                    <div key={step.id} className={cn("relative flex gap-4 transition-all duration-500", !isCompleted && "opacity-50")}>
                        {/* Icon Circle */}
                        <div
                            className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center border-2 bg-background z-10 transition-all duration-500",
                                isCompleted ? "border-primary text-primary scale-110" : "border-muted text-muted-foreground",
                                isCurrent && "ring-4 ring-primary/20"
                            )}
                        >
                            {isCompleted ? <Check className="w-3 h-3" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                        </div>

                        {/* Content */}
                        <div className={cn("flex-1 pt-0.5", isCompleted ? "opacity-100" : "opacity-60")}>
                            <h3 className={cn("text-sm font-bold leading-none mb-1", isCurrent && "text-primary scale-105 origin-left transition-transform")}>
                                {step.label}
                            </h3>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderTimeline;
