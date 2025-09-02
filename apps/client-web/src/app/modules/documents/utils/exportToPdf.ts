import { useState } from "react";

export function useExportToPDF() {
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

  // Could be updated to change the arguments to accept template, digital signature, text etc.
  const exportToPDF = (filename: string, content: string) => {
    setExportLoading(true);

    try {
      // Export to PDF logic
      alert("Export Logic Here");
      console.log({ filename, content });
    } catch (err: unknown) {
      if (err instanceof Error) setExportError(err.message);
      else {
        setExportError("Export to PDF Failed");
      }
    } finally {
      setExportLoading(false);
    }
  };

  return { exportToPDF, exportLoading, exportError };
}
