import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export async function downloadDocumentService(id: number) {
  // Update api for Document Download
  return (
    await api.get<T_ApiSuccessResponse<Blob>>(`/documents/download?id=${id}`, {
      responseType: "blob",
    })
  ).data;
}
