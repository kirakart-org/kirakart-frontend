import { useEffect, useState, useRef } from "react";

interface UseLazyLoadOptions {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
}

export const useLazyLoad = (
    options: UseLazyLoadOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] => {
    const { threshold = 0.1, root = null, rootMargin = "50px" } = options;
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
                root,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, root, rootMargin]);

    return [ref, isVisible];
};
