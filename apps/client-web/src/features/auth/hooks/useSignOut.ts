import { useRouter } from "next/navigation";

import { useApiMutation } from "@client-web/hooks/useApiMutation";
import authService from "@client-web/features/auth/services";
import { useAuthStore } from "@client-web/store/auth";

export const useSignOut = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  return useApiMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      clearAuth();
      router.push("/signin");
    },
  });
};
