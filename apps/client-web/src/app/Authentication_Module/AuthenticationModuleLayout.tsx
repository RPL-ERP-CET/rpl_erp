"use client";

import ModuleLayout, { SidebarItem } from "../ModuleLayout"; // Adjust path as needed
import {
    User, // for User_session
    UserCircle, // for Profile
    Key, // for Role Management
    ShieldCheck, // for Permission Management
    Users, // for User Administration
    UserCheck, // for Impersonation
    FileText, // for Audit_log
    Monitor, // for Session_Management
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthenticationModuleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const authentication_items: SidebarItem[] = [
        {
            label: "User Session",
            icon: <User />,
            active: pathname === "/Authentication_Module/user_session",
            onClick: () => router.push("/Authentication_Module/user_session"),
        },
        {
            label: "Profile",
            icon: <UserCircle />,
            active: pathname === "/Authentication_Module/profile",
            onClick: () => router.push("/Authentication_Module/profile"),
        },
        {
            label: "Role Management",
            icon: <Key />,
            active: pathname === "/Authentication_Module/role-management",
            onClick: () =>
                router.push("/Authentication_Module/role-management"),
        },
        {
            label: "Permission Management",
            icon: <ShieldCheck />,
            active: pathname === "/Authentication_Module/permission-management",
            onClick: () =>
                router.push("/Authentication_Module/permission-management"),
        },
        {
            label: "User Administration",
            icon: <Users />,
            active: pathname === "/Authentication_Module/user-administration",
            onClick: () =>
                router.push("/Authentication_Module/user-administration"),
        },
        {
            label: "Impersonation",
            icon: <UserCheck />,
            active: pathname === "/Authentication_Module/impersonation",
            onClick: () => router.push("/Authentication_Module/impersonation"),
        },
        {
            label: "Audit Log",
            icon: <FileText />,
            active: pathname === "/Authentication_Module/audit-log",
            onClick: () => router.push("/Authentication_Module/audit-log"),
        },
        {
            label: "Session Management",
            icon: <Monitor />,
            active: pathname === "/Authentication_Module/session-management",
            onClick: () =>
                router.push("/Authentication_Module/session-management"),
        },
    ];

    return (
        <ModuleLayout
            title="Authentication Module"
            sidebarItems={authentication_items}
            onBackClick={() => router.push("/")}
        >
            {children}
        </ModuleLayout>
    );
}
