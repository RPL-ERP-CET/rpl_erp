import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_Product = {
  displayName: string;
  unit:
    | "kg"
    | "ml"
    | "mls"
    | "g"
    | "l"
    | "m"
    | "cm"
    | "mm"
    | "in"
    | "pc"
    | "pt"
    | "s"
    | "%";
  rate: number;
};

export type T_ProductFilters = {
  displayName?: string;
  rate?: number;
  page?: number;
  limit?: number;
};

async function getProducts() {
  return (
    await api.get<T_ApiSuccessResponse<T_Product[]>>("/cms/landing/products")
  ).data;
}
async function getProductById(id: string) {
  return (
    await api.get<T_ApiSuccessResponse<T_Product>>(
      `/cms/landing/products/${id}`,
    )
  ).data;
}
async function getProductsByFilters(filters: T_ProductFilters) {
  return (
    await api.get<T_ApiSuccessResponse<T_Product[]>>(`/cms/landing/products`, {
      params: filters,
    })
  ).data;
}
async function createProduct(product: T_Product) {
  return (
    await api.post<T_ApiSuccessResponse<T_Product>>(
      "/cms/landing/products",
      product,
    )
  ).data;
}
async function updateProduct(id: string, product: T_Product) {
  return (
    await api.put<T_ApiSuccessResponse<T_Product>>(
      `/cms/landing/products/${id}`,
      product,
    )
  ).data;
}
async function deleteProduct(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<T_Product>>(
      `/cms/landing/products/${id}`,
    )
  ).data;
}

export const productsService = {
  getProducts,
  getProductById,
  getProductsByFilters,
  createProduct,
  updateProduct,
  deleteProduct,
};
