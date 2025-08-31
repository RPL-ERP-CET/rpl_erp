import api, {
    type T_ApiSuccessResponse,
} from "@client-web/services/config/api";

export type T_ForgotPasswordData = {
    email: string;
};

export type T_ForgotPasswordResponseData = null;

export default async function forgotPasswordService(
    data: T_ForgotPasswordData,
) {
    return api.post<T_ApiSuccessResponse<T_ForgotPasswordResponseData>>(
        "/auth/forgot-password",
        data,
    );
}
