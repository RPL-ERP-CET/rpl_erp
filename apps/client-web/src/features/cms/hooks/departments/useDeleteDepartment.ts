import { useApiMutation } from "@client-web/hooks";
import { departmentService, type T_Department } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: departmentService.deleteDepartment,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["departments"] });
      const previousItems = queryClient.getQueryData<T_Department[]>([
        "departments",
      ]);
      queryClient.setQueryData<T_Department[]>(["departments"], (old) =>
        old ? old.filter((item) => item.id !== id) : [],
      );
      return { previousItems };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<T_Department[]>(
          ["departments"],
          context.previousItems,
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
