"use client";

import { DocumentsTable } from "./components/DocumentsTable";
import { dummyDocuments } from "./utils/dummyDocuments";

export default function DocumentsPage() {
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Documents</h1>
            <DocumentsTable data={dummyDocuments} />
        </div>
    );
}
