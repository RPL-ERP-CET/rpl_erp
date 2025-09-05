import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { aboutService } from "@cms";

export const useGetAboutItems = () => {
  const query = useApiQuery({
    queryKey: ["about-items"],
    queryFn: aboutService.getAboutItems,
  });

  return query;
};
