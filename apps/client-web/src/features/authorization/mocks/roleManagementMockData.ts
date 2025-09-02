// mocks/roleManagementMockData.ts

import { Role, Permission } from "../types/roleTypes";

export const mockRoles: Role[] = [
    {
        id: "1",
        name: "Administrator",
        permissions: ["read", "write", "delete", "manage_users"],
    },
    {
        id: "2",
        name: "Editor",
        permissions: ["read", "write"],
    },
    {
        id: "3",
        name: "Viewer",
        permissions: ["read"],
    },
    {
        id: "4",
        name: "Moderator",
        permissions: ["read", "write", "moderate"],
    },
    {
        id: "5",
        name: "Support",
        permissions: ["read", "support"],
    },
    {
        id: "6",
        name: "Manager",
        permissions: ["read", "write", "manage_users", "analytics"],
    },
    {
        id: "7",
        name: "Guest",
        permissions: ["read"],
    },
];

export const mockPermissions: Permission[] = [
    { id: "read", name: "Read" },
    { id: "write", name: "Write" },
    { id: "delete", name: "Delete" },
    { id: "manage_users", name: "Manage Users" },
    { id: "moderate", name: "Moderate" },
    { id: "support", name: "Support" },
    { id: "analytics", name: "Analytics" },
    { id: "billing", name: "Billing" },
    { id: "settings", name: "Settings" },
    { id: "export", name: "Export" },
];
