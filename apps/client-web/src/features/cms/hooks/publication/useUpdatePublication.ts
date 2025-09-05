import { useApiMutation } from "@client-web/hooks";
import { publicationService, type T_Publication } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdatePublication = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T_Publication> }) =>
      publicationService.updatePublication(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["publications"] });
      const previousItems = queryClient.getQueryData<T_Publication[]>([
        "publications",
      ]);
      queryClient.setQueryData<T_Publication[]>(["publications"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...data } : item))
          : [],
      );
      return { previousItems };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<T_Publication[]>(
          ["publications"],
          context.previousItems,
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["publications"] });
    },
  });
};
