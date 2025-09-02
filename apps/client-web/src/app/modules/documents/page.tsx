"use client";

import { DocumentsTable } from "./components/DocumentsTable";
import { dummyDocuments } from "./utils/dummyDocuments";

import { Button } from "@client-web/components/ui/button";
import { useUploadDocument } from "./hooks/useUploadDocument";

export default function DocumentsPage() {
  const { uploadDocument, loading, error } = useUploadDocument();

  const handleUploadClick = async () => {
    // Dummy File Passing to Hook
    const file = new File(["dummy"], "dummy.txt");
    const res = await uploadDocument(file);
    if (res) console.log("Uploaded:", res.url);
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex justify-between">
        <h1 className="text-xl font-bold">Documents Dashboard</h1>
        <Button onClick={() => void handleUploadClick} disabled={loading}>
          {loading ? "Uploading..." : "Upload Documents"}
        </Button>
      </header>

      {error && <p className="text-red-500 flex justify-end">{error}</p>}

      <DocumentsTable data={dummyDocuments} />
    </div>
  );
}
