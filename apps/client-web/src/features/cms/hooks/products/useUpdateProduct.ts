import { useApiMutation } from "@client-web/hooks";
import { productsService, type T_Product } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T_Product> }) =>
      productsService.updateProduct(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      await queryClient.cancelQueries({ queryKey: ["product", id] });

      const previousItems = queryClient.getQueryData<T_Product[]>(["products"]);
      queryClient.setQueryData<T_Product[]>(["products"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...data } : item))
          : [],
      );

      const previousItem = queryClient.getQueryData<T_Product>(["product", id]);
      if (previousItem) {
        queryClient.setQueryData<T_Product>(["product", id], (old) => ({
          ...old!,
          ...data,
        }));
      }

      return { previousItems, previousItem };
    },
    onError: (_error, { id }, context) => {
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
    onSettled: async (_data, _error, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};
