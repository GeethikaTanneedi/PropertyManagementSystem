import React, { useState } from "react";
import { Plus } from "lucide-react";
import { PropertyService } from "../api/services";
import { Property } from "../types";

interface PropertiesProps {
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (id: number) => void;
}

export function Properties({ properties, onAddProperty, onEditProperty, onDeleteProperty }: PropertiesProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Omit<Property, "id">>({
    name: "",
    address: "",
    type: "",
    units: 0,
    rent: 0,
    status: "available",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingProperty) {
        const updatedProperty = { ...formData, id: editingProperty.id };
        const res = await PropertyService.update(editingProperty.id, updatedProperty);
        onEditProperty(res.data);
      } else {
        const res = await PropertyService.create(formData);
        onAddProperty(res.data);
      }
      resetForm();
    } catch (err) {
      console.error("Error saving property:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      type: "",
      units: 0,
      rent: 0,
      status: "available",
      image: "",
    });
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleEdit = (property: Property) => {
    const { id, ...propertyWithoutId } = property;
    setFormData(propertyWithoutId);
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await PropertyService.delete(id);
        onDeleteProperty(id);
      } catch (err) {
        console.error("Error deleting property:", err);
      }
    }
  };

  return (
    <div className="properties p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Properties</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" /> 
          <span>Add Property</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
          <div key={p.id} className="bg-white shadow-md rounded-xl p-4 border border-orange-100 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
            <p className="text-gray-600">{p.address}</p>
            <p className="text-gray-600">Type: {p.type}</p>
            <p className="text-gray-600">Units: {p.units}</p>
            <p className="text-gray-600">Rent: ₹{p.rent?.toLocaleString()}</p>
            <p className="text-gray-600">Status: 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                p.status === 'available' ? 'bg-green-100 text-green-800' :
                p.status === 'occupied' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {p.status}
              </span>
            </p>
            <div className="flex space-x-2 mt-4">
              <button 
                onClick={() => handleEdit(p)} 
                className="flex-1 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(p.id)} 
                className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editingProperty ? "Edit Property" : "Add Property"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Property Name" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <input 
                type="text" 
                placeholder="Address" 
                value={formData.address} 
                onChange={e => setFormData({ ...formData, address: e.target.value })} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <input 
                type="text" 
                placeholder="Type (Apartment, House, etc.)" 
                value={formData.type} 
                onChange={e => setFormData({ ...formData, type: e.target.value })} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <input 
                type="number" 
                placeholder="Units" 
                value={formData.units || ''} 
                onChange={e => setFormData({ ...formData, units: parseInt(e.target.value) || 0 })} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <input 
                type="number" 
                placeholder="Monthly Rent" 
                value={formData.rent || ''} 
                onChange={e => setFormData({ ...formData, rent: parseFloat(e.target.value) || 0 })} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <select 
                value={formData.status} 
                onChange={e => setFormData({ ...formData, status: e.target.value as Property["status"] })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <input 
                type="text" 
                placeholder="Image URL (optional)" 
                value={formData.image} 
                onChange={e => setFormData({ ...formData, image: e.target.value })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />

              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors"
                >
                  {loading ? "Saving..." : editingProperty ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}