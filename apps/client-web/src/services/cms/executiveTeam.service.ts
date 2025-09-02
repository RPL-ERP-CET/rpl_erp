import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type ExecutiveTeamMember = {
  id: string;
  name: string;
  designation: string;
  organizationAddress: string;
  contactNumber?: string[];
  image?: string;
};

async function getExecutiveTeamMembers() {
  return (
    await api.get<T_ApiSuccessResponse<ExecutiveTeamMember[]>>(
      "/cms/executive-team",
    )
  ).data;
}
async function getExecutiveTeamMember(id: string) {
  return (
    await api.get<T_ApiSuccessResponse<ExecutiveTeamMember>>(
      `/cms/executive-team/member/${id}`,
    )
  ).data;
}
async function createExecutiveTeamMember(data: ExecutiveTeamMember) {
  return (
    await api.post<T_ApiSuccessResponse<ExecutiveTeamMember>>(
      "/cms/executive-team/member",
      data,
    )
  ).data;
}
async function updateExecutiveTeamMember(
  id: string,
  data: Partial<ExecutiveTeamMember>,
) {
  return (
    await api.put<T_ApiSuccessResponse<ExecutiveTeamMember>>(
      `/cms/executive-team/member/${id}`,
      data,
    )
  ).data;
}
async function deleteExecutiveTeamMember(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<ExecutiveTeamMember>>(
      `/cms/executive-team/member/${id}`,
    )
  ).data;
}

const executiveTeamService = {
  getExecutiveTeamMembers,
  getExecutiveTeamMember,
  createExecutiveTeamMember,
  updateExecutiveTeamMember,
  deleteExecutiveTeamMember,
};

export default executiveTeamService;
