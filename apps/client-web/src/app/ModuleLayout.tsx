"use client";

import ContentBox from "@client-web/components/ui/contentbox";
import Header from "@client-web/components/ui/header";
import { Sidebar, SidebarItemProps } from "@client-web/components/ui/sidebar";
import React, { ReactNode } from "react";

type ModuleLayoutProps = {
    children: ReactNode;
    title?: string;
    sidebarItems?: SidebarItemProps[];
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

    // Fallback back handler
    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            console.log("Back button clicked");
        }
    };

    return (
        <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 bg-green-100">
            {/* Header */}
            <div className="w-full sticky top-0 z-50 border-b-2">
                <Header
                    title={title}
                    userName={userName}
                    userInitials={userInitials}
                />
            </div>

            {/* Main content */}
            <div className="w-full h-full flex">
                {/* Sidebar */}
                <div className="sticky left-0 z-50 border-r-1">
                    <Sidebar items={sidebarItems} onBackClick={handleBack} />
                </div>

                {/* Page content */}
                <div className="flex-1 p-6">
                    <ContentBox>{children}</ContentBox>
                </div>
            </div>
        </div>
    );
}
