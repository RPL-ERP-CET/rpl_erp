import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_ContactPhone = { id: string; displayText: string; phone: string };
export type T_ContactEmail = { id: string; displayText: string; email: string };
export type T_ContactInfo = {
  phone: T_ContactPhone[];
  email: T_ContactEmail[];
};

async function getContactInfo() {
  const response =
    await api.get<T_ApiSuccessResponse<T_ContactInfo>>("/cms/contact");
  return response.data;
}

// Phone
async function createContactPhone(data: T_ContactPhone) {
  return (
    await api.post<T_ApiSuccessResponse<T_ContactPhone>>(
      "/cms/contact/phone",
      data,
    )
  ).data;
}
async function updateContactPhone(id: string, data: Partial<T_ContactPhone>) {
  return (
    await api.put<T_ApiSuccessResponse<T_ContactPhone>>(
      `/cms/contact/phone/${id}`,
      data,
    )
  ).data;
}
async function deleteContactPhone(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<T_ContactPhone>>(
      `/cms/contact/phone/${id}`,
    )
  ).data;
}

// Email
async function createContactEmail(data: T_ContactEmail) {
  return (
    await api.post<T_ApiSuccessResponse<T_ContactEmail>>(
      "/cms/contact/email",
      data,
    )
  ).data;
}
async function updateContactEmail(id: string, data: Partial<T_ContactEmail>) {
  return (
    await api.put<T_ApiSuccessResponse<T_ContactEmail>>(
      `/cms/contact/email/${id}`,
      data,
    )
  ).data;
}
async function deleteContactEmail(id: string) {
  return (
    await api.delete<T_ApiSuccessResponse<T_ContactEmail>>(
      `/cms/contact/email/${id}`,
    )
  ).data;
}

const contactService = {
  getContactInfo,
  createContactPhone,
  updateContactPhone,
  deleteContactPhone,
  createContactEmail,
  updateContactEmail,
  deleteContactEmail,
};

export default contactService;
