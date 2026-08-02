// src/components/Navbar.tsx
import React from "react";
import {
  Home,
  Building2,
  Users,
  FileText,
  IndianRupee,
  Settings as Cog,
  LogOut,
} from "lucide-react";

type View = "dashboard" | "properties" | "tenants" | "leases" | "payments" | "settings";

interface NavbarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
  userName?: string | null;
  userEmail?: string | null;
}

export function Navbar({ currentView, onViewChange, onLogout, userName, userEmail }: NavbarProps) {
  const menuItems: { id: View; label: string; icon: React.FC<any> }[] = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "leases", label: "Leases", icon: FileText },
    { id: "payments", label: "Payments", icon: IndianRupee },
    { id: "settings", label: "Settings", icon: Cog },
  ];

  return (
    <nav className="navbar bg-orange-500 text-white p-4 shadow-lg">
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
                currentView === id ? "bg-orange-600 shadow-md" : "hover:bg-orange-400"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {userName && <span className="text-orange-100">Welcome, {userName}</span>}
          <button
            onClick={onLogout}
            className="logout-btn flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}