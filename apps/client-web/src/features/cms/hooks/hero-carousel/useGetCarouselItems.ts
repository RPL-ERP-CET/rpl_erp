import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { heroCarouselService } from "@cms";

export const useGetCarouselItems = () => {
  return useApiQuery({
    queryKey: ["carousel-items"],
    queryFn: heroCarouselService.getCarouselItems,
  });
};
