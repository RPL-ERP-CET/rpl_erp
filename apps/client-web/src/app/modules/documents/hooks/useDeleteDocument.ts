import { useState } from "react";
import { deleteDocumentService } from "../services/deleteDocument.service";
import { getApiErrorMessage } from "../utils/apiErrorMessage";

export function useDeleteDocument() {
  const [deleteLoadingIds, setDeletingLoadingIds] = useState<Set<number>>(
    new Set(),
  );

  const deleteDocument = async (id: number) => {
    setDeletingLoadingIds((prev) => new Set(prev).add(id));

    try {
      const res = (await deleteDocumentService(id)).data;
      console.log(res);

      // Put Logic of what to do after successfully deleting the document with api call
    } catch (err: unknown) {
      alert(getApiErrorMessage(err, "Document Deletion failed"));
      return;
    } finally {
      setDeletingLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return { deleteDocument, deleteLoadingIds };
}
