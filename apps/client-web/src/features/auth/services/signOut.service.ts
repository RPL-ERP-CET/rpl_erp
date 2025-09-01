import api, {
    type T_ApiSuccessResponse,
} from "@client-web/services/config/api";

export type T_SignOutResponseData = null;

export default async function signOut() {
    return (
        await api.get<T_ApiSuccessResponse<T_SignOutResponseData>>(
            "/auth/signout",
        )
    ).data;
}
