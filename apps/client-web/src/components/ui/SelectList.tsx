"use client";

import * as React from "react";
import { cn } from "@client-web/lib/utils";

interface SelectListProps<T> {
    options: T[];
    value: T[]; // multiple selected values
    onChange: (value: T[]) => void;
    className?: string;
    maxHeight?: string; // tailwind max-height, e.g. "max-h-48"
    renderOption?: (option: T, selected: boolean) => React.ReactNode;
    getOptionLabel?: (option: T) => string;
}

export function SelectList<T>({
    options,
    value,
    onChange,
    className,
    maxHeight = "max-h-48",
    renderOption,
    getOptionLabel = (opt) => String(opt),
}: SelectListProps<T>) {
    // Toggle select/unselect for multiple values
    const toggleOption = (option: T) => {
        if (value.includes(option)) {
            onChange(value.filter((v) => v !== option));
        } else {
            onChange([...value, option]);
        }
    };

    return (
        <div
            className={cn(
                "border rounded-md bg-white overflow-y-auto",
                maxHeight,
                className,
            )}
            role="listbox"
            aria-multiselectable="true"
            tabIndex={0}
        >
            {options.map((option, i) => {
                const selected = value.includes(option);
                return (
                    <div
                        key={i}
                        role="option"
                        aria-selected={selected}
                        tabIndex={-1}
                        className={cn(
                            "relative cursor-pointer select-none px-4 py-2 hover:bg-primary hover:text-white",
                            selected
                                ? "bg-primary text-white"
                                : "text-gray-900",
                        )}
                        onClick={() => toggleOption(option)}
                    >
                        <span>
                            {renderOption
                                ? renderOption(option, selected)
                                : getOptionLabel(option)}
                        </span>
                        {selected && (
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default SelectList;
