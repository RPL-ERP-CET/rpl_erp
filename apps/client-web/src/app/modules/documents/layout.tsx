"use client";

import { Sidebar, SidebarItemProps } from "@client-web/components/ui/sidebar";
import ModuleLayout from "../layout";
import ContentBox from "@client-web/components/ui/contentbox";
import Header from "@client-web/components/ui/header";
import { FileText, FilePlus, LayoutDashboard, Lock } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../UserContext";

export default function DocumentsModuleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { userName, userInitials } = useUser(); // 👈 pulled from context
    const base = "/modules/documents";

    const documents_items: SidebarItemProps[] = [
        {
            label: "Documents",
            icon: <FileText />,
            active: pathname === `${base}`,
            onClick: () => router.push(`${base}`),
        },
        {
            label: "Generate Document",
            icon: <FilePlus />,
            active: pathname === `${base}/generate-document`,
            onClick: () => router.push(`${base}/generate-document`),
        },
        {
            label: "Template Management",
            icon: <LayoutDashboard />,
            active: pathname === `${base}/template-management`,
            onClick: () => router.push(`${base}/template-management`),
        },
        {
            label: "Access Control",
            icon: <Lock />,
            active: pathname === `${base}/access-control`,
            onClick: () => router.push(`${base}/access-control`),
        },
    ];

    return (
        <ModuleLayout>
            {/* Header */}
            <div className="w-full sticky top-0 z-50 border-b-2">
                <Header
                    title="Documents Module"
                    userName={userName}
                    userInitials={userInitials}
                />
            </div>

            {/* Sidebar + Content */}
            <div className="w-full h-full flex">
                <div className="sticky left-0 z-50 border-r-1">
                    <Sidebar
                        items={documents_items}
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
