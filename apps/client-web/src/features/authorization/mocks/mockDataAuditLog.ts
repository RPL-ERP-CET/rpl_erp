export interface AuditLog {
  id: string;
  timestamp: string;
  category: string;
  action: string;
  user: string;
  details: string;
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-10-27 10:00:00",
    category: "Authentication",
    action: "Login Success",
    user: "Admin",
    details: "IP Address: 192.168.1.120",
  },
  {
    id: "2",
    timestamp: "2024-10-27 10:00:00",
    category: "Authorization",
    action: "Access Granted",
    user: "Athul Anoop",
    details: "IP Address: 192.168.1.100",
  },
  {
    id: "3",
    timestamp: "2024-10-27 09:45:00",
    category: "Authentication",
    action: "Login Failed",
    user: "john.doe",
    details: "IP Address: 192.168.1.150",
  },
  {
    id: "4",
    timestamp: "2024-10-27 09:30:00",
    category: "Authorization",
    action: "Access Denied",
    user: "jane.smith",
    details: "IP Address: 192.168.1.200",
  },
  {
    id: "5",
    timestamp: "2024-10-27 09:15:00",
    category: "System",
    action: "Configuration Changed",
    user: "Admin",
    details: "Module: User Management",
  },
];
