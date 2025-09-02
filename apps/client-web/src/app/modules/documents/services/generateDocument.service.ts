import api, { T_ApiSuccessResponse } from "@client-web/services/config/api";

export interface DocumentFormInterface {
  selectedTemplate: string | null;
  documentName: string;
  applyDigitalSignature: boolean;
}

export type T_GenerateDocumentResponse = {
  documentId: string;
  downloadUrl: string;
};

export async function generateDocumentService(form: DocumentFormInterface) {
  // Replace with actual API call that will generate document
  return (
    await api.post<T_ApiSuccessResponse<T_GenerateDocumentResponse>>(
      "/documents/generate",
      form,
    )
  ).data;
}
