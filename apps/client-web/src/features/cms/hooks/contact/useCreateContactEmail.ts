import { useApiMutation } from "@client-web/hooks";
import { contactService, T_ContactInfo } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateContactEmail = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: contactService.createContactEmail,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["contact"] });
      const previousContact = queryClient.getQueryData<T_ContactInfo>([
        "contact",
      ]);
      queryClient.setQueryData<T_ContactInfo>(
        ["contact"],
        (old) =>
          ({
            ...old,
            email: [...(old?.email ?? []), data],
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
