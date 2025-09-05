import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { productsService } from "@cms";

export const useGetProductById = (id: string) => {
  return useApiQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getProductById(id),
    enabled: !!id,
  });
};
