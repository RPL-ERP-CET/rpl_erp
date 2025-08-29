"use client";
import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, Plus, X, Check } from "lucide-react";
import {
    mockRoles,
    mockPermissions,
    Role,
    Permission,
} from "../../../../features/role-management/mocks/roleManagementMockData"; // Import mock data and types

// Type definitions
interface CreateRoleData {
    name: string;
    description: string;
    permissions: string[];
}

const RoleManagement: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    // Form states
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [newRole, setNewRole] = useState<CreateRoleData>({
        name: "",
        description: "",
        permissions: [],
    });

    // Filter states
    const [filterBy, setFilterBy] = useState<string>("All");
    const [searchUsername, setSearchUsername] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;

    // API functions with proper typing
    const api = {
        // Fetch all roles
        getRoles: (): Role[] => {
            setLoading(true);
            try {
                // const response = await axios.get<Role[]>('/api/roles');
                // Using mock data
                setRoles([...mockRoles]);
                return mockRoles;
            } catch (err) {
                setError("Failed to fetch roles");
                throw err;
            } finally {
                setLoading(false);
            }
        },

        // Fetch available permissions
        getPermissions: (): Permission[] => {
            try {
                // const response = await axios.get<Permission[]>('/api/permissions');
                // Using mock data
                setPermissions([...mockPermissions]);
                return mockPermissions;
            } catch (err) {
                setError("Failed to fetch permissions");
                throw err;
            }
        },

        // Create new role
        createRole: (roleData: CreateRoleData): Role => {
            try {
                // const response = await axios.post<Role>('/api/roles', roleData);
                const newRoleWithId: Role = {
                    ...roleData,
                    id: Date.now(), // Mock ID generation
                };
                setRoles((prev) => [...prev, newRoleWithId]);
                setSuccess("Role created successfully");
                return newRoleWithId;
            } catch (err) {
                setError("Failed to create role");
                throw err;
            }
        },

        // Update role
        updateRole: (id: number, roleData: CreateRoleData): Role => {
            try {
                //const response = await axios.put<Role>(`/api/roles/${id}`, roleData);
                const updatedRole: Role = { id, ...roleData };
                setRoles((prev) =>
                    prev.map((role) => (role.id === id ? updatedRole : role)),
                );
                setSuccess("Role updated successfully");
                return updatedRole;
            } catch (err) {
                setError("Failed to update role");
                throw err;
            }
        },

        // Delete role
        deleteRole: (id: number): void => {
            try {
                // await axios.delete(`/api/roles/${id}`);
                setRoles((prev) => prev.filter((role) => role.id !== id));
                setSuccess("Role deleted successfully");
            } catch (err) {
                setError("Failed to delete role");
                throw err;
            }
        },
    };

    // Load data on component mount
    useEffect(() => {
        const loadData = (): void => {
            try {
                api.getRoles();
                api.getPermissions();
            } catch (err) {
                console.error("Failed to load data:", err);
            }
        };
        loadData();
    }, []);

    // Clear messages after 3 seconds
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    // Handle form submission
    const handleSubmit = (): void => {
        if (!newRole.name.trim()) {
            setError("Role name is required");
            return;
        }

        try {
            if (editingRole) {
                api.updateRole(editingRole.id, newRole);
                setEditingRole(null);
            } else {
                api.createRole(newRole);
            }

            setNewRole({ name: "", description: "", permissions: [] });
            setShowCreateForm(false);
        } catch (err) {
            console.error("Form submission failed:", err);
        }
    };

    // Handle permission toggle
    const togglePermission = (permissionId: string): void => {
        setNewRole((prev) => ({
            ...prev,
            permissions: prev.permissions.includes(permissionId)
                ? prev.permissions.filter((p) => p !== permissionId)
                : [...prev.permissions, permissionId],
        }));
    };

    // Start editing role
    const startEdit = (role: Role): void => {
        setNewRole({
            name: role.name,
            description: role.description || "",
            permissions: role.permissions || [],
        });
        setEditingRole(role);
        setShowCreateForm(true);
    };

    // Cancel edit/create
    const cancelForm = (): void => {
        setNewRole({ name: "", description: "", permissions: [] });
        setEditingRole(null);
        setShowCreateForm(false);
        setError("");
    };

    // Delete role with confirmation
    const handleDelete = (role: Role): void => {
        if (
            window.confirm(
                `Are you sure you want to delete the "${role.name}" role?`,
            )
        ) {
            api.deleteRole(role.id);
        }
    };

    // Filter and paginate roles
    const filteredRoles: Role[] = roles.filter((role) => {
        const matchesFilter: boolean =
            filterBy === "All" || role.name === filterBy;
        const matchesSearch: boolean = role.name
            .toLowerCase()
            .includes(searchUsername.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalPages: number = Math.ceil(filteredRoles.length / itemsPerPage);
    const paginatedRoles: Role[] = filteredRoles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const startIndex: number = (currentPage - 1) * itemsPerPage + 1;
    const endIndex: number = Math.min(
        currentPage * itemsPerPage,
        filteredRoles.length,
    );

    // Event handlers with proper typing
    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        setFilterBy(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setSearchUsername(e.target.value);
        setCurrentPage(1);
    };

    const handleRoleNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setNewRole((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleRoleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setNewRole((prev) => ({ ...prev, description: e.target.value }));
    };

    const handlePreviousPage = (): void => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = (): void => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Role Management
                </h1>

                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
                        <Check className="w-5 h-5 mr-2" />
                        {success}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {/* Create New Role Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Create New Role
                    </h2>

                    {!showCreateForm ? (
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Role
                        </button>
                    ) : (
                        <div className="bg-gray-50 p-6 rounded-lg border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {editingRole ? "Edit Role" : "New Role"}
                                </h3>
                                <button
                                    onClick={cancelForm}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={newRole.name}
                                            onChange={handleRoleNameChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter role name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            value={newRole.description}
                                            onChange={
                                                handleRoleDescriptionChange
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter role description"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Permissions
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {permissions.map(
                                            (permission: Permission) => (
                                                <label
                                                    key={permission.id}
                                                    className="flex items-center space-x-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={newRole.permissions.includes(
                                                            permission.id,
                                                        )}
                                                        onChange={() =>
                                                            togglePermission(
                                                                permission.id,
                                                            )
                                                        }
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {permission.name}
                                                    </span>
                                                </label>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                                    >
                                        {editingRole
                                            ? "Update Role"
                                            : "Create Role"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelForm}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Manage Roles Section */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Manage Roles
                    </h2>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Filter By:
                            </label>
                            <select
                                value={filterBy}
                                onChange={handleFilterChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All</option>
                                {Array.from(
                                    new Set(
                                        roles.map((role: Role) => role.name),
                                    ),
                                ).map((name: string) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 max-w-md relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchUsername}
                                onChange={handleSearchChange}
                                placeholder="Search roles..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Roles Table */}
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">
                                Loading roles...
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Permissions
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedRoles.map((role: Role) => (
                                        <tr
                                            key={role.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {role.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600">
                                                    {role.description ||
                                                        "No description"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions
                                                        .slice(0, 3)
                                                        .map(
                                                            (
                                                                permission: string,
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        permission
                                                                    }
                                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                                >
                                                                    {permission}
                                                                </span>
                                                            ),
                                                        )}
                                                    {role.permissions.length >
                                                        3 && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            +
                                                            {role.permissions
                                                                .length -
                                                                3}{" "}
                                                            more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() =>
                                                        startEdit(role)
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 inline-flex"
                                                >
                                                    <Edit className="w-3 h-3" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(role)
                                                    }
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 inline-flex"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredRoles.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No roles found matching your criteria.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-700">
                                Showing {startIndex}-{endIndex} of{" "}
                                {filteredRoles.length} roles
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;
