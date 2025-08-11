"use client";

import SelectList from "@client-web/components/ui/SelectList";
import React from "react";

const fruits = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
];

export function FruitSelector() {
    const [selectedFruits, setSelectedFruits] = React.useState<string[]>([]);

    return (
        <div className="w-64">
            <SelectList
                options={fruits}
                value={selectedFruits}
                onChange={setSelectedFruits}
                maxHeight="max-h-40"
                className="shadow-lg"
            />
            <p className="mt-2">
                Selected fruits: {selectedFruits.join(", ") || "None"}
            </p>
        </div>
    );
}
