"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { cn } from "@client-web/lib/utils";
import { format } from "date-fns";
import DatePicker from "./DatePicker";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [searchValue, setSearchValue] = React.useState("");
    // Changed from `"all" | string` to just `string` to fix the ESLint type error
    const [searchScope, setSearchScope] = React.useState<string>("all");
    const [dateFilter, setDateFilter] = React.useState<Date | undefined>();

    const table = useReactTable({
        data,
        columns,
        state: {},
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // Detect all date-like columns
    const dateColumns = React.useMemo(() => {
        return table
            .getAllLeafColumns()
            .filter((col) =>
                ["date", "createdat", "updatedat", "timestamp"].includes(
                    col.id.toLowerCase(),
                ),
            );
    }, [columns, table]);

    // Apply search filtering
    React.useEffect(() => {
        if (searchScope === "all") {
            table.setGlobalFilter(searchValue);
            table.getAllLeafColumns().forEach((col) => col.setFilterValue(""));
        } else {
            table.setGlobalFilter("");
            table.getAllLeafColumns().forEach((col) => {
                col.setFilterValue(col.id === searchScope ? searchValue : "");
            });
        }
    }, [searchValue, searchScope, table]);

    // Apply date filtering independently
    React.useEffect(() => {
        dateColumns.forEach((col) => {
            col.setFilterValue(
                dateFilter ? format(dateFilter, "yyyy-MM-dd") : "",
            );
        });
    }, [dateFilter, dateColumns]);

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex flex-wrap gap-2 items-center">
                {/* Column filter select */}
                <select
                    value={searchScope}
                    onChange={(e) => setSearchScope(e.target.value)}
                    className="px-2 py-2 border rounded-md"
                >
                    <option value="all">All</option>
                    {table.getAllLeafColumns().map((col) => (
                        <option key={col.id} value={col.id}>
                            {col.id}
                        </option>
                    ))}
                </select>

                {/* Search input */}
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={`Search in ${searchScope}`}
                    className="flex-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
                />

                {/* Date filter if any date columns exist */}
                {dateColumns.length > 0 && (
                    <DatePicker date={dateFilter} onChange={setDateFilter} />
                )}
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={cn(
                                            "px-4 py-2 text-left font-medium select-none",
                                            header.column.getCanSort() &&
                                                "cursor-pointer",
                                        )}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {header.column.getIsSorted() === "asc"
                                            ? " ↑"
                                            : header.column.getIsSorted() ===
                                                "desc"
                                              ? " ↓"
                                              : null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-2">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
