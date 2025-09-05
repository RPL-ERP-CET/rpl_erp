import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { publicationService } from "@cms";

export const useGetPublications = () => {
  return useApiQuery({
    queryKey: ["publications"],
    queryFn: publicationService.getPublications,
  });
};
