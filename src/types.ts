export interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  units: number;
  rent: number;
  status: "available" | "occupied" | "maintenance";
  image?: string;
}

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  propertyId: number;
  propertyName: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  status: "active" | "pending" | "inactive";
}

export interface Lease {
  id: number;
  tenantId: number;
  tenantName: string;
  propertyId: number;
  propertyName: string;
  unit: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: "active" | "expired" | "terminated" | "pending";
  terms: string;
}

export interface Payment {
  id: number;
  tenantId: number;
  tenantName: string;
  propertyId: number;
  propertyName: string;
  unit: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  paymentMethod?: string;
  notes?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}