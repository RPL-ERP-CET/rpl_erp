import axios from "axios";
import { useAuthStore } from "@client-web/store/auth";

export type T_ApiSuccessResponse<T> = {
    success: boolean;
    data: T;
    meta: {
        timestamp: string;
    };
};

export type T_ApiErrorResponse = {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
};

export type T_ApiResponse<T> = T_ApiSuccessResponse<T> | T_ApiErrorResponse;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
