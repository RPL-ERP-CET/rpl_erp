import { useApiMutation } from "@client-web/hooks";
import { heroCarouselService, type T_CarouselItem } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateCarouselItem = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: heroCarouselService.updateCarouselItem,
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["carousel-items"] });
      const previousItems = queryClient.getQueryData<T_CarouselItem[]>([
        "carousel-items",
      ]);
      queryClient.setQueryData<T_CarouselItem[]>(["carousel-items"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...data } : item))
          : [],
      );
      return { previousItems };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<T_CarouselItem[]>(
          ["carousel-items"],
          context.previousItems,
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carousel-items"] });
    },
  });
};
