import { useApiMutation } from "@client-web/hooks";
import { publicationService, type T_Publication } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useDeletePublication = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: publicationService.deletePublication,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["publications"] });
      const previousItems = queryClient.getQueryData<T_Publication[]>([
        "publications",
      ]);
      queryClient.setQueryData<T_Publication[]>(["publications"], (old) =>
        old ? old.filter((item) => item.id !== id) : [],
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
