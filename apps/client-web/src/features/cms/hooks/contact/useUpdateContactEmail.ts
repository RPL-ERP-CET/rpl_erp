import { useApiMutation } from "@client-web/hooks";
import { contactService, type T_ContactInfo, type T_ContactEmail } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateContactEmail = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T_ContactEmail> }) =>
      contactService.updateContactEmail(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["contact"] });
      const previousContact = queryClient.getQueryData<T_ContactInfo>([
        "contact",
      ]);
      queryClient.setQueryData<T_ContactInfo>(["contact"], (old) => {
        if (!old) {
          return undefined;
        }
        return {
          ...old,
          email: old.email.map((item) =>
            item.id === id ? { ...item, ...data } : item,
          ),
        };
      });
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
