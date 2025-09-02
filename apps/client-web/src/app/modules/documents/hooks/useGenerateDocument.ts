import { useState } from "react";
import {
  DocumentFormInterface,
  generateDocumentService,
  T_GenerateDocumentResponse,
} from "../services/generateDocument.service";
import { getApiErrorMessage } from "../utils/apiErrorMessage";

// Hook which calls the generateDocument api call and also manages loading, error states
export function useGenerateDocument() {
  const [generateDocLoading, setGenerateDocLoading] = useState(false);
  const [generateDocError, setError] = useState<string | null>(null);

  const generateDocument = async (
    form: DocumentFormInterface,
  ): Promise<T_GenerateDocumentResponse | null> => {
    setGenerateDocLoading(true);
    setError(null);

    try {
      const res = await generateDocumentService(form);
      return res.data;
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Document generation failed"));
      return null;
    } finally {
      setGenerateDocLoading(false);
    }
  };

  return { generateDocument, generateDocLoading, generateDocError };
}
