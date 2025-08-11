"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@client-web/components/ui/DataTable";

type Log = {
    timestamp: string;
    category: string;
    action: string;
    user: string;
    date: Date;
};

const columns: ColumnDef<Log>[] = [
    { accessorKey: "timestamp", header: "Timestamp" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "action", header: "Action" },
    { accessorKey: "user", header: "User" },
    { accessorKey: "date", header: "Date" },
];

const data: Log[] = [
    {
        timestamp: "2024-10-27 10:00:00",
        category: "Authentication",
        action: "Login Success",
        user: "Admin",
        date: new Date("2024-10-27 10:00:00"),
    },
    {
        timestamp: "2024-10-27 10:00:00",
        category: "Authorization",
        action: "Access Granted",
        user: "Athul Anoop",
        date: new Date("2024-10-27 10:00:00"),
    },
];

export default function LogsPage() {
    return <DataTable columns={columns} data={data} />;
}
