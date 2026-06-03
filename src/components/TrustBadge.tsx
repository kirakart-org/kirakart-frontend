import { Check, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeType = "cod" | "returns" | "shipping";

interface TrustBadgeProps {
    type: BadgeType;
    className?: string;
}

const badgeConfig = {
    cod: {
        icon: Package,
        label: "COD Available",
        color: "text-green-600 dark:text-green-400",
    },
    returns: {
        icon: Check,
        label: "Easy Returns",
        color: "text-blue-600 dark:text-blue-400",
    },
    shipping: {
        icon: Truck,
        label: "Free Shipping",
        color: "text-purple-600 dark:text-purple-400",
    },
};

const TrustBadge = ({ type, className }: TrustBadgeProps) => {
    const config = badgeConfig[type];
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium",
                config.color,
                className
            )}
        >
            <Icon className="h-3.5 w-3.5" />
            <span>{config.label}</span>
        </div>
    );
};

export default TrustBadge;
