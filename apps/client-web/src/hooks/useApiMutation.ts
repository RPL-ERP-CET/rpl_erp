import {
  useMutation,
  type UseMutationOptions,
  type QueryClient,
} from "@tanstack/react-query";

import type {
  T_ApiSuccessResponse,
  T_ApiErrorResponse,
} from "@client-web/services/config/api";

export function useApiMutation<T_Data, T_Variables>(
  options: UseMutationOptions<
    T_ApiSuccessResponse<T_Data>,
    T_ApiErrorResponse,
    T_Variables
  >,
  queryClient?: QueryClient,
) {
  return useMutation<
    T_ApiSuccessResponse<T_Data>,
    T_ApiErrorResponse,
    T_Variables
  >(options, queryClient);
}
