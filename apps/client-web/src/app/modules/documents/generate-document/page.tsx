"use client";

import { useEffect, useState } from "react";

import {
    DocumentFormInterface,
    handleGenerateDocument,
} from "../utils/logic/handleGenerateDocument";
import { handleExportToPDF } from "../utils/logic/handleExportToPDF";

import { Label } from "@client-web/components/ui/label";
import { Button } from "@client-web/components/ui/button";
import { Dropdown } from "@client-web/components/custom/Dropdown";
import { Placeholder } from "@client-web/components/custom/Placeholder";
import { handleFetchTemplates } from "../utils/logic/handleFetchTemplates";

export default function GenerateDocPage() {
    // State for Storing Template Names
    const [templateOptions, setTemplateOptions] = useState<string[]>([]);

    // Single Form State (Scalable)
    const [form, setForm] = useState<DocumentFormInterface>({
        selectedTemplate: null as string | null,
        documentName: "",
        applyDigitalSignature: false,
    });

    // Call Fetching Templates Handler on Load
    useEffect(() => {
        setTemplateOptions(handleFetchTemplates());
    }, []);

    // Generic Single Form Data Change Function
    const handleFormDataChange = <Key extends keyof typeof form>(
        key: Key,
        value: (typeof form)[Key],
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    // Call and Pass Form Data to Document Generation Utility Function
    const onGenerateDocument = () => handleGenerateDocument(form);

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <h1 className="text-xl font-bold">Document Generator</h1>

            <div className="space-y-4">
                {/* Template Selection From DropDown */}
                <Dropdown
                    className="w-[100%]"
                    options={templateOptions}
                    value={form.selectedTemplate}
                    label="Select Template"
                    onChange={(option) =>
                        handleFormDataChange("selectedTemplate", option)
                    }
                />

                {/* Document Name Input */}
                <section className="space-y-2">
                    <Label>Document Name</Label>
                    <Placeholder
                        placeholder="e.g., Q4 Performance Review"
                        onChange={(e) =>
                            handleFormDataChange("documentName", e.target.value)
                        }
                    />
                </section>

                {/* Digital Signature Checkbox */}
                <section className="flex space-x-6 my-6 mx-2">
                    <input
                        type="checkbox"
                        checked={form.applyDigitalSignature}
                        onChange={() =>
                            handleFormDataChange(
                                "applyDigitalSignature",
                                !form.applyDigitalSignature,
                            )
                        }
                    />
                    <Label>Apply Digital Signature</Label>
                </section>
            </div>

            {/* Action Buttons */}
            <footer className="flex space-x-5 justify-end-safe mr-10">
                <Button onClick={onGenerateDocument}>Generate Document</Button>
                <Button onClick={handleExportToPDF}>Export to PDF</Button>
            </footer>
        </div>
    );
}
