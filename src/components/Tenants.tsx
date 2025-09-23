// Tenants.tsx
import React, { useState } from 'react';
import { User, Phone, Mail, Home, Calendar, Plus, Search, Edit, Trash2 } from 'lucide-react';

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  propertyName: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  status: 'active' | 'pending' | 'inactive';
}

interface TenantsProps {
  tenants: Tenant[];
  properties: Array<{ id: number; name: string; units: number }>;
  onAddTenant: (tenant: Omit<Tenant, 'id'>) => void;
  onEditTenant: (tenant: Tenant) => void;
  onDeleteTenant: (id: number) => void;
}

export function Tenants({ tenants, properties, onAddTenant, onEditTenant, onDeleteTenant }: TenantsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Omit<Tenant, 'id'>>({
    name: '',
    email: '',
    phone: '',
    propertyName: '',
    unit: '',
    leaseStart: '',
    leaseEnd: '',
    rent: 0,
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTenant) {
      onEditTenant({ ...formData, id: editingTenant.id });
    } else {
      onAddTenant(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyName: '',
      unit: '',
      leaseStart: '',
      leaseEnd: '',
      rent: 0,
      status: 'active'
    });
    setShowForm(false);
    setEditingTenant(null);
  };

  const handleEdit = (tenant: Tenant) => {
    setFormData(tenant);
    setEditingTenant(tenant);
    setShowForm(true);
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tenants p-6">
      {/* Header */}
      <div className="tenants-header mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tenants</h1>
          <p className="text-gray-600">Manage your tenant information</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="add-btn bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Tenant</span>
        </button>
      </div>

      {/* Search */}
      <div className="search-section bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="search-box relative">
          <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Tenant Cards */}
      <div className="tenants-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTenants.map(tenant => (
          <div key={tenant.id} className="tenant-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="tenant-header mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">{tenant.name}</h3>
              <span className={`status-badge px-2 py-1 text-xs font-medium rounded-full ${
                tenant.status === 'active' ? 'bg-green-100 text-green-600' :
                tenant.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
              </span>
            </div>

            <div className="tenant-info space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{tenant.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{tenant.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Home className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{tenant.propertyName} - Unit {tenant.unit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{tenant.leaseStart} to {tenant.leaseEnd}</span>
              </div>
              <div className="bg-orange-50 rounded-lg p-2">
                <span className="text-sm text-orange-600 font-medium">Monthly Rent: ${tenant.rent}</span>
              </div>
            </div>

            <div className="tenant-actions flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(tenant)}
                className="edit-btn flex-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDeleteTenant(tenant.id)}
                className="delete-btn flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tenant Form Modal */}
      {showForm && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="tenant-form bg-white rounded-xl shadow-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingTenant ? 'Edit Tenant' : 'Add New Tenant'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields */}
              {['name', 'email', 'phone', 'unit', 'leaseStart', 'leaseEnd', 'rent'].map(field => (
                <div key={field} className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type={field === 'email' ? 'email' : field === 'rent' ? 'number' : field === 'leaseStart' || field === 'leaseEnd' ? 'date' : 'text'}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: field === 'rent' ? parseFloat(e.target.value) : e.target.value })}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              ))}

              {/* Property */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <select
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  className="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select Property</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.name}>{property.name}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'pending' | 'inactive' })}
                  className="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions flex space-x-4 mt-4">
                <button type="button" onClick={resetForm} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                  {editingTenant ? 'Update' : 'Add'} Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}