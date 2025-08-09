"use client";

import ModuleLayout, { SidebarItem } from "../ModuleLayout"; // Adjust path as needed
import {
    Bell,
    LayoutDashboard,
    PenTool,
    Radio,
    ClipboardCheck,
    Settings,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function NotificationsModuleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const notification_items: SidebarItem[] = [
        {
            label: "Notifications",
            icon: <Bell />,
            active: pathname === "/Notifications_Module/notifications",
            onClick: () => router.push("/Notifications_Module/notifications"),
        },
        {
            label: "Dashboard",
            icon: <LayoutDashboard />,
            active: pathname === "/Notifications_Module/dashboard",
            onClick: () => router.push("/Notifications_Module/dashboard"),
        },
        {
            label: "Composer",
            icon: <PenTool />,
            active: pathname === "/Notifications_Module/composer",
            onClick: () => router.push("/Notifications_Module/composer"),
        },
        {
            label: "Tracker",
            icon: <Radio />,
            active: pathname === "/Notifications_Module/tracker",
            onClick: () => router.push("/Notifications_Module/tracker"),
        },
        {
            label: "Audit Dashboard",
            icon: <ClipboardCheck />,
            active: pathname === "/Notifications_Module/audit-dashboard",
            onClick: () => router.push("/Notifications_Module/audit-dashboard"),
        },
        {
            label: "Settings",
            icon: <Settings />,
            active: pathname === "/Notifications_Module/settings",
            onClick: () => router.push("/Notifications_Module/settings"),
        },
    ];

    return (
        <ModuleLayout
            title="Notifications Module"
            sidebarItems={notification_items}
            onBackClick={() => router.push("/")}
        >
            {children}
        </ModuleLayout>
    );
}
