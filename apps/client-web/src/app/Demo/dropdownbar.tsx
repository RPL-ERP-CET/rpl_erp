"use client";
import { Dropdown } from "@client-web/components/ui/Dropdown";
import React from "react";

const countries = [
    { code: "+1", name: "United States" },
    { code: "+91", name: "India" },
    { code: "+44", name: "United Kingdom" },
];

function DropDownExample() {
    const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);

    return (
        <Dropdown
            label="Country Code"
            options={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            getOptionLabel={(c) => `${c.name} (${c.code})`}
            className="w-48"
        />
    );
}

export default DropDownExample;
