"use client";
import React, { useState } from "react";
import { Search, Edit, Trash2, Plus, X, Check } from "lucide-react";
import { useRoles } from "../hooks/useRoles";
import { Role, CreateRoleData } from "../types/roleTypes";

const RoleManagement: React.FC = () => {
    const {
        roles,
        permissions,
        loading,
        error,
        success,
        createRole,
        updateRole,
        deleteRole,
        setError,
    } = useRoles();

    const [showForm, setShowForm] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [newRole, setNewRole] = useState<CreateRoleData>({
        name: "",
        permissions: [],
    });

    const [filterBy, setFilterBy] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // filtering + pagination
    const filtered = roles.filter(
        (r) =>
            (filterBy === "All" || r.name === filterBy) &&
            r.name.toLowerCase().includes(search.toLowerCase()),
    );
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage,
    );

    const handleSubmit = async () => {
        if (!newRole.name.trim()) {
            setError("Role name is required");
            return;
        }
        if (editingRole) {
            await updateRole(editingRole.id, newRole);
        } else {
            await createRole(newRole);
        }
        setNewRole({ name: "", permissions: [] });
        setEditingRole(null);
        setShowForm(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold mb-4">Role Management</h1>

            {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
                    <Check className="w-5 h-5 mr-2" /> {success}
                </div>
            )}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {/* Create Role */}
            <div className="mb-6">
                {!showForm ? (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Role
                    </button>
                ) : (
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-medium">
                                {editingRole ? "Edit Role" : "New Role"}
                            </h3>
                            <button onClick={() => setShowForm(false)}>
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={newRole.name}
                            onChange={(e) =>
                                setNewRole({ ...newRole, name: e.target.value })
                            }
                            placeholder="Role name"
                            className="w-full border px-3 py-2 mb-3 rounded"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                            {permissions.map((p) => (
                                <label
                                    key={p.id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={newRole.permissions.includes(
                                            p.id,
                                        )}
                                        onChange={() =>
                                            setNewRole((prev) => ({
                                                ...prev,
                                                permissions:
                                                    prev.permissions.includes(
                                                        p.id,
                                                    )
                                                        ? prev.permissions.filter(
                                                              (x) => x !== p.id,
                                                          )
                                                        : [
                                                              ...prev.permissions,
                                                              p.id,
                                                          ],
                                            }))
                                        }
                                    />
                                    {p.name}
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={void handleSubmit}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {editingRole ? "Update" : "Create"}
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Manage Roles */}
            <div>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <select
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value);
                            setPage(1);
                        }}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="All">All</option>
                        {Array.from(new Set(roles.map((r) => r.name))).map(
                            (n) => (
                                <option key={n}>{n}</option>
                            ),
                        )}
                    </select>
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search roles..."
                            className="w-full pl-10 pr-4 py-2 border rounded"
                        />
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Role</th>
                                <th className="px-4 py-2 text-left">
                                    Permissions
                                </th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((role) => (
                                <tr key={role.id} className="border-t">
                                    <td className="px-4 py-2">{role.name}</td>
                                    <td className="px-4 py-2">
                                        {role.permissions
                                            .slice(0, 3)
                                            .join(", ")}
                                        {role.permissions.length > 3 &&
                                            ` +${role.permissions.length - 3} more`}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingRole(role);
                                                setNewRole({
                                                    name: role.name,
                                                    permissions:
                                                        role.permissions,
                                                });
                                                setShowForm(true);
                                            }}
                                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                        >
                                            <Edit className="w-3 h-3 inline" />{" "}
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                void deleteRole(role.id)
                                            }
                                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                        >
                                            <Trash2 className="w-3 h-3 inline" />{" "}
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() =>
                                setPage((p) => Math.min(totalPages, p + 1))
                            }
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoleManagement;
