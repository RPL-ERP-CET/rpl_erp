import { useEffect, useState } from "react";
import { Role, Permission, CreateRoleData } from "../types/roleTypes";
import { roleService } from "../services/roleServices";

export function useRoles() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [rolesData, permissionsData] = await Promise.all([
                    roleService.getRoles(),
                    roleService.getPermissions(),
                ]);
                setRoles(rolesData);
                setPermissions(permissionsData);
            } catch {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        }
        void load();
    }, []);

    const createRole = async (data: CreateRoleData) => {
        try {
            const newRole = await roleService.createRole(data);
            setRoles((prev) => [...prev, newRole]);
            setSuccess("Role created successfully");
        } catch {
            setError("Failed to create role");
        }
    };

    const updateRole = async (id: string, data: CreateRoleData) => {
        try {
            const updated = await roleService.updateRole(id, data);
            setRoles((prev) => prev.map((r) => (r.id === id ? updated : r)));
            setSuccess("Role updated successfully");
        } catch {
            setError("Failed to update role");
        }
    };

    const deleteRole = async (id: string) => {
        try {
            await roleService.deleteRole(id);
            setRoles((prev) => prev.filter((r) => r.id !== id));
            setSuccess("Role deleted successfully");
        } catch {
            setError("Failed to delete role");
        }
    };

    useEffect(() => {
        if (success || error) {
            const t = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [success, error]);

    return {
        roles,
        permissions,
        loading,
        error,
        success,
        createRole,
        updateRole,
        deleteRole,
        setError,
        setSuccess,
    };
}
