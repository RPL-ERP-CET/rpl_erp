"use client";

import { DocumentsTable } from "./components/DocumentsTable";
import { dummyDocuments } from "./utils/dummyDocuments";

import { Button } from "@client-web/components/ui/button";
import { handleDocumentUpload } from "./utils/logic/handleDocumentUpload";

export default function DocumentsPage() {
    return (
        <div className="p-4 space-y-4">
            <header className="flex justify-between">
                <h1 className="text-xl font-bold">Documents Dashboard</h1>
                <Button
                    onClick={() => {
                        handleDocumentUpload();
                    }}
                >
                    Upload Documents
                </Button>
            </header>
            <DocumentsTable data={dummyDocuments} />
        </div>
    );
}
