"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@client-web/lib/utils";
import { Button } from "@client-web/components/ui/button";
import Image from "next/image";
import headerLogo from "./header-logo.png";

/* Header container variants */
const headerVariants = cva(
    "w-full flex items-center justify-between px-6 text-white shadow-md relative transition-colors duration-300",
    {
        variants: {
            variant: {
                default: "bg-gray-900 text-white",
                light: "bg-white text-gray-900",
            },
            size: {
                default: "h-[var(--header-height)]",
                sm: "h-16",
                lg: "h-24",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface HeaderProps extends VariantProps<typeof headerVariants> {
    title?: string;
    userName?: string;
    userInitials?: string;
    onLogout?: () => void;
    className?: string;
}

export default function Header({
    title = "Home",
    userName = "User",
    userInitials = "US",
    onLogout,
    variant,
    size,
    className,
}: HeaderProps) {
    return (
        <header
            className={cn(headerVariants({ variant, size, className }))}
            style={{
                borderTopLeftRadius: "var(--border-radius)",
                borderTopRightRadius: "var(--border-radius)",
            }}
        >
            {/* Left section: Logo + App Name + Title */}
            <div className="flex items-center gap-5">
                <div
                    style={{
                        width: "var(--logo-size)",
                        height: "var(--logo-size)",
                        position: "relative",
                    }}
                >
                    <Image
                        src={headerLogo}
                        alt="RPL Logo"
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded-md"
                    />
                </div>

                <div
                    className="font-serif font-bold leading-none select-none border-r-4 pr-6"
                    style={{
                        fontSize: "var(--logo-font-size)",
                        borderColor: "#00c8a0",
                    }}
                >
                    RPL
                </div>

                <div className="ml-8 font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-none text-gray-100">
                    {title}
                </div>
            </div>

            {/* Right section: User Info + Logout */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-3 bg-gray-700 rounded-xl h-[45px] shadow-sm">
                    <div className="bg-green-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center shadow">
                        {userInitials}
                    </div>
                    <div className="text-sm font-medium text-gray-100">
                        {userName}
                    </div>
                </div>

                <Button
                    variant="destructive"
                    size="sm"
                    className="font-serif text-[18px] h-[32px] px-4 rounded-md shadow hover:shadow-md"
                    onClick={onLogout}
                >
                    Logout
                </Button>
            </div>
        </header>
    );
}
