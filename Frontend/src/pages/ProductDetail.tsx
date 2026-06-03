import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productsApi, Product } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Heart, Star, ArrowLeft, Share2, Ruler, ShieldCheck, Truck, Clock, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { hapticFeedback } from "@/utils/haptics";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { useSwipe } from "@/hooks/use-swipe";
import ProductCard from "@/components/ProductCard";
import MobileActionBar from "@/components/MobileActionBar";
import PsychologyBadge from "@/components/PsychologyBadge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn, getImageUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetail = () => {
  const { id } = useParams(); // This is now the SLUG
  const navigate = useNavigate();
  // React Query for caching and deduplication
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch related products (cached)
  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const relatedProducts = allProducts
    ? allProducts
      .filter(p => product && p.category === product.category && p.id !== product.id)
      .slice(0, 4)
    : [];

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToRecentlyViewed, recentItems } = useRecentlyViewed();

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (error) {
    toast.error("Failed to load product details");
  }

  const images = product
    ? (product.images && product.images.length > 0
      ? [product.image, ...product.images]
      : [product.image])
    : [];

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipeLeft: () => {
      if (activeImageIndex < images.length - 1) {
        setActiveImageIndex(prev => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (activeImageIndex > 0) {
        setActiveImageIndex(prev => prev - 1);
      }
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[500px] w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    hapticFeedback.success();
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    hapticFeedback.success();
    addToCart(product);
    navigate("/cart");
  };

  const handleToggleWishlist = () => {
    hapticFeedback.light();
    toggleWishlist(product);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0 animate-fade-in">
      <Navbar />

      <main className="container max-w-7xl mx-auto px-0 md:px-4 lg:px-8 py-0 md:py-8">
        <div className="md:hidden sticky top-0 z-30 bg-background/80 backdrop-blur-md p-4 flex justify-between items-center border-b">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleToggleWishlist}>
              <Heart className={cn("h-5 w-5 transition-all", isWishlisted && "fill-primary text-primary scale-110")} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-12 mb-8 md:mb-16">
          {/* Mobile Swipeable Gallery */}
          {/* Product Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">

            {/* Desktop Thumbnails (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col gap-4 w-20 h-[500px] overflow-y-auto scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "relative aspect-square rounded-md overflow-hidden border-2 transition-all",
                    activeImageIndex === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-gray-300"
                  )}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Area with Zoom */}
            <div className="relative w-full aspect-[4/5] lg:aspect-square bg-muted rounded-lg overflow-hidden group">
              {/* Desktop Zoom Implementation */}
              <div
                className="hidden lg:block w-full h-full cursor-crosshair relative overflow-hidden"
                onMouseMove={(e) => {
                  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;
                  e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
                  e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
                }}
              >
                <img
                  key={activeImageIndex}
                  src={getImageUrl(images[activeImageIndex])}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300 animate-in fade-in"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: `url(${getImageUrl(images[activeImageIndex])})`,
                    backgroundPosition: 'var(--zoom-x) var(--zoom-y)',
                    backgroundSize: '250%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </div>

              {/* Mobile Image (Simple cover) with Swipe Support */}
              <div
                className="lg:hidden relative w-full h-full"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  key={activeImageIndex}
                  src={getImageUrl(images[activeImageIndex])}
                  alt={product.name}
                  className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
                />

                {/* Mobile Mobile Swipe Hints */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                {discount > 0 && (
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {discount}% OFF
                  </div>
                )}
                {product.trending && <PsychologyBadge type="trending" />}
                {product.lowStock && <PsychologyBadge type="lowStock" />}
              </div>

              {/* Mobile Swipe Indicators (For mobile only when we implement full swipe later if needed, current design relies on main image state) */}
              {/* Note: In this specific refactor, we are using state for the main image. 
                  For a true mobile swipe, we need the earlier scrollable div. 
                  Let's re-add the mobile scrollable gallery BELOW if looking for that specific interaction,
                  OR keep the single active image for main view and add swipe listeners.
              */}
            </div>
          </div>

          {/* Mobile Swipeable Thumbnails (Visible only on mobile) */}
          <div className="lg:hidden mt-4">
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 snap-start",
                    activeImageIndex === index ? "border-primary" : "border-transparent"
                  )}
                >
                  <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="px-4 py-6 md:p-0">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between mb-4">
              <Link to="/products">
                <Button variant="ghost" className="-ml-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleToggleWishlist}>
                  <Heart className={cn("h-4 w-4", isWishlisted && "fill-primary text-primary")} />
                </Button>
              </div>
            </div>

            {/* Title & Rating */}
            <div className="mb-2">
              <span className="text-sm font-medium text-primary mb-2 block">{product.category}</span>
              <h1 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center bg-green-50 px-2 py-0.5 rounded text-green-700 text-sm font-medium">
                  {product.rating} <Star className="h-3 w-3 ml-1 fill-green-700" />
                </div>
                <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
                {product.mostOrdered && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                    Most Ordered
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-muted/30 p-4 rounded-lg mb-6 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-green-600 font-medium mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Trust Icons Mini */}
              <div className="flex gap-4">
                <div className="text-center">
                  <ShieldCheck className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                  <span className="text-[10px] text-muted-foreground block">Genuine</span>
                </div>
                <div className="text-center">
                  <Truck className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                  <span className="text-[10px] text-muted-foreground block">Fast Ship</span>
                </div>
              </div>
            </div>

            {/* Icon Highlights - Mobile First */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-card border border-border/50">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-1">
                  <span className="text-lg">🧵</span>
                </div>
                <span className="text-[10px] leading-tight text-muted-foreground font-medium">{product.fabric}</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-card border border-border/50">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mb-1">
                  <Ruler className="h-4 w-4 text-rose-500" />
                </div>
                <span className="text-[10px] leading-tight text-muted-foreground font-medium">{product.length || "6.3m"}</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-card border border-border/50">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1">
                  <span className="text-lg">👚</span>
                </div>
                <span className="text-[10px] leading-tight text-muted-foreground font-medium">
                  {product.blouseIncluded ? "Blouse Inc." : "No Blouse"}
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-card border border-border/50">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-1">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-[10px] leading-tight text-muted-foreground font-medium">Ships 24h</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Accordion Details */}
            <Accordion type="single" collapsible className="w-full mb-8">
              <AccordionItem value="details">
                <AccordionTrigger className="text-sm font-medium">Product Details</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-muted-foreground">Material</div>
                    <div className="font-medium">{product.material}</div>
                    <div className="text-muted-foreground">Occasion</div>
                    <div className="font-medium">{product.occasion}</div>
                    <div className="text-muted-foreground">Color</div>
                    <div className="font-medium">{product.color}</div>
                    <div className="text-muted-foreground">Care</div>
                    <div className="font-medium">Dry Clean Only</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-medium">Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                    <li>Free shipping on all prepaid orders</li>
                    <li>Cash on Delivery available on orders above ₹999</li>
                    <li>Easy 7-day returns for manufacturing defects</li>
                    <li>Dispatched within 24-48 hours</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reviews">
                <AccordionTrigger className="text-sm font-medium">Reviews ({product.reviews})</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold">{product.rating}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted")} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Absolutely loved the quality of the saree. The color is exactly as shown in the picture!" - Priya S.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Trust Badges Full */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Authentic</p>
                  <p className="text-[10px] text-muted-foreground">100% Original Products</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Truck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Fast Delivery</p>
                  <p className="text-[10px] text-muted-foreground">Ships in 24 hrs</p>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 text-lg">
                Add to Cart
              </Button>
              <Button size="lg" variant="secondary" onClick={handleBuyNow} className="flex-1 text-lg">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="px-4 lg:px-0 mb-12">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
              Complete the Look
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentItems.length > 0 && (
          <section className="px-4 lg:px-0 mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
              Recently Viewed
            </h2>
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x">
              {recentItems.map((item) => (
                <div key={item.id} className="w-[160px] flex-shrink-0 snap-start">
                  <ProductCard product={item} compact />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Mobile Sticky Action Bar */}
      <MobileActionBar
        primaryAction={{ label: "Buy Now", onClick: handleBuyNow }}
        secondaryAction={{ label: "Add to Cart", onClick: handleAddToCart, icon: ShoppingCart }}
        price={product.price}
      />


      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
