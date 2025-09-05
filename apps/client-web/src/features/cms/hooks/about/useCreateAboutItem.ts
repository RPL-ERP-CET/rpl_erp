import { useApiMutation } from "@client-web/hooks";
import { aboutService, T_AboutItem } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateAboutItem = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: aboutService.createAboutItem,
    onMutate: async (aboutItem: T_AboutItem) => {
      await queryClient.cancelQueries({ queryKey: ["about-items"] });
      const previousItems = queryClient.getQueryData<T_AboutItem[]>([
        "about-items",
      ]);
      queryClient.setQueryData<T_AboutItem[]>(["about-items"], (old) => [
        ...(old ?? []),
        aboutItem,
      ]);
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
