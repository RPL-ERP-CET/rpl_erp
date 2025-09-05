import { useApiMutation } from "@client-web/hooks";
import { productsService, type T_Product } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: productsService.createProduct,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousItems = queryClient.getQueryData<T_Product[]>(["products"]);
      queryClient.setQueryData<T_Product[]>(["products"], (old) => [
        ...(old ?? []),
        data,
      ]);
      return { previousItems };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<T_Product[]>(
          ["products"],
          context.previousItems,
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
