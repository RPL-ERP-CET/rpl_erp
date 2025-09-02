import { Role, Permission, CreateRoleData } from "../types/roleTypes";
import { mockRoles, mockPermissions } from "../mocks/roleManagementMockData";

import axios from "axios";

export const roleService = {
    async getRoles(): Promise<Role[]> {
        // const response = await axios.get<Role[]>('/api/roles');
        return Promise.resolve([...mockRoles]);
    },

    async getPermissions(): Promise<Permission[]> {
        // const response = await axios.get<Permission[]>('/api/permissions');
        return Promise.resolve([...mockPermissions]);
    },

    async createRole(roleData: CreateRoleData): Promise<Role> {
        // const response = await axios.post<Role>('/api/roles', roleData);
        const newRole: Role = {
            ...roleData,
            id: Date.now().toString(), // mock ID
        };
        return Promise.resolve(newRole);
    },

    async updateRole(id: string, roleData: CreateRoleData): Promise<Role> {
        // const response = await axios.put<Role>(`/api/roles/${id}`, roleData);
        const updated: Role = { id, ...roleData };
        return Promise.resolve(updated);
    },

    async deleteRole(id: string): Promise<void> {
        await axios.delete(`/api/roles/${id}`);

        return Promise.resolve();
    },
};
