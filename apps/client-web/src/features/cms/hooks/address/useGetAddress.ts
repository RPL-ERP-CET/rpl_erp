import { useApiQuery } from "@client-web/hooks";
import { addressService } from "@cms";

export const useGetAddress = () => {
  return useApiQuery({
    queryKey: ["address"],
    queryFn: addressService.getAddress,
  });
};
