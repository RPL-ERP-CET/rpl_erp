import { useApiMutation } from "@client-web/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { aboutService, type T_AboutItem } from "@cms";

export const useDeleteAboutItem = () => {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (id: string) => aboutService.deleteAboutItem(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["about-items"] });
      const previousItems = queryClient.getQueryData<T_AboutItem[]>([
        "about-items",
      ]);
      queryClient.setQueryData<T_AboutItem[]>(["about-items"], (old) =>
        old ? old.filter((item) => item.id !== id) : [],
      );
      return { previousItems };
    },

    onError: (_error, _id, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["about-items"], context.previousItems);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["about-items"] });
    },
  });
};
