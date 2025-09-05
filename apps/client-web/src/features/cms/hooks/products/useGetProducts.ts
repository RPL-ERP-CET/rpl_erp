import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { productsService } from "@cms";

export const useGetProducts = () => {
  return useApiQuery({
    queryKey: ["products"],
    queryFn: productsService.getProducts,
  });
};
