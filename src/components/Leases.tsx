// src/components/Leases.tsx
import React from "react";
import { Lease } from "../types";

interface TenantOption {
  id: number;
  name: string;
  propertyName: string;
  unit: string;
}

interface LeaseProps {
  leases: Lease[];
  tenants: TenantOption[];
  onAddLease: (lease: Omit<Lease, "id">) => void;
  onEditLease: (lease: Lease) => void;
  onDeleteLease: (id: number) => void;
}

export function Leases({ leases, tenants, onAddLease, onEditLease, onDeleteLease }: LeaseProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Leases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leases.map(l => (
          <div key={l.id} className="bg-white shadow-md rounded-xl p-4 border border-orange-100 hover:shadow-lg transition-shadow">
            <h2 className="font-semibold text-lg text-gray-800">{l.tenantName} - {l.propertyName}</h2>
            <p className="text-gray-600">{l.startDate} to {l.endDate}</p>
            <p className="text-gray-600">Rent: ₹{l.monthlyRent}, Security: ₹{l.securityDeposit}</p>
            <p className="text-gray-600">Status: 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                l.status === 'active' ? 'bg-green-100 text-green-800' :
                l.status === 'expired' ? 'bg-red-100 text-red-800' :
                l.status === 'terminated' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {l.status}
              </span>
            </p>
            <div className="flex space-x-2 mt-4">
              <button 
                onClick={() => onEditLease(l)} 
                className="flex-1 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => onDeleteLease(l.id)} 
                className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}