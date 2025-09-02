import {
  useQuery,
  type UseQueryOptions,
  type QueryClient,
} from "@tanstack/react-query";

import type {
  T_ApiSuccessResponse,
  T_ApiErrorResponse,
} from "@client-web/services/config/api";

export function useApiQuery<T_Data>(
  options: UseQueryOptions<T_ApiSuccessResponse<T_Data>, T_ApiErrorResponse>,
  queryClient?: QueryClient,
) {
  return useQuery(options, queryClient);
}
