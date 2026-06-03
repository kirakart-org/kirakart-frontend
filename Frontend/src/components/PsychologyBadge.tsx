import { TrendingUp, Flame, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeType = "trending" | "lowStock" | "mostOrdered";

interface PsychologyBadgeProps {
    type: BadgeType;
    className?: string;
}

const badgeConfig = {
    trending: {
        icon: TrendingUp,
        label: "Trending Now",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-700 dark:text-orange-300",
    },
    lowStock: {
        icon: AlertCircle,
        label: "Low Stock",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        textColor: "text-red-700 dark:text-red-300",
    },
    mostOrdered: {
        icon: Flame,
        label: "Most Ordered",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-700 dark:text-purple-300",
    },
};

const PsychologyBadge = ({ type, className }: PsychologyBadgeProps) => {
    const config = badgeConfig[type];
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                config.bgColor,
                config.textColor,
                className
            )}
        >
            <Icon className="h-3 w-3" />
            <span>{config.label}</span>
        </div>
    );
};

export default PsychologyBadge;
