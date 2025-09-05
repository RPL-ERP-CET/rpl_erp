import { useApiMutation } from "@client-web/hooks";
import { departmentService, type T_Department } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: departmentService.createDepartment,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["departments"] });
      const previousItems = queryClient.getQueryData<T_Department[]>([
        "departments",
      ]);
      queryClient.setQueryData<T_Department[]>(["departments"], (old) => [
        ...(old ?? []),
        data,
      ]);
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
