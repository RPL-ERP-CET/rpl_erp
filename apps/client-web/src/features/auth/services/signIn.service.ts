import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_SignInData = {
    email: string;
    password: string;
};

export type T_SignInResponseData = {
    token: string;
    user: {
        id: string;
        email: string;
    };
};

export default async function signInService(data: T_SignInData) {
    return (
        await api.post<T_ApiSuccessResponse<T_SignInResponseData>>(
            "/auth/signin",
            data,
        )
    ).data;
}
