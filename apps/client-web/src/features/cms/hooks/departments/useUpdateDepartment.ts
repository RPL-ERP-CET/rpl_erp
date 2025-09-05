import { useApiMutation } from "@client-web/hooks";
import { departmentService, type T_Department } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T_Department> }) =>
      departmentService.updateDepartment(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["departments"] });
      const previousItems = queryClient.getQueryData<T_Department[]>([
        "departments",
      ]);
      queryClient.setQueryData<T_Department[]>(["departments"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...data } : item))
          : [],
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
