import { cn } from "@/lib/utils";

const SkeletonProductCard = () => {
    return (
        <div className="bg-card rounded-lg overflow-hidden card-shadow">
            {/* Image Skeleton */}
            <div className="relative aspect-square overflow-hidden bg-muted">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer"
                    style={{
                        backgroundSize: "1000px 100%",
                    }}
                />
            </div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-5 bg-muted rounded animate-shimmer w-3/4" />

                {/* Subtitle */}
                <div className="h-4 bg-muted rounded animate-shimmer w-1/2" />

                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-16 bg-muted rounded animate-shimmer" />
                    <div className="h-4 w-12 bg-muted rounded animate-shimmer" />
                </div>

                {/* Price */}
                <div className="h-6 bg-muted rounded animate-shimmer w-24" />
            </div>
        </div>
    );
};

export default SkeletonProductCard;
