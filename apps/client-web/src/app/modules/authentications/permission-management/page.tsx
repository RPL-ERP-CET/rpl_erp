"use client";

import { Button } from "@client-web/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@client-web/components/ui/table";
import { usePermissionStore } from "@client-web/app/stores/permissionStore";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PermissionManagementPage() {
    const { permissionData, addPermission, deletePermission } = usePermissionStore();

    const [newPermission, setNewPermission] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 3;

    const totalPermissions = permissionData.permissionName.length;
    const totalPages = Math.ceil(totalPermissions / rowsPerPage);

    const currentData = permissionData.permissionName.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    const handlePermissionAdd = () => {
        if (!newPermission.trim()) return;
        addPermission(newPermission);
        setNewPermission("");
    };

    return (
        <div className="flex flex-col overflow-scroll py-5 px-3 h-[90vh]">
            {/* title */}
            <h2 className="text-[36px] text-center font-bold mb-3">
                Permission Management
            </h2>

            {/* adding new permissions */}
            <div className="flex flex-col gap-3 px-3 mt-6">
                <span className="font-semibold text-[18px]">Define new Permission</span>
                <div className="flex gap-4 items-center">
                    <input
                        value={newPermission}
                        onChange={(e) => setNewPermission(e.target.value)}
                        type="text"
                        placeholder="Enter permission name"
                        className="border border-black p-2 rounded w-[300px]"
                    />
                    <Button
                        onClick={handlePermissionAdd}
                        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Add Permission
                    </Button>
                </div>
            </div>

            {/* existing permissions */}
            <div className="px-3 mt-4">
                <h3 className="text-[20px] font-semibold mt-6 mb-4">
                    Existing Permissions
                </h3>
                <div className="items-center max-h-[300px] overflow-y-auto">
                    {/* table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Permissions</TableHead>
                                <TableHead className="w-[100px] text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        {/* table contents */}
                        <TableBody>
                            {currentData.map((perm, index) => (
                                <TableRow key={index}>
                                    <TableCell>{perm}</TableCell>
                                    <TableCell className="text-center flex gap-3 justify-center">
                                        <Button className="bg-blue-400 text-white px-4 rounded hover:bg-blue-600 transition">
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                deletePermission(currentPage * rowsPerPage + index)
                                            }
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* pagination controls */}
                <div className="flex justify-end gap-4 text-[16px] px-[50px] mt-[30px] items-center">
                    <Button
                        variant="ghost"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        <ChevronLeft />
                    </Button>

                    <span className="font-semibold">
                        Page {currentPage + 1} of {totalPages}
                    </span>

                    <Button
                        variant="ghost"
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        <ChevronRight />
                    </Button>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[18px]">
                        Permission Auditing
                    </span>
                    <span className="text-sm text-[16px] ">
                        Last permission update: {permissionData.permissionUpdate}
                    </span>
                </div>

                <div className="mt-6 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[18px]">
                        Impact Analysis
                    </span>
                    <span className="text-sm text-[16px] ">
                        Changing 'Read all documents' permission may affect document
                        visibility for all users.
                    </span>
                </div>
            </div>
        </div>
    );
}
