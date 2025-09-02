export interface AuditLog {
  id: string;
  timestamp: string;
  category: string;
  action: string;
  user: string;
  details: string;
}
