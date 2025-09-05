import { useApiMutation } from "@client-web/hooks";
import { executiveTeamService, type ExecutiveTeamMember } from "@cms";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteExecutiveTeamMember = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: (id: string) =>
      executiveTeamService.deleteExecutiveTeamMember(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["executive-team-members"] });
      await queryClient.cancelQueries({
        queryKey: ["executive-team-member", id],
      });

      const previousItems = queryClient.getQueryData<ExecutiveTeamMember[]>([
        "executive-team-members",
      ]);
      queryClient.setQueryData<ExecutiveTeamMember[]>(
        ["executive-team-members"],
        (old) => (old ? old.filter((item) => item.id !== id) : []),
      );

      const previousItem = queryClient.getQueryData<ExecutiveTeamMember>([
        "executive-team-member",
        id,
      ]);
      if (previousItem) {
        queryClient.removeQueries({ queryKey: ["executive-team-member", id] });
      }

      return { previousItems, previousItem };
    },
    onError: (_error, id, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<ExecutiveTeamMember[]>(
          ["executive-team-members"],
          context.previousItems,
        );
      }
      if (context?.previousItem) {
        queryClient.setQueryData<ExecutiveTeamMember>(
          ["executive-team-member", id],
          context.previousItem,
        );
      }
    },
    onSettled: async (_data, _error, id) => {
      await queryClient.invalidateQueries({
        queryKey: ["executive-team-members"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["executive-team-member", id],
      });
    },
  });
};
