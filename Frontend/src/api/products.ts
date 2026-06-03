import { api } from './api';

// Backend product interface (matches Django serializer)
export interface BackendProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    original_price: string | null;
    image: string | null;
    category: number;
    category_details: {
        id: number;
        name: string;
        slug: string;
    };
    occasions: number[];
    occasions_details: {
        id: number;
        name: string;
        slug: string;
    }[];
    color: string;
    material: string;
    fabric: string;
    length: string; // e.g., "6.3 meters"
    blouse_included: boolean;
    rating: number;
    reviews_count: number; // Renamed from reviews
    in_stock: boolean;
    trending: boolean;
    low_stock: boolean;
    most_ordered: boolean;
    images: {
        id: number;
        image: string;
        alt_text: string;
    }[];
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string; // We will use slug as ID for frontend routing
    dbId: number; // Keep real DB ID if needed
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: string[];
    category: string;
    occasion: string;
    color: string;
    material: string;
    fabric: string;
    length?: string;
    blouseIncluded: boolean;
    description: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    trending: boolean;
    lowStock: boolean;
    mostOrdered: boolean;
}

// Transform backend product to frontend product
export const transformProduct = (backendProduct: BackendProduct): Product => {
    return {
        id: backendProduct.slug, // USE SLUG AS ID FOR ROUTING
        dbId: backendProduct.id,
        name: backendProduct.name,
        slug: backendProduct.slug,
        price: parseFloat(backendProduct.price),
        originalPrice: backendProduct.original_price ? parseFloat(backendProduct.original_price) : undefined,
        image: backendProduct.image || '', // Handle null image
        images: backendProduct.images ? backendProduct.images.map(img => img.image) : [],
        category: backendProduct.category_details.name,
        color: backendProduct.color,
        material: backendProduct.material,
        fabric: backendProduct.fabric,
        occasion: backendProduct.occasions_details.map(o => o.name).join(', '),
        description: backendProduct.description,
        rating: backendProduct.rating,
        reviews: backendProduct.reviews_count,
        inStock: backendProduct.in_stock,
        trending: backendProduct.trending,
        lowStock: backendProduct.low_stock,
        mostOrdered: backendProduct.most_ordered,
        blouseIncluded: backendProduct.blouse_included,
        length: backendProduct.length,
    };
};

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get<BackendProduct[]>('/api/inventory/products/');
        return response.map(transformProduct);
    },

    search: async (query: string, categoryId?: number, occasionId?: number): Promise<Product[]> => {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (categoryId) params.append('category', categoryId.toString());
        if (occasionId) params.append('occasion', occasionId.toString());

        // The search endpoint returns a paginated response { count, next, previous, results: [...] }
        const response = await api.get<{ results: BackendProduct[] }>(`/api/inventory/search/products/?${params.toString()}`);
        return response.results.map(transformProduct);
    },

    getById: async (id: string): Promise<Product> => {
        const response = await api.get<BackendProduct>(`/api/inventory/products/${id}/`);
        return transformProduct(response);
    },

    create: async (data: any) => {
        // Need to convert frontend form data to backend format
        // This expects the form to send IDs for category and occasions
        return api.post<BackendProduct>('/api/inventory/products/', data);
    },

    update: async (id: string, data: any) => {
        return api.patch<BackendProduct>(`/api/inventory/products/${id}/`, data);
    },

    delete: async (id: string) => {
        return api.delete(`/api/inventory/products/${id}/`);
    },

    getCategories: async () => {
        return api.get<{ id: number, name: string, slug: string }[]>('/api/inventory/categories/');
    },

    getOccasions: async () => {
        return api.get<{ id: number, name: string, slug: string }[]>('/api/inventory/occasions/');
    }
};
