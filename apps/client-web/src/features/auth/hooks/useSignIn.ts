import { useRouter } from "next/navigation";

import { useApiMutation } from "@client-web/hooks/useApiMutation";
import { useAuthStore } from "@client-web/store/auth";
import authService from "@client-web/features/auth/services";

export const useSignIn = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useApiMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setAuth(data.data.token);
      router.push("/dashboard");
    },
  });
};
