import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { departmentService } from "@cms";

export const useGetDepartments = () => {
  return useApiQuery({
    queryKey: ["departments"],
    queryFn: departmentService.getDepartments,
  });
};
