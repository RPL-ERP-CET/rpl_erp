import { useRouter } from "next/navigation";

import { useApiMutation } from "@client-web/hooks/useApiMutation";
import { useAuthStore } from "@client-web/store/auth";
import authService from "@client-web/features/auth/services";

export const useRefreshAccessToken = () => {
  const { setAuth, clearAuth } = useAuthStore();
  const router = useRouter();
  return useApiMutation({
    mutationFn: authService.refreshAccessToken,
    onSuccess: (data) => {
      setAuth(data.data.token);
    },
    onError: () => {
      clearAuth();
      router.push("/signin");
    },
  });
};
