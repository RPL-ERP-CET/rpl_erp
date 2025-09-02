import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export async function fetchTemplatesService(): Promise<string[]> {
  // Dummy Templates Returning
  return ["dummyTemplate1", "dummyTemplate2", "dummyTemplate3"];

  // Fetch Template Api Call

  const res = await api.get<T_ApiSuccessResponse<string[]>>("/templates");
  return res.data.data;
}
