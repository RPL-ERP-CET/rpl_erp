import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export type T_UploadDocumentResponse = { url: string };

export async function uploadDocumentService(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  // Update api for Document Upload
  return (
    await api.post<T_ApiSuccessResponse<T_UploadDocumentResponse>>(
      "/documents/upload",
      formData,
    )
  ).data;
}
