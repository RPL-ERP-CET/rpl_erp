"use client";

import { useState } from "react";

import { Label } from "@client-web/components/ui/label";
import { Button } from "@client-web/components/ui/button";
import { Dropdown } from "@client-web/components/custom/Dropdown";
import { Placeholder } from "@client-web/components/custom/Placeholder";

import { useGenerateDocument } from "../hooks/useGenerateDocument";
import { DocumentFormInterface } from "../services/generateDocument.service";
import { useFetchTemplates } from "../hooks/useFetchTemplate";
import { useExportToPDF } from "../utils/exportToPdf";

export default function GenerateDocPage() {
  // Templates Fetching Hook
  const { templateOptions, templatesLoading, templatesError } =
    useFetchTemplates();

  const { exportToPDF, exportLoading, exportError } = useExportToPDF();

  // Documents Generation Hook
  const { generateDocument, generateDocLoading, generateDocError } =
    useGenerateDocument();

  // Single Form State (Scalable)
  const [form, setForm] = useState<DocumentFormInterface>({
    selectedTemplate: null as string | null,
    documentName: "",
    applyDigitalSignature: false,
  });

  // Generic Single Form Data Change Function
  const handleFormDataChange = <Key extends keyof typeof form>(
    key: Key,
    value: (typeof form)[Key],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Call and Pass Form Data to Document Generation Utility Function
  const onGenerateDocumentButtonClick = () => {
    void generateDocument(form);
  };

  // Call and Pass Document Name and the file (need to change content) to Export to PDF logic in utils
  const handleExportToPDF = () => {
    exportToPDF(form.documentName, "content");
  };

  if (templatesLoading) {
    return <Label className="text-center">Loading templates</Label>;
  } else if (templatesError) {
    return <Label className="text-center">{templatesError}</Label>;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-xl font-bold">Document Generator</h1>

      <div className="space-y-4">
        {/* Template Selection From DropDown */}
        <Dropdown
          className="w-[100%]"
          options={templateOptions || []}
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
        <Button onClick={onGenerateDocumentButtonClick}>
          {generateDocLoading ? "Generating..." : "Generate Document"}
        </Button>

        <Button onClick={handleExportToPDF}>
          {exportLoading ? "Exporting..." : "Export to PDF"}
        </Button>
      </footer>
      {(generateDocError || exportError) && (
        <p className="text-red-500 text-center">
          {generateDocError || exportError}
        </p>
      )}
    </div>
  );
}
