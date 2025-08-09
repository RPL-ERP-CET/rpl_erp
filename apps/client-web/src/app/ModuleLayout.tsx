"use client";

import ContentBox from "@client-web/components/ui/contentbox";
import Header from "@client-web/components/ui/header";
import Sidebar from "@client-web/components/ui/sidebar";
import React, { ReactNode } from "react";

export type SidebarItem = {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
};

type ModuleLayoutProps = {
    children: ReactNode;
    title?: string;
    sidebarItems?: SidebarItem[];
    onBackClick?: () => void;
};

export default function ModuleLayout({
    children,
    title = "Default Module Title",
    sidebarItems = [],
    onBackClick,
}: ModuleLayoutProps) {
    const userName = "Athul Anoop";
    const userInitials = "AA";
    return (
        <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 bg-green-100">
            <div className="w-full sticky top-0 z-50 border-2">
                <Header
                    title={title}
                    userName={userName}
                    userInitials={userInitials}
                />
            </div>
            <div className="w-full h-full flex">
                <div className="sticky left-0 z-50 border-1">
                    <Sidebar items={sidebarItems} onBackClick={onBackClick} />
                </div>
                <div className="flex-1 p-6">
                    <ContentBox>{children}</ContentBox>
                </div>
            </div>
        </div>
    );
}
