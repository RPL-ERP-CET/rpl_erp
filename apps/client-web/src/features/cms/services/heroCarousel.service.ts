import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_CarouselItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

async function getCarouselItems() {
  return (
    await api.get<T_ApiSuccessResponse<T_CarouselItem[]>>(
      "/cms/landing/hero-carousel",
    )
  ).data;
}
async function createCarouselItem(data: T_CarouselItem) {
  return (
    await api.post<T_ApiSuccessResponse<T_CarouselItem>>(
      "/cms/landing/hero-carousel",
      data,
    )
  ).data;
}
async function updateCarouselItem({
  id,
  data,
}: {
  id: string;
  data: T_CarouselItem;
}) {
  return (
    await api.put<T_ApiSuccessResponse<T_CarouselItem>>(
      `/cms/landing/hero-carousel/${id}`,
      data,
    )
  ).data;
}
async function deleteCarouselItem(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<T_CarouselItem>>(
      `/cms/landing/hero-carousel/${id}`,
    )
  ).data;
}

const heroCarouselService = {
  getCarouselItems,
  createCarouselItem,
  updateCarouselItem,
  deleteCarouselItem,
};

export default heroCarouselService;
