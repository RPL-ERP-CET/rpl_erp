"use client";

import Header from "@client-web/components/ui/header";
import Sidebar from "@client-web/components/ui/sidebar";
import {
    Bell,
    LayoutDashboard,
    PenTool,
    Radio,
    ClipboardCheck,
    Settings,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Notifications_Page() {
    const router = useRouter();
    const pathname = usePathname(); // Current route path

    const notification_items = [
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
        <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 bg-green-100">
            <div className="w-full h-[121px] sticky top-0 z-50">
                <Header
                    title="Notifications Module"
                    userName="ATHUL ANOOP"
                    userInitials="AA"
                />
            </div>
            <div className="w-full h-full flex">
                <div className="w-[260px] h-[calc(100vh-121px)] flex fixed left-0 top-[121px]">
                    <Sidebar
                        items={notification_items}
                        onBackClick={() => router.push("/")}
                    />
                </div>
                <div className="flex-1 p-6">Main content here</div>
            </div>
        </div>
    );
}
