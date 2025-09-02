"use client";

import React from "react";
import { useAuditLogs } from "../hooks/useAuditLogs";

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

const AuditLogViewer: React.FC = () => {
  const {
    auditLogs,
    filteredLogs,
    filters,
    handleFilterChange,
    categories,
    loading,
  } = useAuditLogs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Audit Log Viewer
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
              <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3">
                <label className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(val) => handleFilterChange("category", val)}
                >
                  <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20">
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

              <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3">
                <label className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  Date
                </label>
                <Input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                  className="border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              {loading ? (
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 py-4">
                          Timestamp
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 py-4">
                          Category
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 py-4">
                          Action
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 py-4">
                          User
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 py-4">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow
                          key={log.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                        >
                          <TableCell className="font-mono text-sm py-4 text-slate-700 dark:text-slate-300">
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {log.category}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium py-4 text-slate-900 dark:text-slate-100">
                            {log.action}
                          </TableCell>
                          <TableCell className="py-4 text-slate-700 dark:text-slate-300">
                            {log.user}
                          </TableCell>
                          <TableCell className="text-slate-500 dark:text-slate-400 py-4 max-w-xs truncate">
                            <span title={log.details}>{log.details}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Showing{" "}
              <span className="text-slate-900 dark:text-slate-100 font-semibold">
                {filteredLogs.length}
              </span>{" "}
              of{" "}
              <span className="text-slate-900 dark:text-slate-100 font-semibold">
                {auditLogs.length}
              </span>{" "}
              logs
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuditLogViewer;
