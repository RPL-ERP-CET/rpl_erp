export type SuccessResponse<T> = {
  success: boolean;
  data: T;
  meta: {
    timestamp: string;
  };
};
