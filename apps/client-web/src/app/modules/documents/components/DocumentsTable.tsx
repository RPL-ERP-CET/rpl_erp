"use client";

import { useState } from "react";
import { useMemo } from "react";

import { DataTable } from "@client-web/components/custom/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Download, EllipsisVertical, Loader, Trash2 } from "lucide-react";

import { Document } from "../utils/dummyDocuments";
import { handleDownload } from "../utils/download";

// Documents passing as props
interface DocumentsTableProps {
    data: Document[];
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({ data }) => {
    const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

    // Dummy Column Definitions
    const columns = useMemo<ColumnDef<Document>[]>(
        () => [
            { accessorKey: "name", header: "Name" },
            { accessorKey: "type", header: "Type" },
            { accessorKey: "version", header: "Version" },
            { accessorKey: "uploadedBy", header: "Uploaded By" },
            { accessorKey: "uploadedDate", header: "Date" },
            { accessorKey: "uploadedTime", header: "Time" },
            {
                accessorKey: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex ">
                        {/** Download Button */}
                        <button
                            className="px-2 py-1 rounded hover:scale-120 hover:text-green-600 transition-all duration-300"
                            disabled={loadingIds.has(row.original.id)}
                            onClick={() => {
                                handleDownload(
                                    row.original.id,
                                    data,
                                    setLoadingIds,
                                );
                            }}
                        >
                            {loadingIds.has(row.original.id) ? (
                                <Loader size={20} className="animate-spin" />
                            ) : (
                                <Download size={20} />
                            )}
                        </button>

                        {/** Delete Button */}
                        <button
                            className="px-2 py-1 rounded hover:scale-120 hover:text-red-500 transition-all duration-300"
                            onClick={() =>
                                alert(`Deleting ${row.original.name}`)
                            }
                        >
                            <Trash2 size={20} />
                        </button>

                        {/** More options Button */}
                        <button
                            className="px-2 py-1  rounded hover:scale-120 hover:text-blue-400 transition-all duration-300"
                            onClick={() =>
                                alert(`Show more options ${row.original.name}`)
                            }
                        >
                            <EllipsisVertical size={20} />
                        </button>
                    </div>
                ),
            },
        ],
        [data, loadingIds],
    );

    return <DataTable columns={columns} data={data} />;
};
