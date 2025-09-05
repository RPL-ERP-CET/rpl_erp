import { useApiMutation } from "@client-web/hooks";
import { productsService, type T_Product } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: (id: string) => productsService.deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      await queryClient.cancelQueries({ queryKey: ["product", id] });

      const previousItems = queryClient.getQueryData<T_Product[]>(["products"]);
      queryClient.setQueryData<T_Product[]>(["products"], (old) =>
        old ? old.filter((item) => item.id !== id) : [],
      );

      const previousItem = queryClient.getQueryData<T_Product>(["product", id]);
      if (previousItem) {
        queryClient.removeQueries({ queryKey: ["product", id] });
      }

      return { previousItems, previousItem };
    },
    onError: (_error, id, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<T_Product[]>(
          ["products"],
          context.previousItems,
        );
      }
      if (context?.previousItem) {
        queryClient.setQueryData<T_Product>(
          ["product", id],
          context.previousItem,
        );
      }
    },
    onSettled: async (_data, _error, id) => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};
