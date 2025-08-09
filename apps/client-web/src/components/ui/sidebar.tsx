import React from "react";
import { cn } from "@client-web/lib/utils";
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
        <aside
            className="bg-[#2d2d2d] text-white flex flex-col py-4 overflow-y-auto px-4"
            style={{
                width: "var(--sidebar-width)",
                height: "calc(100vh - var(--header-height) - 5px)",
                borderBottomLeftRadius: "var(--border-radius)",
            }}
        >
            <div
                className="flex flex-col"
                style={{
                    gap: "var(--sidebar-element-gap)",
                    marginTop: "var(--sidebar-element-gap)",
                }}
            >
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={item.onClick}
                        aria-current={item.active ? "page" : undefined}
                        className={cn(
                            "flex items-center px-3 py-2 rounded-md transition-all text-left",
                            item.active
                                ? "bg-[#00c8a0] text-white font-semibold shadow"
                                : "hover:bg-[#3b3b3b] text-white",
                        )}
                        style={{ gap: "var(--sidebar-icon-name-gap)" }}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "var(--backbutton-position-bottom)",
                }}
            >
                <Button
                    onClick={onBackClick}
                    className="w-full md:w-auto min-w-[100px] bg-green-700 hover:bg-green-800 text-white"
                >
                    ← Back
                </Button>
            </div>
        </aside>
    );
}
