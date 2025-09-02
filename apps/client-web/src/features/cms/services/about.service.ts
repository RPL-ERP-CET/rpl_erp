import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_AboutItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

async function getAboutItems() {
  return (
    await api.get<T_ApiSuccessResponse<T_AboutItem[]>>("/cms/landing/about-us")
  ).data;
}
async function createAboutItem(data: T_AboutItem) {
  return (
    await api.post<T_ApiSuccessResponse<T_AboutItem>>(
      "/cms/landing/about-us",
      data,
    )
  ).data;
}
async function updateAboutItem(id: string, data: Partial<T_AboutItem>) {
  return (
    await api.put<T_ApiSuccessResponse<T_AboutItem>>(
      `/cms/landing/about-us/${id}`,
      data,
    )
  ).data;
}
async function deleteAboutItem(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<T_AboutItem>>(
      `/cms/landing/about-us/${id}`,
    )
  ).data;
}

const aboutService = {
  getAboutItems,
  createAboutItem,
  updateAboutItem,
  deleteAboutItem,
};

export default aboutService;
