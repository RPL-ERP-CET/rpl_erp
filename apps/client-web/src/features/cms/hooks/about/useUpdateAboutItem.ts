import { useApiMutation } from "@common/hooks";
import { aboutService, type T_AboutItem } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateAboutItem = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T_AboutItem> }) =>
      aboutService.updateAboutItem(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["about-items"] });
      const previousItems = queryClient.getQueryData<T_AboutItem[]>([
        "about-items",
      ]);
      queryClient.setQueryData<T_AboutItem[]>(["about-items"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...data } : item))
          : [],
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
