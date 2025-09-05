import { useApiMutation } from "@client-web/hooks";
import { executiveTeamService, type ExecutiveTeamMember } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateExecutiveTeamMember = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: executiveTeamService.createExecutiveTeamMember,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["executive-team-members"] });
      const previousItems = queryClient.getQueryData<ExecutiveTeamMember[]>([
        "executive-team-members",
      ]);
      queryClient.setQueryData<ExecutiveTeamMember[]>(
        ["executive-team-members"],
        (old) => [...(old ?? []), data],
      );
      return { previousItems };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<ExecutiveTeamMember[]>(
          ["executive-team-members"],
          context.previousItems,
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["executive-team-members"],
      });
    },
  });
};
