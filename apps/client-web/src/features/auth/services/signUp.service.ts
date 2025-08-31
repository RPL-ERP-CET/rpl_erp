import api, {
    type T_ApiSuccessResponse,
} from "@client-web/services/config/api";

export type T_SignUpData = {
    email: string;
    password: string;
    name: string;
};

export type T_SignUpResponseData = {
    id: string;
    email: string;
    name: string;
};

export default async function signUp(data: T_SignUpData) {
    return (
        await api.post<T_ApiSuccessResponse<T_SignUpResponseData>>(
            "/auth/signup",
            data,
        )
    ).data;
}
