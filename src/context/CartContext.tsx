import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, transformProduct } from "@/api/products";
import { useAuth } from "./AuthContext";

interface CartItem extends Product {
  quantity: number;
  cartItemId: number; // Added to track backend ID
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { isLoggedIn } = useAuth(); // Re-fetch on login

  // Helper to map Backend Cart Item -> Frontend Cart Item (Flat)
  const mapCartItem = (backendItem: any): CartItem => ({
    ...transformProduct(backendItem.product),
    cartItemId: backendItem.id,
    quantity: backendItem.quantity,
  });

  const refreshCart = async () => {
    try {
      const { cartApi } = await import("@/api/cart");
      const res = await cartApi.getCart();
      if (res && res.items) {
        setCart(res.items.map(mapCartItem));
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const refreshWishlist = async () => {
    try {
      const { wishlistApi } = await import("@/api/cart");
      const res = await wishlistApi.getWishlist();
      if (res && res.items) {
        setWishlist(res.items.map((item: any) => transformProduct(item.product)));
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  // Initial Fetch
  React.useEffect(() => {
    refreshCart();
    refreshWishlist();
  }, [isLoggedIn]);

  const addToCart = async (product: Product) => {
    // Optimistic Update can be done here, but for now simple await
    try {
      const { cartApi } = await import("@/api/cart");
      // Note: Backend expects generic product ID. 
      // Ensure product.id or product.dbId is used correctly. 
      // Assuming product.dbId is the backend ID, fallback to id if numeric
      const pid = product.dbId || product.id;
      await cartApi.addToCart(Number(pid), 1);
      await refreshCart();
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { cartApi } = await import("@/api/cart");
      // We need the CartItem ID, not Product ID for removal in backend usually
      // But my map stores cartItemId.
      const item = cart.find(c => String(c.id) === String(productId));
      if (item && (item as any).cartItemId) {
        await cartApi.removeItem((item as any).cartItemId);
        await refreshCart();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const { cartApi } = await import("@/api/cart");
      const item = cart.find(c => String(c.id) === String(productId));
      if (item && (item as any).cartItemId) {
        await cartApi.updateItem((item as any).cartItemId, quantity);
        await refreshCart();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleWishlist = async (product: Product) => {
    try {
      const { wishlistApi } = await import("@/api/cart");
      const pid = product.dbId || product.id;
      await wishlistApi.toggle(Number(pid));
      await refreshWishlist();
    } catch (e) {
      console.error(e);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => String(item.id) === String(productId));
  };

  const clearCart = () => {
    setCart([]); // Todo: Backend clear
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
