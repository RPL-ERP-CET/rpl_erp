import { useApiMutation } from "@client-web/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { contactService, type T_ContactInfo } from "@cms";

export const useDeleteContactPhone = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: contactService.deleteContactPhone,
    onMutate: async (id) => {
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
          phone: old.phone.filter((item) => item.id !== id),
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
