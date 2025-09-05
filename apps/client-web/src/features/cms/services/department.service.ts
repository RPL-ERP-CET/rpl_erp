import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_Department = {
  id: string;
  name: string;
  href: string;
};

async function getDepartments() {
  return (
    await api.get<T_ApiSuccessResponse<T_Department[]>>("/cms/departments")
  ).data;
}
async function createDepartment(data: T_Department) {
  return (
    await api.post<T_ApiSuccessResponse<T_Department>>("/cms/departments", data)
  ).data;
}
async function updateDepartment(id: string, data: Partial<T_Department>) {
  return (
    await api.put<T_ApiSuccessResponse<T_Department>>(
      `/cms/departments/${id}`,
      data,
    )
  ).data;
}
async function deleteDepartment(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<T_Department>>(
      `/cms/departments/${id}`,
    )
  ).data;
}

export const departmentService = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
