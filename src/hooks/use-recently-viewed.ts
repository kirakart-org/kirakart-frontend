import { useState, useEffect, useCallback } from 'react';
import { Product } from "@/api/products";

const RECENTLY_VIEWED_KEY = 'kirakart_recently_viewed';
const MAX_RECENT_ITEMS = 6;

export const useRecentlyViewed = () => {
    const [recentItems, setRecentItems] = useState<Product[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
        if (stored) {
            try {
                setRecentItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse recently viewed items", e);
            }
        }
    }, []);

    const addToRecentlyViewed = useCallback((product: Product) => {
        setRecentItems((prev) => {
            const filtered = prev.filter((p) => p.id !== product.id);
            const newItems = [product, ...filtered].slice(0, MAX_RECENT_ITEMS);
            localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(newItems));
            return newItems;
        });
    }, []);

    return { recentItems, addToRecentlyViewed };
};
