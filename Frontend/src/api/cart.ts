import { api } from './api';
import { Product } from './products';

export interface CartItem {
    id: number;
    product: Product;
    product_id: number;
    quantity: number;
    price_at_add: number;
    total_price: number;
}

export interface Cart {
    id: number;
    items: CartItem[];
    total_price: number;
    total_items: number;
    updated_at: string;
}

export interface WishlistItem {
    id: number;
    product: Product;
    product_id: number;
    created_at: string;
}

export interface Wishlist {
    id: number;
    items: WishlistItem[];
    created_at: string;
}

export const cartApi = {
    getCart: async (): Promise<Cart> => {
        return api.get<Cart>('/api/cart/');
    },

    addToCart: async (productId: number, quantity: number = 1): Promise<Cart> => {
        return api.post<Cart>('/api/cart/add/', { product_id: productId, quantity });
    },

    updateItem: async (itemId: number, quantity: number): Promise<Cart> => {
        return api.patch<Cart>(`/api/cart/${itemId}/update_item/`, { quantity });
    },

    removeItem: async (itemId: number): Promise<Cart> => {
        return api.delete<Cart>(`/api/cart/${itemId}/remove_item/`);
    },
};

export const wishlistApi = {
    getWishlist: async (): Promise<Wishlist> => {
        return api.get<Wishlist>('/api/wishlist/');
    },

    toggle: async (productId: number): Promise<Wishlist> => {
        return api.post<Wishlist>('/api/wishlist/toggle/', { product_id: productId });
    },

    removeItem: async (itemId: number): Promise<Wishlist> => {
        return api.delete<Wishlist>(`/api/wishlist/${itemId}/remove/`);
    }
};
