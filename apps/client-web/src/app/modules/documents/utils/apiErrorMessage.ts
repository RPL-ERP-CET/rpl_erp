import { AxiosError } from "axios";
import { T_ApiErrorResponse } from "@client-web/services/config/api";

export function getApiErrorMessage(
  err: unknown,
  fallback = "Something went wrong",
): string {
  if (err instanceof AxiosError) {
    const axiosError = err as AxiosError<T_ApiErrorResponse>;
    return axiosError.response?.data?.detail || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}
