import { useState } from "react";
import { downloadDocumentService } from "../services/downloadDocument.service";
import { getApiErrorMessage } from "../utils/apiErrorMessage";

export function useDownloadDocument() {
  // Stores the set of ids of documents, which is the rows in documents table,
  // that are currently being downloaded
  const [downloadLoadingIds, setDownloadLoadingIds] = useState<Set<number>>(
    new Set(),
  );

  const downloadDocument = async (id: number) => {
    setDownloadLoadingIds((prev) => new Set(prev).add(id));

    try {
      const blob = (await downloadDocumentService(id)).data;

      // Put Logic of what to do after successfully receiving file from api call

      // Dummy code
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      alert(getApiErrorMessage(err, "Download failed"));
      return;
    } finally {
      setDownloadLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return { downloadDocument, downloadLoadingIds };
}
