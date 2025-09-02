export interface Permission {
    id: string;
    name: string;
}

export interface Role {
    id: string;
    name: string;
    permissions: string[];
}

export interface CreateRoleData {
    name: string;
    permissions: string[];
}
