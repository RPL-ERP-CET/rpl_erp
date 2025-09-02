import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_Address = {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

async function getAddress() {
  return (await api.get<T_ApiSuccessResponse<T_Address>>("/cms/address")).data;
}
async function updateAddress(id: string, data: Partial<T_Address>) {
  return (
    await api.put<T_ApiSuccessResponse<T_Address>>(`/cms/address/${id}`, data)
  ).data;
}

const addressService = {
  getAddress,
  updateAddress,
};

export default addressService;
