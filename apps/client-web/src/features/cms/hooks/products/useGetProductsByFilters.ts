import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { productsService, type T_ProductFilters } from "@cms";

export const useGetProductsByFilters = (filters: T_ProductFilters) => {
  return useApiQuery({
    queryKey: ["products", filters],
    queryFn: () => productsService.getProductsByFilters(filters),
  });
};
