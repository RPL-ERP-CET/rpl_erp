"use client";

import React, { ReactNode } from "react";
import { UserProvider } from "./UserContext";

type ModuleLayoutProps = {
    children: ReactNode;
};

export default function ModuleLayout({ children }: ModuleLayoutProps) {
    return (
        <UserProvider>
            <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 bg-green-100">
                <div className="w-full h-full flex flex-col">{children}</div>
            </div>
        </UserProvider>
    );
}
