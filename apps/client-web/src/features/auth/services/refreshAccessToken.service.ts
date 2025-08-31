import api, {
    type T_ApiSuccessResponse,
} from "@client-web/services/config/api";

export type T_RefreshAccessTokenResponseData = {
    token: string;
};

export default async function refreshAccessTokenService() {
    return api.get<T_ApiSuccessResponse<T_RefreshAccessTokenResponseData>>(
        "/auth/refresh-access-token",
    );
}
