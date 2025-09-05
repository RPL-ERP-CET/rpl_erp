import { useApiQuery } from "@client-web/hooks/useApiQuery";
import { executiveTeamService } from "@cms";

export const useGetExecutiveTeamMembers = () => {
  return useApiQuery({
    queryKey: ["executive-team-members"],
    queryFn: executiveTeamService.getExecutiveTeamMembers,
  });
};
