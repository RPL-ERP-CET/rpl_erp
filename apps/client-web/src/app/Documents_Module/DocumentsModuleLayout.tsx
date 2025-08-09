"use client";

import ModuleLayout, { SidebarItem } from "../ModuleLayout"; // Adjust path as needed
import {
    FileText, // for Documents
    FilePlus, // for Generate Document
    LayoutDashboard, // can keep for Template Management or replace
    Lock, // for Access Control
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DocumentsModuleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const documents_items: SidebarItem[] = [
        {
            label: "Documents",
            icon: <FileText />,
            active: pathname === "/Documents_Module/documents",
            onClick: () => router.push("/Documents_Module/documents"),
        },
        {
            label: "Generate Document",
            icon: <FilePlus />,
            active: pathname === "/Documents_Module/generate-document",
            onClick: () => router.push("/Documents_Module/generate-document"),
        },
        {
            label: "Template Management",
            icon: <LayoutDashboard />,
            active: pathname === "/Documents_Module/template-management",
            onClick: () => router.push("/Documents_Module/template-management"),
        },
        {
            label: "Access Control",
            icon: <Lock />,
            active: pathname === "/Documents_Module/access-control",
            onClick: () => router.push("/Documents_Module/access-control"),
        },
    ];

    return (
        <ModuleLayout
            title="Documents Module"
            sidebarItems={documents_items}
            onBackClick={() => router.push("/")}
        >
            {children}
        </ModuleLayout>
    );
}
