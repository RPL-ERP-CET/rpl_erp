import React from "react";
import { cn } from "@client-web/lib/utils"; // your utility
import { Button } from "@client-web/components/ui/button";

export type SidebarItem = {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
};

type SidebarProps = {
    items: SidebarItem[];
    onBackClick?: () => void;
};

export default function Sidebar({ items, onBackClick }: SidebarProps) {
    return (
        <aside className="bg-[#2d2d2d] text-white flex flex-col h-full w-full justify-between py-4">
            <div className="flex flex-col gap-3 px-4">
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={item.onClick}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-left",
                            item.active
                                ? "bg-[#00c8a0] text-white font-semibold shadow"
                                : "hover:bg-[#3b3b3b] text-white",
                        )}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Back Button */}
            <div className="px-4 mt-auto">
                <Button
                    onClick={onBackClick}
                    className="w-[120px] bg-green-700 hover:bg-green-800 text-white"
                >
                    ← Back
                </Button>
            </div>
        </aside>
    );
}
