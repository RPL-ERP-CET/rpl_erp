"use client";

import * as React from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@client-web/lib/utils";

interface PhoneNumberProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function PhoneNumber({ value, onChange, className }: PhoneNumberProps) {
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (phone?: string) => {
        onChange?.(phone || "");
        if (phone && !isValidPhoneNumber(phone)) {
            setError("Invalid phone number");
        } else {
            setError(null);
        }
    };

    return (
        <div className={cn("flex flex-col w-[350px]", className)}>
            <PhoneInput
                international
                defaultCountry="IN"
                countryCallingCodeEditable={false}
                value={value}
                onChange={handleChange}
                className={cn(
                    "border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                    error ? "border-red-500" : "border-gray-300",
                )}
            />
            {error && (
                <span className="text-red-500 text-xs mt-1">{error}</span>
            )}
        </div>
    );
}
