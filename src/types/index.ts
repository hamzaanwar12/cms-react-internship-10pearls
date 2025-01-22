export interface User {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  created_at: string;
  updated_at: string;
  status: "ACTIVE" | "INACTIVE" | "DEACTIVATED" | "SUSPENDED";
  deactivated_at: string | null;
  deactivated_by: string | null;
  contactCount: number;
}

export interface Contact {
  id: number;
  userId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ActivityLog {
  id: number;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
}
