import React, { useState } from 'react';
import { IndianRupee, Calendar, User, Home, CreditCard, Plus, Search, Filter, Check, X } from 'lucide-react';

interface Payment {
  id: number;
  tenantName: string;
  propertyName: string;
  unit: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  notes?: string;
}

interface Tenant {
  id: number;
  name: string;
  propertyName: string;
  unit: string;
  rent: number;
}

interface PaymentsProps {
  payments: Payment[];
  tenants: Tenant[];
  onAddPayment: (payment: Omit<Payment, 'id'>) => void;
  onUpdatePayment: (payment: Payment) => void;
}

export function Payments({ payments, tenants, onAddPayment, onUpdatePayment }: PaymentsProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Payment['status']>('all');

  const [formData, setFormData] = useState<Omit<Payment, 'id' | 'paidDate'>>({
    tenantName: '',
    propertyName: '',
    unit: '',
    amount: 0,
    dueDate: '',
    status: 'pending',
    paymentMethod: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPayment(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      tenantName: '',
      propertyName: '',
      unit: '',
      amount: 0,
      dueDate: '',
      status: 'pending',
      paymentMethod: '',
      notes: ''
    });
    setShowForm(false);
  };

  const handleTenantSelect = (tenantName: string) => {
    const tenant = tenants.find(t => t.name === tenantName);
    if (tenant) {
      setFormData({
        ...formData,
        tenantName,
        propertyName: tenant.propertyName,
        unit: tenant.unit,
        amount: tenant.rent
      });
    }
  };

  const markAsPaid = (payment: Payment) => {
    const updatedPayment: Payment = {
      ...payment,
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0]
    };
    onUpdatePayment(updatedPayment);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch =
      payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'overdue':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payments p-6">
      {/* Header */}
      <div className="payments-header mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Management</h1>
          <p className="text-gray-600">Track rent payments and financial records</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="add-btn bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Payment</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="summary-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="summary-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="summary-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Overdue Amount</p>
              <p className="text-2xl font-bold text-red-600">₹{overdueAmount.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <X className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="filter-controls grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="search-box relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | Payment['status'])}
            className="filter-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <div className="filter-info flex items-center justify-center">
            <Filter className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm text-gray-600">{filteredPayments.length} payments found</span>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="payments-list bg-white rounded-xl shadow-md overflow-hidden">
        <div className="payments-table">
          <div className="table-header bg-gray-50 px-6 py-4 grid grid-cols-7 gap-4 font-medium text-gray-700 text-sm">
            <span>Tenant</span>
            <span>Property</span>
            <span>Amount</span>
            <span>Due Date</span>
            <span>Paid Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="table-body">
            {filteredPayments.map(payment => (
              <div
                key={payment.id}
                className="payment-row px-6 py-4 grid grid-cols-7 gap-4 border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="tenant-info">
                  <p className="font-medium text-gray-800">{payment.tenantName}</p>
                  <p className="text-sm text-gray-600">{payment.unit}</p>
                </div>
                <div className="property-info">
                  <p className="text-sm text-gray-800">{payment.propertyName}</p>
                </div>
                <div className="amount-info">
                  <p className="font-medium text-gray-800">${payment.amount}</p>
                  {payment.paymentMethod && <p className="text-sm text-gray-600">{payment.paymentMethod}</p>}
                </div>
                <div className="due-date">
                  <p className="text-sm text-gray-800">{payment.dueDate}</p>
                </div>
                <div className="paid-date">
                  <p className="text-sm text-gray-800">{payment.paidDate || '-'}</p>
                </div>
                <div className="status">
                  <span
                    className={`status-badge px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
                <div className="actions">
                  {payment.status !== 'paid' && (
                    <button
                      onClick={() => markAsPaid(payment)}
                      className="pay-btn bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      <span>Mark Paid</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Payment Form Modal */}
      {showForm && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="payment-form bg-white rounded-xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Payment Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tenant */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tenant</label>
                <select
                  value={formData.tenantName}
                  onChange={(e) => handleTenantSelect(e.target.value)}
                  className="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select Tenant</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.name}>
                      {tenant.name} - {tenant.propertyName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Property */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <input
                  type="text"
                  value={formData.propertyName}
                  readOnly
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              {/* Unit */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  readOnly
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              {/* Amount */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
                  }
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              {/* Due Date */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              {/* Status */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as 'paid' | 'pending' | 'overdue'
                    })
                  }
                  className="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              {/* Payment Method */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Check">Check</option>
                </select>
              </div>
              {/* Notes */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Additional notes..."
                />
              </div>
              {/* Actions */}
              <div className="form-actions flex space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="cancel-btn flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
