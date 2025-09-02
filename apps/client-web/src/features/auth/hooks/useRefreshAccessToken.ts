import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { useAuthStore } from "@client-web/store/auth";
import authService from "@client-web/features/auth/services";

export const useRefreshAccessToken = () => {
  const { setAuth, clearAuth } = useAuthStore();
  const router = useRouter();
  const query = useApiQuery({
    queryKey: ["refresh-access-token"],
    queryFn: authService.refreshAccessToken,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setAuth(query.data.data.token);
    }
  }, [query.isSuccess, query.data, setAuth]);

  useEffect(() => {
    if (query.isError) {
      clearAuth();
      router.push("/signin");
    }
  }, [query.isError, clearAuth, router]);

  return query;
};
