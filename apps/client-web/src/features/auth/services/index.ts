import signUp from "@client-web/features/auth/services/signUp.service";
import signIn from "@client-web/features/auth/services/signIn.service";
import signOut from "@client-web/features/auth/services/signOut.service";
import refreshAccessToken from "@client-web/features/auth/services/refreshAccessToken.service";
import forgotPassword from "@client-web/features/auth/services/forgotPassword.service";

const authServices = {
    signUp,
    signIn,
    signOut,
    refreshAccessToken,
    forgotPassword,
};

export type {
    T_SignUpData,
    T_SignUpResponseData,
} from "@client-web/features/auth/services/signUp.service";
export type {
    T_SignInData,
    T_SignInResponseData,
} from "@client-web/features/auth/services/signIn.service";
export type { T_SignOutResponseData } from "@client-web/features/auth/services/signOut.service";
export type { T_RefreshAccessTokenResponseData } from "@client-web/features/auth/services/refreshAccessToken.service";
export type {
    T_ForgotPasswordData,
    T_ForgotPasswordResponseData,
} from "@client-web/features/auth/services/forgotPassword.service";
export default authServices;
