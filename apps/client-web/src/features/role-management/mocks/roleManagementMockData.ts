// mockData.ts

export interface Permission {
    id: string;
    name: string;
    description: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: string[];
}

export const mockRoles: Role[] = [
    {
        id: 1,
        name: "Administrator",
        description: "Full system access",
        permissions: ["read", "write", "delete", "manage_users"],
    },
    {
        id: 2,
        name: "Editor",
        description: "Content management access",
        permissions: ["read", "write"],
    },
    {
        id: 3,
        name: "Viewer",
        description: "Read-only access",
        permissions: ["read"],
    },
    {
        id: 4,
        name: "Moderator",
        description: "Content moderation access",
        permissions: ["read", "write", "moderate"],
    },
    {
        id: 5,
        name: "Support",
        description: "Customer support access",
        permissions: ["read", "support"],
    },
    {
        id: 6,
        name: "Manager",
        description: "Team and project management",
        permissions: ["read", "write", "manage_users", "analytics"],
    },
    {
        id: 7,
        name: "Guest",
        description: "Limited access for temporary users",
        permissions: ["read"],
    },
];

export const mockPermissions: Permission[] = [
    {
        id: "read",
        name: "Read",
        description: "View content and data",
    },
    {
        id: "write",
        name: "Write",
        description: "Create and edit content",
    },
    {
        id: "delete",
        name: "Delete",
        description: "Remove content and data",
    },
    {
        id: "manage_users",
        name: "Manage Users",
        description: "Add, edit, and remove users",
    },
    {
        id: "moderate",
        name: "Moderate",
        description: "Moderate user content",
    },
    {
        id: "support",
        name: "Support",
        description: "Access support tools",
    },
    {
        id: "analytics",
        name: "Analytics",
        description: "View reports and analytics",
    },
    {
        id: "billing",
        name: "Billing",
        description: "Manage billing and subscriptions",
    },
    {
        id: "settings",
        name: "Settings",
        description: "Configure system settings",
    },
    {
        id: "export",
        name: "Export",
        description: "Export data and reports",
    },
];
