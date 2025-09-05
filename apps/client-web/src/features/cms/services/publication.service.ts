import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_Publication = {
  id: string;
  title: string;
  href: string;
};

async function getPublications() {
  return (
    await api.get<T_ApiSuccessResponse<T_Publication[]>>("/cms/publications")
  ).data;
}
async function createPublication(data: T_Publication) {
  return (
    await api.post<T_ApiSuccessResponse<T_Publication>>(
      "/cms/publications",
      data,
    )
  ).data;
}
async function updatePublication(id: string, data: Partial<T_Publication>) {
  return (
    await api.put<T_ApiSuccessResponse<T_Publication>>(
      `/cms/publications/${id}`,
      data,
    )
  ).data;
}
async function deletePublication(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<T_Publication>>(
      `/cms/publications/${id}`,
    )
  ).data;
}

export const publicationService = {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
};
