import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSwipe } from "@/hooks/use-swipe";
import { useState } from "react";
import { cn, getImageUrl } from "@/lib/utils";
import MobileActionBar from "@/components/MobileActionBar";
import { toast } from "sonner";
import TrustBadge from "@/components/TrustBadge";
import { hapticFeedback } from "@/utils/haptics";

// Cart Item Component with Swipe-to-Remove
const CartItem = ({ item, onRemove, onUpdateQuantity }: any) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => setIsSwiped(true),
    onSwipeRight: () => setIsSwiped(false),
  });

  return (
    <div className="relative overflow-hidden mb-4 rounded-lg card-shadow">
      {/* Background for Swipe Action */}
      <div className="absolute inset-0 bg-destructive flex items-center justify-end px-6 z-0">
        <Trash2 className="text-destructive-foreground h-6 w-6" />
      </div>

      {/* Foreground Content */}
      <div
        className={cn(
          "bg-card relative z-10 transition-transform duration-200 ease-out p-4 flex gap-4",
          isSwiped ? "-translate-x-24" : "translate-x-0"
        )}
        {...swipeHandlers}
      >
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <img
            src={getImageUrl(item.image)}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-foreground truncate pr-2">
              {item.name}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="text-muted-foreground hover:text-destructive p-1 -mr-1 tap-target"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{item.fabric}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 bg-muted/50 rounded-lg p-1">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm disabled:opacity-50 tap-target"
                onClick={() => {
                  hapticFeedback.light();
                  onUpdateQuantity(item.id, item.quantity - 1);
                }}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">
                {item.quantity}
              </span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm tap-target"
                onClick={() => {
                  hapticFeedback.light();
                  onUpdateQuantity(item.id, item.quantity + 1);
                }}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold text-foreground">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Swipe Delete Button */}
        {isSwiped && (
          <div
            className="absolute inset-y-0 right-[-100px] w-[100px] flex items-center justify-center"
            onClick={() => onRemove(item.id)}
          >
            {/* Hitbox for delete */}
          </div>
        )}
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    hapticFeedback.success();
    navigate("/checkout");
  };

  const handleRemove = (id: string) => {
    hapticFeedback.warning();
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 animate-pulse-soft">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
            Looks like you haven't added any sarees to your cart yet.
          </p>
          <Link to="/products">
            <Button size="lg" className="tap-target">Start Shopping</Button>
          </Link>
        </main>
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-0 animate-fade-in">
      <Navbar />

      <main className="container max-w-4xl mx-auto px-4 lg:px-8 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
          Shopping Cart <span className="text-base font-sans font-normal text-muted-foreground ml-2">({cart.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={updateQuantity}
              />
            ))}
            <p className="text-xs text-center text-muted-foreground mt-4 md:hidden">
              <span className="inline-block mr-1">👈</span> Swipe left to remove items
            </p>
          </div>

          {/* Desktop Summary */}
          <div className="hidden lg:block lg:col-span-1">
            {/* Desktop Order Summary Implementation */}
            <div className="bg-card rounded-lg p-6 card-shadow sticky top-24">
              <h2 className="text-xl font-serif font-bold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              <Button size="lg" className="w-full mb-4" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>

              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <TrustBadge type="cod" />
                  <TrustBadge type="returns" />
                </div>
                <TrustBadge type="shipping" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Only Order Summary */}
        <div className="mt-8 lg:hidden">
          <div className="bg-muted/30 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>₹{getTotalPrice().toLocaleString()}</span>
            </div>
          </div>

          {/* Trust Badges Mobile */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-4 shadow-top md:hidden safe-area-bottom">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Payable</p>
            <p className="text-xl font-bold">₹{getTotalPrice().toLocaleString()}</p>
          </div>
          <Button
            size="lg"
            className="px-8 shadow-lg bg-primary hover:bg-primary/90 tap-target"
            onClick={handleCheckout}
          >
            Checkout <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>


      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
