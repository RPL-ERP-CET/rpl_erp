// hooks/useAuditLogs.ts
import { useEffect, useState } from "react";
import { AuditLog } from "../types/auditLogTypes";
import { fetchAuditLogsService } from "../services/auditLogService";

interface FilterState {
  category: string;
  date: string;
}

export const useAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    date: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const logs = await fetchAuditLogsService();
        setAuditLogs(logs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  useEffect(() => {
    let filtered = auditLogs;

    if (filters.category !== "All") {
      filtered = filtered.filter((log) => log.category === filters.category);
    }
    if (filters.date) {
      filtered = filtered.filter((log) =>
        log.timestamp.startsWith(filters.date),
      );
    }

    setFilteredLogs(filtered);
  }, [auditLogs, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = ["All", ...new Set(auditLogs.map((log) => log.category))];

  return {
    auditLogs,
    filteredLogs,
    filters,
    handleFilterChange,
    categories,
    loading,
  };
};
