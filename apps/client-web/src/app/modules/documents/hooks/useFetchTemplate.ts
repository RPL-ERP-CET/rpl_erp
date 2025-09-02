// hooks/useFetchTemplates.ts
import { useState, useEffect } from "react";
import { fetchTemplatesService } from "../services/fetchTemplates.service";
import { getApiErrorMessage } from "../utils/apiErrorMessage";

export function useFetchTemplates() {
  const [templateOptions, setTemplateOptions] = useState<string[] | null>(null);

  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [templatesError, setTemplatesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setTemplatesLoading(true);
      setTemplatesError(null);

      try {
        const templates = await fetchTemplatesService();
        setTemplateOptions(templates);
      } catch (err: unknown) {
        setTemplatesError(getApiErrorMessage(err, "Failed to fetch templates"));
      } finally {
        setTemplatesLoading(false);
      }
    };

    void fetchTemplates();
  }, []);

  return { templateOptions, templatesLoading, templatesError };
}
