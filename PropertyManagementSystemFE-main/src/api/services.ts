import API from "./axios";
import { Property, Tenant, Lease, Payment } from "../types";
import { AuthResponse } from "./types";

export const AuthService = {
  login: (email: string, password: string) =>
    API.post<AuthResponse>("/auth/signin", { email, password }),
  signup: (name: string, email: string, password: string) =>
    API.post<AuthResponse>("/auth/signup", { name, email, password }),
};

export const PropertyService = {
  getAll: () => API.get<Property[]>("/properties"),
  getById: (id: number) => API.get<Property>(`/properties/${id}`),
  create: (property: Omit<Property, "id">) => API.post<Property>("/properties", property),
  update: (id: number, property: Partial<Property>) => API.put<Property>(`/properties/${id}`, property),
  delete: (id: number) => API.delete(`/properties/${id}`)
};

export const TenantService = {
  getAll: () => API.get<Tenant[]>("/tenants"),
  getById: (id: number) => API.get<Tenant>(`/tenants/${id}`),
  create: (tenant: Omit<Tenant, "id">) => API.post<Tenant>("/tenants", tenant),
  update: (id: number, tenant: Partial<Tenant>) => API.put<Tenant>(`/tenants/${id}`, tenant),
  delete: (id: number) => API.delete(`/tenants/${id}`)
};

export const LeaseService = {
  getAll: () => API.get<Lease[]>("/leases"),
  getById: (id: number) => API.get<Lease>(`/leases/${id}`),
  create: (lease: Omit<Lease, "id">) => API.post<Lease>("/leases", lease),
  update: (id: number, lease: Partial<Lease>) => API.put<Lease>(`/leases/${id}`, lease),
  delete: (id: number) => API.delete(`/leases/${id}`)
};

export const PaymentService = {
  getAll: () => API.get<Payment[]>("/payments"),
  getById: (id: number) => API.get<Payment>(`/payments/${id}`),
  create: (payment: Omit<Payment, "id">) => API.post<Payment>("/payments", payment),
  update: (id: number, payment: Partial<Payment>) => API.put<Payment>(`/payments/${id}`, payment),
  delete: (id: number) => API.delete(`/payments/${id}`)
};