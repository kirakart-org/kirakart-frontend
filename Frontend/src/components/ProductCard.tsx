import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/api/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { cn, getImageUrl } from "@/lib/utils";
import PsychologyBadge from "@/components/PsychologyBadge";
import { hapticFeedback } from "@/utils/haptics";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact }: ProductCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className={cn("block", compact && "w-[160px]")}>
      <div className={cn(
        "group relative bg-card rounded-lg overflow-hidden card-shadow hover:hover-shadow transition-smooth tap-feedback",
        compact && "shadow-none border border-border"
      )}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />

          {/* Badges - Hide in compact mode */}
          {!compact && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discount > 0 && (
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {discount}% OFF
                </div>
              )}
              {product.trending && <PsychologyBadge type="trending" />}
              {product.lowStock && <PsychologyBadge type="lowStock" />}
              {product.mostOrdered && <PsychologyBadge type="mostOrdered" />}
            </div>
          )}

          {/* Wishlist Button - Always Visible on Mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleWishlist}
            className={cn(
              "absolute top-3 right-3 bg-card/90 hover:bg-card tap-target tap-feedback",
              isWishlisted && "animate-pulse-soft"
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all",
                isWishlisted && "fill-primary text-primary scale-110"
              )}
            />
          </Button>

          {/* Mobile CTA - Hidden on Mobile to avoid Ovelap, moved to content */}
          <div className="hidden md:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="w-full bg-card hover:bg-primary text-foreground hover:text-primary-foreground tap-target tap-feedback"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          <h3 className="font-medium text-foreground mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{product.fabric}</p>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          {/* Price & Mobile Action */}
          <div className="mt-auto flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through hidden sm:inline">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Mobile Add Button */}
            <Button
              size="sm"
              variant="secondary"
              className="md:hidden h-8 px-3"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
