import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterChipProps {
    label: string;
    onRemove: () => void;
    className?: string;
}

const FilterChip = ({ label, onRemove, className }: FilterChipProps) => {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium transition-fast hover:bg-primary/20",
                className
            )}
        >
            <span>{label}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-4 w-4 p-0 hover:bg-transparent tap-feedback"
                aria-label={`Remove ${label} filter`}
            >
                <X className="h-3 w-3" />
            </Button>
        </div>
    );
};

export default FilterChip;
