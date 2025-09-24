import React, { useState } from 'react';
import { FileText, Calendar, User, Home, IndianRupee, Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

interface Lease {
  id: number;
  tenantName: string;
  propertyName: string;
  unit: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'active' | 'expired' | 'terminated' | 'pending';
  terms: string;
}

type LeaseForm = Omit<Lease, 'id'>;

interface LeasesProps {
  leases: Lease[];
  tenants: Array<{ id: number; name: string; propertyName: string; unit: string }>;
  onAddLease: (lease: LeaseForm) => void;
  onEditLease: (lease: Lease) => void;
  onDeleteLease: (id: number) => void;
}

export function Leases({ leases, tenants, onAddLease, onEditLease, onDeleteLease }: LeasesProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingLease, setEditingLease] = useState<Lease | null>(null);
  const [viewingLease, setViewingLease] = useState<Lease | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<LeaseForm>({
    tenantName: '',
    propertyName: '',
    unit: '',
    startDate: '',
    endDate: '',
    monthlyRent: 0,
    securityDeposit: 0,
    status: 'active',
    terms: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLease) {
      onEditLease({ ...formData, id: editingLease.id });
    } else {
      onAddLease(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      tenantName: '',
      propertyName: '',
      unit: '',
      startDate: '',
      endDate: '',
      monthlyRent: 0,
      securityDeposit: 0,
      status: 'active',
      terms: ''
    });
    setShowForm(false);
    setEditingLease(null);
  };

  const handleEdit = (lease: Lease) => {
    setFormData({
      tenantName: lease.tenantName,
      propertyName: lease.propertyName,
      unit: lease.unit,
      startDate: lease.startDate,
      endDate: lease.endDate,
      monthlyRent: lease.monthlyRent,
      securityDeposit: lease.securityDeposit,
      status: lease.status,
      terms: lease.terms
    });
    setEditingLease(lease);
    setShowForm(true);
  };

  const handleTenantSelect = (tenantName: string) => {
    const tenant = tenants.find(t => t.name === tenantName);
    if (tenant) {
      setFormData(prev => ({
        ...prev,
        tenantName,
        propertyName: tenant.propertyName,
        unit: tenant.unit
      }));
    }
  };

  const filteredLeases = leases.filter(lease =>
    lease.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lease.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'expired': return 'bg-red-100 text-red-600';
      case 'terminated': return 'bg-gray-100 text-gray-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="leases p-6">
      {/* Header */}
      <div className="leases-header mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lease Agreements</h1>
          <p className="text-gray-600">Manage lease contracts and agreements</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="add-btn bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Lease</span>
        </button>
      </div>

      {/* Search */}
      <div className="search-section bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="search-box relative">
          <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search leases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Lease Cards */}
      <div className="leases-grid grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filteredLeases.map(lease => (
          <div key={lease.id} className="lease-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="lease-header mb-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Lease #{lease.id}</h3>
              <span className={`status-badge px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lease.status)}`}>
                {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
              </span>
            </div>

            <div className="lease-info space-y-2 mb-4">
              <p><User className="inline h-4 w-4 text-gray-400 mr-1" /> Tenant: {lease.tenantName}</p>
              <p><Home className="inline h-4 w-4 text-gray-400 mr-1" /> Property: {lease.propertyName} - Unit {lease.unit}</p>
              <p><Calendar className="inline h-4 w-4 text-gray-400 mr-1" /> Term: {lease.startDate} to {lease.endDate}</p>
              <p><IndianRupee className="inline h-4 w-4 text-gray-400 mr-1" /> Rent: ₹{lease.monthlyRent}/month</p>
              <p><IndianRupee className="inline h-4 w-4 text-gray-400 mr-1" /> Deposit: ₹{lease.securityDeposit}</p>
            </div>

            <div className="lease-actions flex space-x-2">
              <button
                onClick={() => setViewingLease(lease)}
                className="view-btn flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Eye className="h-4 w-4" /> <span>View</span>
              </button>
              <button
                onClick={() => handleEdit(lease)}
                className="edit-btn flex-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Edit className="h-4 w-4" /> <span>Edit</span>
              </button>
              <button
                onClick={() => onDeleteLease(lease.id)}
                className="delete-btn flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Trash2 className="h-4 w-4" /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lease Form Modal */}
      {showForm && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="lease-form bg-white rounded-xl shadow-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingLease ? 'Edit Lease' : 'Create New Lease'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tenant Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tenant</label>
                <select
                  value={formData.tenantName}
                  onChange={(e) => handleTenantSelect(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select Tenant</option>
                  {tenants.map(tenant => <option key={tenant.id} value={tenant.name}>{tenant.name}</option>)}
                </select>
              </div>
              {/* Property & Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <input type="text" value={formData.propertyName} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <input type="text" value={formData.unit} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" />
              </div>
              {/* Dates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input type="date" value={formData.startDate} onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input type="date" value={formData.endDate} onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required />
              </div>
              {/* Financial */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent</label>
                <input type="number" value={formData.monthlyRent} onChange={(e) => setFormData(prev => ({ ...prev, monthlyRent: parseFloat(e.target.value) }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min={0} step={0.01} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit</label>
                <input type="number" value={formData.securityDeposit} onChange={(e) => setFormData(prev => ({ ...prev, securityDeposit: parseFloat(e.target.value) }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" min={0} step={0.01} required />
              </div>
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Lease['status'] }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
              {/* Terms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
                <textarea value={formData.terms} onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter lease terms..." />
              </div>
              {/* Actions */}
              <div className="flex space-x-4 mt-4">
                <button type="button" onClick={resetForm} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">{editingLease ? 'Update' : 'Create'} Lease</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingLease && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="lease-view bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Lease Agreement #{viewingLease.id}</h2>
              <button onClick={() => setViewingLease(null)} className="close-btn text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="lease-details space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Lease Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>Tenant: <strong>{viewingLease.tenantName}</strong></p>
                  <p>Property: <strong>{viewingLease.propertyName}</strong></p>
                  <p>Unit: <strong>{viewingLease.unit}</strong></p>
                  <p>Status: <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(viewingLease.status)}`}>{viewingLease.status.charAt(0).toUpperCase() + viewingLease.status.slice(1)}</span></p>
                  <p>Monthly Rent: <strong>${viewingLease.monthlyRent}</strong></p>
                  <p>Security Deposit: <strong>${viewingLease.securityDeposit}</strong></p>
                  <p>Start Date: <strong>{viewingLease.startDate}</strong></p>
                  <p>End Date: <strong>{viewingLease.endDate}</strong></p>
                </div>
              </div>
              {viewingLease.terms && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Terms & Conditions</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewingLease.terms}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
