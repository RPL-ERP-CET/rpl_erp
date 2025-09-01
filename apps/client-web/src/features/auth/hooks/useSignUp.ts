import { useRouter } from "next/navigation";

import { useApiMutation } from "@client-web/hooks/useApiMutation";
import authService from "@client-web/features/auth/services";

export const useSignUp = () => {
  const router = useRouter();
  return useApiMutation({
    mutationFn: authService.signUp,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
};
