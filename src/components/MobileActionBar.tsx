import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MobileActionBarProps {
    primaryAction: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        loading?: boolean;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
        variant?: "outline" | "ghost" | "secondary";
        icon?: LucideIcon;
    };
    price?: number;
    className?: string;
}

const MobileActionBar = ({
    primaryAction,
    secondaryAction,
    price,
    className,
}: MobileActionBarProps) => {
    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]",
                className
            )}
        >
            <div className="container mx-auto max-w-screen-xl flex gap-3 items-center">
                {price !== undefined && (
                    <div className="flex flex-col shrink-0 mr-1">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Total</p>
                        <p className="text-lg font-bold leading-tight">₹{price.toLocaleString()}</p>
                    </div>
                )}

                {secondaryAction && (
                    <Button
                        variant={secondaryAction.variant || "outline"}
                        size="lg"
                        onClick={secondaryAction.onClick}
                        className={cn(
                            "tap-target tap-feedback px-3 min-w-0 flex-1",
                        )}
                    >
                        {secondaryAction.icon && <secondaryAction.icon className="h-4 w-4 mr-2 shrink-0" />}
                        <span className="truncate">{secondaryAction.label}</span>
                    </Button>
                )}
                <Button
                    size="lg"
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled || primaryAction.loading}
                    className={cn(
                        "tap-target tap-feedback bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm px-4 flex-1",
                    )}
                >
                    {primaryAction.loading ? "Processing..." : primaryAction.label}
                </Button>
            </div>
        </div>
    );
};

export default MobileActionBar;
