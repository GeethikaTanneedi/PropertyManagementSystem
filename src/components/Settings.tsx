// src/components/Settings.tsx
import React, { useState } from "react";
import { User, Home, CreditCard, Bell, Shield, Globe, Settings as Cog } from "lucide-react";

interface SettingsData {
  name: string;
  email: string;
  role: string;
  defaultCurrency: string;
  leaseDuration: string;
  paymentMethods: string[];
  lateFeePercentage: number;
  notifications: { email: boolean; sms: boolean; push: boolean };
  twoFactorAuth: boolean;
  dashboardRefreshInterval: string;
  theme: "light" | "dark";
  language: string;
  timezone: string;
}

export function Settings() {
  const [settings, setSettings] = useState<SettingsData>({
    name: "Geethika",
    email: "geethika@gmail.com",
    role: "Admin",
    defaultCurrency: "INR (₹)",
    leaseDuration: "12 months",
    paymentMethods: ["Bank Transfer", "Cash"],
    lateFeePercentage: 5,
    notifications: { email: true, sms: false, push: true },
    twoFactorAuth: false,
    dashboardRefreshInterval: "Daily",
    theme: "light",
    language: "English",
    timezone: "Asia/Kolkata",
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formData);
    setShowForm(false);
  };

  const togglePaymentMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }));
  };

  return (
    <div className="settings p-6">
      <div className="settings-header mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your property management preferences</p>
        </div>
        <button
          onClick={() => {
            setFormData(settings);
            setShowForm(true);
          }}
          className="edit-btn bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Cog className="h-5 w-5" />
          <span>Edit Settings</span>
        </button>
      </div>

      <div className="settings-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="setting-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">Account</h3>
          </div>
          <p className="text-sm text-gray-600">Name: {settings.name}</p>
          <p className="text-sm text-gray-600">Email: {settings.email}</p>
          <p className="text-sm text-gray-600">Role: {settings.role}</p>
        </div>

        <div className="setting-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Home className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">Property</h3>
          </div>
          <p className="text-sm text-gray-600">Default Currency: {settings.defaultCurrency}</p>
          <p className="text-sm text-gray-600">Lease Duration: {settings.leaseDuration}</p>
          <p className="text-sm text-gray-600">Late Fee: {settings.lateFeePercentage}%</p>
        </div>

        <div className="setting-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <CreditCard className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
          </div>
          {settings.paymentMethods.map((method) => (
            <p key={method} className="text-sm text-gray-600">{method}</p>
          ))}
        </div>

        <div className="setting-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>
          <p className="text-sm text-gray-600">Email: {settings.notifications.email ? "Enabled" : "Disabled"}</p>
          <p className="text-sm text-gray-600">SMS: {settings.notifications.sms ? "Enabled" : "Disabled"}</p>
          <p className="text-sm text-gray-600">Push: {settings.notifications.push ? "Enabled" : "Disabled"}</p>
        </div>

        <div className="setting-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">Security</h3>
          </div>
          <p className="text-sm text-gray-600">Two-Factor Auth: {settings.twoFactorAuth ? "Enabled" : "Disabled"}</p>
        </div>

        <div className="setting-card bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-teal-500" />
            <h3 className="text-lg font-semibold text-gray-800">System</h3>
          </div>
          <p className="text-sm text-gray-600">Dashboard Refresh: {settings.dashboardRefreshInterval}</p>
          <p className="text-sm text-gray-600">Theme: {settings.theme}</p>
          <p className="text-sm text-gray-600">Language: {settings.language}</p>
          <p className="text-sm text-gray-600">Timezone: {settings.timezone}</p>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="settings-form bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Include form fields same as previous code */}
              {/* Submit + Cancel */}
              <div className="flex space-x-4 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
