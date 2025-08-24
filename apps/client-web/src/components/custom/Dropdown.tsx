"use client";

import * as React from "react";
import { cn } from "@client-web/lib/utils";

interface DropdownProps<T> {
    options: T[];
    value: T | null;
    onChange: (value: T) => void;
    label?: string;
    className?: string;
    renderOption?: (option: T) => React.ReactNode; // custom option rendering
    getOptionLabel?: (option: T) => string; // for default rendering
}

export function Dropdown<T>({
    options,
    value,
    onChange,
    label,
    className,
    renderOption,
    getOptionLabel = (opt) => String(opt),
}: DropdownProps<T>) {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen((v) => !v);

    const onSelect = (option: T) => {
        onChange(option);
        setIsOpen(false);
    };

    // close on outside click
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (
        <div
            ref={dropdownRef}
            className={cn("relative inline-block", className)}
        >
            {label && (
                <label className="block mb-1 text-sm font-medium">
                    {label}
                </label>
            )}

            <button
                type="button"
                className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={toggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{value ? getOptionLabel(value) : "Select..."}</span>
                <svg
                    className={cn(
                        "ml-2 h-4 w-4 transition-transform",
                        isOpen && "rotate-180",
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <ul
                    role="listbox"
                    tabIndex={-1}
                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-sm shadow-lg"
                >
                    {options.map((option, i) => (
                        <li
                            key={i}
                            role="option"
                            aria-selected={option === value}
                            className={cn(
                                "cursor-pointer select-none px-3 py-2 hover:bg-primary hover:text-white",
                                option === value && "bg-primary text-white",
                            )}
                            onClick={() => onSelect(option)}
                        >
                            {renderOption
                                ? renderOption(option)
                                : getOptionLabel(option)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
