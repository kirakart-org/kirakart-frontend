const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { params, ...fetchOptions } = options;

        let url = `${this.baseUrl}${endpoint}`;

        if (params) {
            const searchParams = new URLSearchParams(params);
            url += `?${searchParams.toString()}`;
        }

        const headers = {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
        };

        // Include authentication token if available (example placeholder)
        // Include authentication token if available
        const token = localStorage.getItem('kc_token');
        if (token) {
            // @ts-ignore
            headers['Authorization'] = `Token ${token}`;
        }

        const config: RequestInit = {
            ...fetchOptions,
            headers,
            credentials: 'include',
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            // Handle HTTP errors
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    public get<T>(endpoint: string, params?: Record<string, string>, options?: Omit<RequestOptions, 'params'>) {
        return this.request<T>(endpoint, { method: 'GET', params, ...options });
    }

    public post<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body), ...options });
    }

    public put<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options });
    }

    public patch<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options });
    }

    public delete<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, { method: 'DELETE', ...options });
    }
}

export const api = new ApiClient(API_BASE_URL);
