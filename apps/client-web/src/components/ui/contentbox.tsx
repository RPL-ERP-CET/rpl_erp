import React from "react";

interface SimpleBoxProps {
    children?: React.ReactNode;
    className?: string;
}

export default function ContentBox({
    children,
    className = "",
}: SimpleBoxProps) {
    return (
        <div
            className={`bg-white rounded-3xl shadow-lg mx-auto flex items-center justify-center ${className}`}
            style={{
                marginTop: "var(--content-position-top)",
                width: "var(--content-width)",
                height: "var(--content-height)",
            }}
        >
            {children}
        </div>
    );
}
