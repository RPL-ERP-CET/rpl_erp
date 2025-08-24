"use client";

import {
    Sidebar,
    SidebarItemProps,
} from "@client-web/components/custom/sidebar";
import ModuleLayout from "../layout";
import ContentBox from "@client-web/components/custom/contentbox";
import Header from "@client-web/components/custom/header";
import {
    Bell,
    LayoutDashboard,
    PenTool,
    Radio,
    ClipboardCheck,
    Settings,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../UserContext";

export default function NotificationsModuleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { userName, userInitials } = useUser(); // 👈 from context
    const base = "/modules/notifications";

    const notification_items: SidebarItemProps[] = [
        {
            label: "Notifications",
            icon: <Bell />,
            active: pathname === `${base}`,
            onClick: () => router.push(`${base}`),
        },
        {
            label: "Dashboard",
            icon: <LayoutDashboard />,
            active: pathname === `${base}/dashboard`,
            onClick: () => router.push(`${base}/dashboard`),
        },
        {
            label: "Composer",
            icon: <PenTool />,
            active: pathname === `${base}/composer`,
            onClick: () => router.push(`${base}/composer`),
        },
        {
            label: "Tracker",
            icon: <Radio />,
            active: pathname === `${base}/tracker`,
            onClick: () => router.push(`${base}/tracker`),
        },
        {
            label: "Audit Dashboard",
            icon: <ClipboardCheck />,
            active: pathname === `${base}/audit-dashboard`,
            onClick: () => router.push(`${base}/audit-dashboard`),
        },
        {
            label: "Settings",
            icon: <Settings />,
            active: pathname === `${base}/settings`,
            onClick: () => router.push(`${base}/settings`),
        },
    ];

    return (
        <ModuleLayout>
            {/* Header */}
            <div className="w-full sticky top-0 z-50 border-b-2">
                <Header
                    title="Notifications Module"
                    userName={userName}
                    userInitials={userInitials}
                />
            </div>

            {/* Sidebar + Content */}
            <div className="w-full h-full flex">
                <div className="sticky left-0 z-50 border-r-1">
                    <Sidebar
                        items={notification_items}
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
