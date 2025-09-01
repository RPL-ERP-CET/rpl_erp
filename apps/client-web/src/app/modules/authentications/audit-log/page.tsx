"use client";

import React, { useState, useEffect } from "react";
import { mockAuditLogs } from "@client-web/features/authorization/mocks/mockDataAuditLog";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@client-web/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@client-web/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@client-web/components/ui/select";
import { Input } from "@client-web/components/ui/input";
import { Skeleton } from "@client-web/components/ui/skeleton";

interface AuditLog {
  id: string;
  timestamp: string;
  category: string;
  action: string;
  user: string;
  details: string;
}

interface FilterState {
  category: string;
  date: string;
}

const AuditLogViewer: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    date: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const categories = ["All", ...new Set(auditLogs.map((log) => log.category))];

  const fetchAuditLogs = () => {
    setLoading(true);
    try {
      setAuditLogs(mockAuditLogs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
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
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [auditLogs, filters]);

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Audit Log Viewer</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex flex-col w-full md:w-1/3">
                <label className="text-sm font-medium mb-1">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(val) => handleFilterChange("category", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-full md:w-1/3">
                <label className="text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              {loading ? (
                <div className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.category}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {log.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {auditLogs.length} logs
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuditLogViewer;
