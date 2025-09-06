"use client";

import { UserAdminData } from "@client-web/app/mocks/Authorization/userAdminData";
import { usePermissionStore } from "@client-web/app/stores/permissionStore";
import { useState } from "react";
import { Button } from "@client-web/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from "@client-web/components/ui/table";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function USERADMINPage() {
    const { addPermission, deletePermission } = usePermissionStore();

    const [newPermission, setNewPermission] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [filterType, setFilterType] = useState("");   
    const [searchQuery, setSearchQuery] = useState(""); 
    const rowsPerPage = 3;

    // Filtering logic
    const filteredData = UserAdminData.filter((item) => {
        const query = searchQuery.toLowerCase();

        if (!query) return true; 

        if (filterType === "user") {
            return item.user.toLowerCase().includes(query);
        }
        if (filterType === "role") {
            return item.role.toLowerCase().includes(query);
        }

        return (
            item.user.toLowerCase().includes(query) ||
            item.role.toLowerCase().includes(query)
        );
    });

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const currentData = filteredData.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    const handlePermissionAdd = () => {
        if (!newPermission.trim()) return;
        addPermission(newPermission);
        setNewPermission("");
    };

    return (
        <div className="flex flex-col overflow-auto py-3 px-5 min-h-[90vh]">
            <h1 className="text-[28px] font-bold ">User Administration</h1>
            <h3 className="my-[15px] text-[18px] ">Create New User</h3>

            {/* create new user */}
            <div>
                <form onSubmit={() => handlePermissionAdd} className="grid grid-cols-2 gap-6 mt-3 max-w-3xl " >
                    <div className="flex flex-col">
                        <label className="font-semibold text-[18px] mb-1">Username</label>
                        <input required type="text" placeholder="Enter username" className="border border-black p-2 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[18px] mb-1">Email</label>
                        <input required type="email" placeholder="Enter email" className="border border-black p-2 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[18px] mb-1">Select Role</label>
                        <select className="border border-black p-2 rounded">
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                        </select>
                    </div>
                    <div className="flex justify-start">
                        <Button type="submit" className="self-end bg-blue-500 text-white max-w-xl px-5 py-2 rounded hover:bg-blue-600 transition">
                            Create User
                        </Button>
                    </div>
                </form>

                {/* manage users */}
                <div className="mt-10 flex gap-5 items-center relative">
                    <h3 className="text-[22px] font-semibold mb-4">Filter By:</h3>
                    <div className="flex gap-8 border-gray-300 rounded ml-[20px] items-center">
                        {/* dropdown */}
                        <div className="relative">
                            <select
                                value={filterType}
                                onChange={(e) => {
                                    setFilterType(e.target.value);
                                    setCurrentPage(0); 
                                }}
                                className="appearance-none p-2 border border-gray-500 rounded w-[200px]"
                            >
                                <option value="">All</option>
                                <option value="user">User</option>
                                <option value="role">Role</option>
                            </select>
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                                size={16}
                            />
                        </div>

                        {/* search input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(0); // reset page
                                }}
                                className="py-2 px-3 border border-gray-500 rounded w-[300px]"
                            />
                            <Search
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                                size={18}
                            />
                        </div>
                    </div>
                </div>

                {/* table container */}
                <div className="items-center max-h-[300px] mt-[20px] overflow-y-auto ">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">User</TableHead>
                                <TableHead className="w-[50px]">Role</TableHead>
                                <TableHead className="w-[100px] text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {currentData.length > 0 ? (
                                currentData.map((perm, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{perm.user}</TableCell>
                                        <TableCell>{perm.role}</TableCell>
                                        <TableCell className="text-center flex gap-3 justify-center">
                                            <Button className="bg-blue-400 text-white px-4 rounded hover:bg-blue-600 transition">
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => deletePermission(index)}
                                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                DeActivate
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-5 text-gray-500">
                                        No results found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* pagination controls */}
                    <div className="flex justify-end mt-2 gap-4 text-[16px] px-[30px] my-[20px] items-center">
                        <Button
                            variant="ghost"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            <ChevronLeft />
                        </Button>

                        <span className="font-semibold">
                            Page {currentPage + 1} of {totalPages || 1}
                        </span>

                        <Button
                            variant="ghost"
                            disabled={currentPage === totalPages - 1 || totalPages === 0}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
