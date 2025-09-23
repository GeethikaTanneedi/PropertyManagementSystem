import React from 'react';
import { Home, Building2, Users, FileText, DollarSign, Settings, LogOut, IndianRupee } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export function Navbar({ currentView, onViewChange, onLogout }: NavbarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'leases', label: 'Leases', icon: FileText },
    { id: 'payments', label: 'Payments', icon: IndianRupee },
    { id: 'settings', label: 'Settings', icon: Settings },
    
  ];

  return (
    <nav className="navbar bg-orange-600 text-white p-4 shadow-lg">
      <div className="nav-container max-w-6xl mx-auto flex justify-between items-center">
        <div className="logo flex items-center space-x-2">
          <Building2 className="h-8 w-8" />
          <span className="text-xl font-bold">PropertyManager</span>
        </div>
        
        <div className="nav-menu hidden md:flex space-x-6">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`nav-btn flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === id
                  ? 'bg-orange-700 shadow-md'
                  : 'hover:bg-orange-500'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onLogout}
          className="logout-btn flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}