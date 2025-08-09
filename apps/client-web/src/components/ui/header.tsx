import React from "react";
import { Button } from "@client-web/components/ui/button";
import headerLogo from "./header-logo.png";

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
        <header className="w-full h-full flex items-center justify-between bg-[#2d2d2d] px-4 py-2 text-white shadow-md">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-4">
                <img
                    src={headerLogo.src}
                    alt="RPL Logo"
                    className="h-[76px] w-[84px] rounded absolute left-[13px] top-[23px]"
                />
                <div className="font-serif text-[64px] font-bold h-[56px] absolute left-[110px] top-[18px]">
                    RPL
                </div>
                <div className="font-serif text-[36px] font-bold h-[42px] absolute left-[312px] top-[40px]">
                    {title}
                </div>
            </div>

            {/* Right: Profile + Logout */}
            <div className="flex items-center gap-4">
                <div className="h-[78px] w-[254px] absolute left-[983px] top-[23px] flex items-center gap-2 bg-[#464c4f] rounded-md px-3 py-1">
                    <div className="bg-cyan-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {userInitials}
                    </div>
                    <div className="text-sm font-medium">{userName}</div>
                </div>

                <Button
                    className="font-serif text-[24px] font-bold h-[56px] absolute left-[1260px] top-[32px]"
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
