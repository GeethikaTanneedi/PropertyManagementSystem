import React, { useState } from 'react';
import { Building2, MapPin, IndianRupee, Users, Plus, Filter, Search, Edit, Trash2 } from 'lucide-react';

type PropertyStatus = 'available' | 'occupied' | 'maintenance';

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  units: number;
  rent: number;
  status: PropertyStatus;
  image: string;
}

interface PropertiesProps {
  properties: Property[];
  onAddProperty: (property: Omit<Property, 'id'>) => void;
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (id: number) => void;
}

interface PropertyFormData {
  name: string;
  address: string;
  type: string;
  units: number;
  rent: number;
  status: PropertyStatus;
  image: string;
}

export function Properties({ properties, onAddProperty, onEditProperty, onDeleteProperty }: PropertiesProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    address: '',
    type: 'apartment',
    units: 1,
    rent: 0,
    status: 'available',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'units' || name === 'rent' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      onEditProperty({ ...formData, id: editingProperty.id });
    } else {
      onAddProperty(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      type: 'apartment',
      units: 1,
      rent: 0,
      status: 'available',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg'
    });
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleEdit = (property: Property) => {
    setFormData(property);
    setEditingProperty(property);
    setShowForm(true);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="properties p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Properties</h1>
          <p className="text-gray-600">Manage your property portfolio</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="commercial">Commercial</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div className="flex items-center justify-center">
            <Filter className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm text-gray-600">{filteredProperties.length} properties found</span>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{property.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  property.status === 'available'
                    ? 'bg-green-100 text-green-600'
                    : property.status === 'occupied'
                    ? 'bg-orange-100 text-orange-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </span>

              <div className="space-y-2 my-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Units:</span>
                  <span className="font-medium">{property.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rent:</span>
                  <span className="font-medium">₹{property.rent}/month</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(property)}
                  className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4 inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => onDeleteProperty(property.id)}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4 inline mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Property Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingProperty ? 'Edit Property' : 'Add New Property'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Property Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="commercial">Commercial</option>
              </select>
              <input
                type="number"
                name="units"
                placeholder="Units"
                value={formData.units}
                onChange={handleChange}
                min={1}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                name="rent"
                placeholder="Rent (₹/month)"
                value={formData.rent}
                onChange={handleChange}
                min={0}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                  {editingProperty ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
