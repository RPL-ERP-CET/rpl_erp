import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export async function deleteDocumentService(id: number) {
  // Update api for Document Deletion
  return (
    await api.get<T_ApiSuccessResponse<null>>(`/documents/delete?id=${id}`)
  ).data;
}
