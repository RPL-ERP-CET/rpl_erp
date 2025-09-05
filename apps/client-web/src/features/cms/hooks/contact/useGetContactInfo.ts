import { useApiQuery } from "@client-web/hooks";
import { contactService } from "@cms";

export const useGetContactInfo = () => {
  return useApiQuery({
    queryKey: ["contact"],
    queryFn: contactService.getContactInfo,
  });
};
