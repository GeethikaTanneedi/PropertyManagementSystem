import React from "react";
import { Payment } from "../types";

interface TenantOption {
  id: number;
  name: string;
  propertyName: string;
  unit: string;
  rent: number;
}

interface PaymentsProps {
  payments: Payment[];
  tenants: TenantOption[];
  onAddPayment: (payment: Omit<Payment, "id">) => void;
  onUpdatePayment: (payment: Payment) => void;
}

export function Payments({ payments, tenants, onAddPayment, onUpdatePayment }: PaymentsProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map(p => (
          <div key={p.id} className="bg-white shadow-md rounded-xl p-4 border border-orange-100 hover:shadow-lg transition-shadow">
            <h2 className="font-semibold text-lg text-gray-800">{p.tenantName} - {p.propertyName}</h2>
            <p className="text-gray-600">Amount: ₹{p.amount}</p>
            <p className="text-gray-600">Due: {p.dueDate}, Paid: {p.paidDate || "-"}</p>
            <p className="text-gray-600">Status: 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                p.status === 'paid' ? 'bg-green-100 text-green-800' :
                p.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {p.status}
              </span>
            </p>
            <button 
              onClick={() => onUpdatePayment(p)} 
              className="w-full bg-orange-100 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-200 transition-colors mt-2"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}