// src/components/Tenants.tsx
import React, { useState } from "react";
import { Plus } from "lucide-react";
import API from "../api/axios";

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

interface PropertyOption {
  id: number;
  name: string;
  units: number;
}

interface TenantsProps {
  tenants: Tenant[];
  properties: PropertyOption[];
  onAddTenant: (tenant: Omit<Tenant, "id">) => void;
  onEditTenant: (tenant: Tenant) => void;
  onDeleteTenant: (id: number) => void;
}

export function Tenants({ tenants, properties, onAddTenant, onEditTenant, onDeleteTenant }: TenantsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState<Omit<Tenant, "id">>({
    name: "",
    email: "",
    phone: "",
    propertyId: 0,
    propertyName: "",
    unit: "",
    leaseStart: "",
    leaseEnd: "",
    rent: 0,
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTenant) {
        const res = await API.put<Tenant>(`/tenants/${editingTenant.id}`, formData);
        onEditTenant(res.data);
      } else {
        const res = await API.post<Tenant>("/tenants", formData);
        onAddTenant(res.data);
      }
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyId: 0,
      propertyName: "",
      unit: "",
      leaseStart: "",
      leaseEnd: "",
      rent: 0,
      status: "active",
    });
    setShowForm(false);
    setEditingTenant(null);
  };

  const handleEdit = (tenant: Tenant) => {
    setFormData(tenant);
    setEditingTenant(tenant);
    setShowForm(true);
  };

  return (
    <div className="tenants p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenants</h1>
        <button onClick={() => setShowForm(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus /> <span>Add Tenant</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map(t => (
          <div key={t.id} className="bg-white shadow-md rounded-xl p-4">
            <h3 className="font-semibold">{t.name}</h3>
            <p>{t.email}</p>
            <p>{t.phone}</p>
            <p>{t.propertyName} - Unit {t.unit}</p>
            <p>{t.leaseStart} to {t.leaseEnd}</p>
            <p>Rent: ₹{t.rent}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => handleEdit(t)} className="flex-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg">Edit</button>
              <button onClick={() => onDeleteTenant(t.id)} className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{editingTenant ? "Edit Tenant" : "Add Tenant"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              <input type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
              <input type="text" placeholder="Unit" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} required />
              <input type="date" placeholder="Lease Start" value={formData.leaseStart} onChange={e => setFormData({ ...formData, leaseStart: e.target.value })} required />
              <input type="date" placeholder="Lease End" value={formData.leaseEnd} onChange={e => setFormData({ ...formData, leaseEnd: e.target.value })} required />
              <input type="number" placeholder="Rent" value={formData.rent} onChange={e => setFormData({ ...formData, rent: parseFloat(e.target.value) })} required />

              <select value={formData.propertyId} onChange={e => {
                const property = properties.find(p => p.id === Number(e.target.value));
                if (property) setFormData({ ...formData, propertyId: property.id, propertyName: property.name });
              }} required>
                <option value="">Select Property</option>
                {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>

              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as "active" | "pending" | "inactive" })}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={resetForm} className="px-3 py-1 border rounded-lg">Cancel</button>
                <button type="submit" className="px-3 py-1 bg-orange-600 text-white rounded-lg">{editingTenant ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
