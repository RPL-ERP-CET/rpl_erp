import { mockAuditLogs } from "../mocks/mockDataAuditLog";
import { AuditLog } from "../types/auditLogTypes";
//import axios from "axios";

export const fetchAuditLogsService = async (): Promise<AuditLog[]> => {
  try {
    // const response = await axios.get("/api/audit-logs");
    // return response.data;

    return await Promise.resolve(mockAuditLogs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
};
