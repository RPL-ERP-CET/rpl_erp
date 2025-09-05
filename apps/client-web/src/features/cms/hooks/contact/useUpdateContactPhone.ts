import { useApiMutation } from "@client-web/hooks";
import { contactService, T_ContactInfo, T_ContactPhone } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateContactPhone = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T_ContactPhone> }) =>
      contactService.updateContactPhone(id, data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ["contact"] });
      const previousContact = queryClient.getQueryData<T_ContactInfo>([
        "contact",
      ]);
      queryClient.setQueryData<T_ContactInfo>(
        ["contact"],
        (old) =>
          ({
            ...old,
            phone: old?.phone.map((p) =>
              p.id === data.id ? { ...p, ...data } : p,
            ),
          }) as T_ContactInfo,
      );
      return { previousContact };
    },
    onError: (_error, _id, context) => {
      if (context?.previousContact) {
        queryClient.setQueryData<T_ContactInfo>(
          ["contact"],
          context.previousContact,
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};
