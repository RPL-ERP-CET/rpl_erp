import { useState } from "react";
import {
  uploadDocumentService,
  T_UploadDocumentResponse,
} from "../services/uploadDocument.service";
import { getApiErrorMessage } from "../utils/apiErrorMessage";

export function useUploadDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadDocument = async (
    file: File,
  ): Promise<T_UploadDocumentResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await uploadDocumentService(file);
      return res.data;
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Document Upload failed"));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadDocument, loading, error };
}
