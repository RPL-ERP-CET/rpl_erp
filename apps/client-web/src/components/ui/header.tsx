import React from "react";
import { Button } from "@client-web/components/ui/button";
import headerLogo from "./header-logo.png";
import Image from "next/image";

interface HeaderProps {
    title?: string;
    userName?: string;
    userInitials?: string;
    onLogout?: () => void;
}

export default function Header({
    title = "Home",
    userName = "User",
    userInitials = "US",
    onLogout,
}: HeaderProps) {
    return (
        <header
            className="w-full flex items-center justify-between bg-[#2d2d2d] px-6 text-white shadow-md relative"
            style={{
                height: "var(--header-height)",
                borderTopLeftRadius: "var(--border-radius)",
                borderTopRightRadius: "var(--border-radius)",
            }}
        >
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
                        fill // this makes image fill the parent div
                        style={{ objectFit: "contain" }}
                        className="rounded"
                    />
                </div>

                <div
                    className="font-serif font-bold leading-none select-none border-r-4 pr-7"
                    style={{ fontSize: "var(--logo-font-size)" }}
                >
                    RPL
                </div>
                <div className="ml-10 font-serif text-[36px] font-bold leading-none">
                    {title}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border-0 p-3 bg-gray-500 rounded-xl h-[45px]">
                    <div className="bg-cyan-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {userInitials}
                    </div>
                    <div className="text-sm font-medium">{userName}</div>
                </div>
                <Button
                    className="font-serif text-[20px] h-[30px]"
                    variant="destructive"
                    size="sm"
                    onClick={onLogout}
                >
                    Logout
                </Button>
            </div>
        </header>
    );
}
