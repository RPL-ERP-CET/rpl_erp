import { useApiMutation } from "@client-web/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { addressService, T_Address } from "@cms";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T_Address> }) =>
      addressService.updateAddress(id, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ["address"] });
      const previousAddress = queryClient.getQueryData<T_Address>(["address"]);
      queryClient.setQueryData<T_Address>(["address"], (old) => ({
        ...old!,
        ...data,
      }));
      return { previousAddress };
    },
    onError: (_error, _id, context) => {
      if (context?.previousAddress) {
        queryClient.setQueryData(["address"], context.previousAddress);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};
