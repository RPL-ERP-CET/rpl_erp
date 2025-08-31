import { useApiMutation } from "@client-web/hooks/useApiMutation";
import authService from "@client-web/features/auth/services";

export const useForgotPassword = () => {
  return useApiMutation({
    mutationFn: authService.forgotPassword,
  });
};
