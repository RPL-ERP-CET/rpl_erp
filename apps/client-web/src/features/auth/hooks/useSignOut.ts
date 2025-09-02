import { useRouter } from "next/navigation";

import { useApiQuery } from "@client-web/hooks/useApiQuery";
import authService from "@client-web/features/auth/services";
import { useAuthStore } from "@client-web/store/auth";
import { useEffect } from "react";

export const useSignOut = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const query = useApiQuery({
    queryKey: ["sign-out"],
    queryFn: authService.signOut,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      clearAuth();
      router.push("/signin");
    }
  }, [query.isSuccess, query.data, clearAuth, router]);

  return query;
};
