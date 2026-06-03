import { api } from './api';

export interface GuestResponse {
    guest_id: string;
    token: string;
    message: string;
}

// Types
export interface AuthResponse {
    success: boolean;
    token?: string;
    user: any;
    message?: string;
}

export interface LoginData {
    username: string; // Mobile or Email
    password: string;
}

export interface SignupData {
    guest_id?: string | null;
    mobile: string;
    password: string;
    first_name: string;
    email?: string;
}

export const authApi = {
    createGuest: async (): Promise<GuestResponse> => {
        return api.post<GuestResponse>('/api/accounts/guest/create/', {});
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        return api.post<AuthResponse>('/api/accounts/login/', data);
    },

    signup: async (data: SignupData): Promise<AuthResponse> => {
        return api.post<AuthResponse>('/api/accounts/signup/', data);
    },

    me: async (): Promise<any> => {
        return api.get('/api/accounts/me/');
    },

    logout: async () => {
        return api.post('/api/accounts/logout/', {});
    }
};
