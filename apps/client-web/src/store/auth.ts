import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    setAuth: (token: string | null) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    token: null,
    setAuth: (token: string | null) => {
        set((state) => ({
            ...state,
            token,
            isAuthenticated: !!token,
        }));
    },
    clearAuth: () => {
        set((state) => ({
            ...state,
            token: null,
            isAuthenticated: false,
        }));
    },
}));
