"use client";

import { Placeholder } from "@client-web/components/ui/Placeholder";
import React from "react";

export default function PlaceholderExample() {
    const [value, setValue] = React.useState("");

    return (
        <div className="w-64">
            <Placeholder
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your name"
            />
        </div>
    );
}
