import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { executiveTeamService } from "@cms";

export const useGetExecutiveTeamMember = (id: string) => {
  return useApiQuery({
    queryKey: ["executive-team-member", id],
    queryFn: () => executiveTeamService.getExecutiveTeamMember(id),
    enabled: !!id,
  });
};
