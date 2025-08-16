"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@client-web/lib/utils";

interface DatePickerProps {
    date?: Date;
    onChange?: (date: Date | undefined) => void;
    className?: string;
}

export function DatePicker({ date, onChange, className }: DatePickerProps) {
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [selected, setSelected] = React.useState<Date | undefined>(date);
    const [inputValue, setInputValue] = React.useState(
        date ? format(date, "dd-MM-yyyy") : "",
    );

    // When parent updates date prop, sync input and selected date
    React.useEffect(() => {
        if (date) {
            setSelected(date);
            setInputValue(format(date, "dd-MM-yyyy"));
        } else {
            setSelected(undefined);
            setInputValue("");
        }
    }, [date]);

    const handleSelect = (day: Date | undefined) => {
        if (day) {
            setSelected(day);
            setInputValue(format(day, "dd-MM-yyyy"));
            onChange?.(day);
        } else {
            setSelected(undefined);
            setInputValue("");
            onChange?.(undefined);
        }
        setShowCalendar(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        // Try to parse the date from the input (dd-MM-yyyy)
        const parsedDate = parse(val, "dd-MM-yyyy", new Date());

        if (isValid(parsedDate) && val.length === 10) {
            setSelected(parsedDate);
            onChange?.(parsedDate);
        } else {
            // Not valid yet — keep selected undefined or previous
            setSelected(undefined);
            onChange?.(undefined);
        }
    };

    // Close calendar on blur after short delay to allow click selection
    const handleBlur = () => {
        setTimeout(() => {
            setShowCalendar(false);
        }, 150);
    };

    return (
        <div className={cn("relative inline-block", className)}>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    className={cn(
                        "px-3 py-2 border rounded-md w-[240px]",
                        "text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                    )}
                    placeholder="dd-mm-yyyy"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowCalendar(true)}
                    onBlur={handleBlur}
                    maxLength={10}
                />
                <CalendarIcon
                    size={20}
                    className="cursor-pointer text-gray-600"
                    onClick={() => setShowCalendar((prev) => !prev)}
                    aria-label="Toggle calendar"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setShowCalendar((prev) => !prev);
                        }
                    }}
                />
            </div>

            {showCalendar && (
                <div
                    className={cn(
                        "absolute z-50 mt-2 p-2 bg-white rounded-md shadow-lg border",
                    )}
                >
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={handleSelect}
                        captionLayout="dropdown" // Month & Year dropdowns
                        fromYear={1990}
                        toYear={new Date().getFullYear() + 5}
                    />
                </div>
            )}
        </div>
    );
}

export default DatePicker;
