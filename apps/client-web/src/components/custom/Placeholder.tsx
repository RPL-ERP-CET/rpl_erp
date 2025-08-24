"use client";

import * as React from "react";
import { cn } from "@client-web/lib/utils";

interface InputWithPlaceholderProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    className?: string;
}

export function Placeholder({
    placeholder = "Type something...",
    className,
    ...props
}: InputWithPlaceholderProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={cn(
                "border rounded-md px-3 py-2 w-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary",
                className,
            )}
            {...props}
        />
    );
}
