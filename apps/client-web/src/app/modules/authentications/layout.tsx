"use client";

import {
    Sidebar,
    SidebarItemProps,
} from "@client-web/components/custom/sidebar";
import ModuleLayout from "../layout";
import ContentBox from "@client-web/components/custom/contentbox";
import Header from "@client-web/components/custom/header";
import {
    User,
    UserCircle,
    Key,
    ShieldCheck,
    Users,
    UserCheck,
    FileText,
    Monitor,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../UserContext";

export default function AuthenticationModuleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { userName, userInitials } = useUser(); // 👈 from context
    const base = "/modules/authentications";

    const authentication_items: SidebarItemProps[] = [
        {
            label: "User Session",
            icon: <User />,
            active: pathname === `${base}/user_session`,
            onClick: () => router.push(`${base}/user_session`),
        },
        {
            label: "Profile",
            icon: <UserCircle />,
            active: pathname === `${base}/profile`,
            onClick: () => router.push(`${base}/profile`),
        },
        {
            label: "Role Management",
            icon: <Key />,
            active: pathname === `${base}/role-management`,
            onClick: () => router.push(`${base}/role-management`),
        },
        {
            label: "Permission Management",
            icon: <ShieldCheck />,
            active: pathname === `${base}/permission-management`,
            onClick: () => router.push(`${base}/permission-management`),
        },
        {
            label: "User Administration",
            icon: <Users />,
            active: pathname === `${base}/user-administration`,
            onClick: () => router.push(`${base}/user-administration`),
        },
        {
            label: "Impersonation",
            icon: <UserCheck />,
            active: pathname === `${base}/impersonation`,
            onClick: () => router.push(`${base}/impersonation`),
        },
        {
            label: "Audit Log",
            icon: <FileText />,
            active: pathname === `${base}/audit-log`,
            onClick: () => router.push(`${base}/audit-log`),
        },
        {
            label: "Session Management",
            icon: <Monitor />,
            active: pathname === `${base}/session-management`,
            onClick: () => router.push(`${base}/session-management`),
        },
    ];

    return (
        <ModuleLayout>
            {/* Header */}
            <div className="w-full sticky top-0 z-50 border-b-2">
                <Header
                    title="Authentication Module"
                    userName={userName}
                    userInitials={userInitials}
                />
            </div>

            {/* Sidebar + Content */}
            <div className="w-full h-full flex">
                <div className="sticky left-0 z-50 border-r-1">
                    <Sidebar
                        items={authentication_items}
                        onBackClick={() => router.push("/")}
                    />
                </div>

                <div className="flex-1 p-6">
                    <ContentBox>{children}</ContentBox>
                </div>
            </div>
        </ModuleLayout>
    );
}
