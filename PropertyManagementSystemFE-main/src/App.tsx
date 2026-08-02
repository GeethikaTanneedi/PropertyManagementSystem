import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Auth } from "./components/Auth";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { Properties } from "./components/Properties";
import { Tenants } from "./components/Tenants";
import { Leases } from "./components/Leases";
import { Payments } from "./components/Payments";
import { Settings } from "./components/Settings";
import {
  PropertyService,
  TenantService,
  LeaseService,
  PaymentService,
} from "./api/services";
import { Property, Tenant, Lease, Payment } from "./types";

// ---------- Interfaces ----------
export interface DashboardStats {
  properties: number;
  tenants: number;
  revenue: number;
  leases: number;
}

// ---------- App Component ----------
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "properties" | "tenants" | "leases" | "payments" | "settings"
  >("dashboard");
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [leases, setLeases] = useState<Lease[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // ---------- Fetch backend data ----------
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAllData = async () => {
      try {
        const [propRes, tenantRes, leaseRes, paymentRes] = await Promise.all([
          PropertyService.getAll(),
          TenantService.getAll(),
          LeaseService.getAll(),
          PaymentService.getAll(),
        ]);

        // Set properties directly
        setProperties(propRes.data);

        // Transform tenant data to match frontend interface
        const tenantsWithPropertyName: Tenant[] = tenantRes.data.map((t: any) => {
          const property = propRes.data.find((p: Property) => p.id === t.property?.id);
          return {
            ...t,
            propertyId: t.property?.id || 0,
            propertyName: property ? property.name : "Unknown Property",
          };
        });
        setTenants(tenantsWithPropertyName);

        // Transform lease data
        const leasesWithNames: Lease[] = leaseRes.data.map((l: any) => ({
          ...l,
          tenantName: l.tenant?.name || "Unknown Tenant",
          propertyName: l.property?.name || "Unknown Property",
        }));
        setLeases(leasesWithNames);

        // Transform payment data
        const paymentsWithNames: Payment[] = paymentRes.data.map((p: any) => ({
          ...p,
          tenantName: p.tenant?.name || "Unknown Tenant",
          propertyName: p.property?.name || "Unknown Property",
        }));
        setPayments(paymentsWithNames);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [isAuthenticated]);

  // ---------- Authentication Handlers ----------
  const handleLogin = (user: { id: number; name: string; email: string }) => {
    setIsAuthenticated(true);
    setUserName(user.name);
    setUserEmail(user.email);
  };

  const handleSignup = (user: { id: number; name: string; email: string }) => {
    setIsAuthenticated(true);
    setUserName(user.name);
    setUserEmail(user.email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("dashboard");
    setUserName(null);
    setUserEmail(null);
    localStorage.removeItem("token");
  };

  // ---------- Property Management ----------
  const addProperty = async (propertyData: Omit<Property, "id">) => {
    try {
      const response = await PropertyService.create(propertyData);
      setProperties(prev => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding property:", err);
    }
  };

  const editProperty = async (updated: Property) => {
    try {
      const response = await PropertyService.update(updated.id, updated);
      setProperties(prev => prev.map(p => p.id === updated.id ? response.data : p));
    } catch (err) {
      console.error("Error updating property:", err);
    }
  };

  const deleteProperty = async (id: number) => {
    try {
      await PropertyService.delete(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  // ---------- Tenant Management ----------
  const addTenant = async (tenantData: Omit<Tenant, "id">) => {
    try {
      const response = await TenantService.create(tenantData);
      setTenants(prev => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding tenant:", err);
    }
  };

  const editTenant = async (updated: Tenant) => {
    try {
      const response = await TenantService.update(updated.id, updated);
      setTenants(prev => prev.map(t => t.id === updated.id ? response.data : t));
    } catch (err) {
      console.error("Error updating tenant:", err);
    }
  };

  const deleteTenant = async (id: number) => {
    try {
      await TenantService.delete(id);
      setTenants(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting tenant:", err);
    }
  };

  // ---------- Lease Management ----------
  const addLease = async (leaseData: Omit<Lease, "id">) => {
    try {
      const response = await LeaseService.create(leaseData);
      setLeases(prev => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding lease:", err);
    }
  };

  const editLease = async (updated: Lease) => {
    try {
      const response = await LeaseService.update(updated.id, updated);
      setLeases(prev => prev.map(l => l.id === updated.id ? response.data : l));
    } catch (err) {
      console.error("Error updating lease:", err);
    }
  };

  const deleteLease = async (id: number) => {
    try {
      await LeaseService.delete(id);
      setLeases(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error("Error deleting lease:", err);
    }
  };

  // ---------- Payment Management ----------
  const addPayment = async (paymentData: Omit<Payment, "id">) => {
    try {
      const response = await PaymentService.create(paymentData);
      setPayments(prev => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding payment:", err);
    }
  };

  const updatePayment = async (updated: Payment) => {
    try {
      const response = await PaymentService.update(updated.id, updated);
      setPayments(prev => prev.map(p => p.id === updated.id ? response.data : p));
    } catch (err) {
      console.error("Error updating payment:", err);
    }
  };

  // ---------- Dashboard Stats ----------
  const dashboardStats: DashboardStats = {
    properties: properties.length,
    tenants: tenants.filter((t) => t.status === "active").length,
    revenue: payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0),
    leases: leases.filter((l) => l.status === "active").length,
  };

  // ---------- Render ----------
  if (!isAuthenticated)
    return <Auth onLogin={handleLogin} onSignup={handleSignup} />;

  return (
    // REMOVED basename for Kubernetes deployment
    <BrowserRouter>
      <div className="app min-h-screen bg-gray-50">
        <Navbar
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={handleLogout}
          userName={userName}
          userEmail={userEmail}
        />
        <div className="main-content">
          {currentView === "dashboard" && <Dashboard stats={dashboardStats} />}
          {currentView === "properties" && (
            <Properties
              properties={properties}
              onAddProperty={addProperty}
              onEditProperty={editProperty}
              onDeleteProperty={deleteProperty}
            />
          )}
          {currentView === "tenants" && (
            <Tenants
              tenants={tenants}
              properties={properties.map((p) => ({
                id: p.id,
                name: p.name,
                units: p.units,
              }))}
              onAddTenant={addTenant}
              onEditTenant={editTenant}
              onDeleteTenant={deleteTenant}
            />
          )}
          {currentView === "leases" && (
            <Leases
              leases={leases}
              tenants={tenants.map((t) => ({
                id: t.id,
                name: t.name,
                propertyName: t.propertyName,
                unit: t.unit,
              }))}
              onAddLease={addLease}
              onEditLease={editLease}
              onDeleteLease={deleteLease}
            />
          )}
          {currentView === "payments" && (
            <Payments
              payments={payments}
              tenants={tenants.map((t) => ({
                id: t.id,
                name: t.name,
                propertyName: t.propertyName,
                unit: t.unit,
                rent: t.rent,
              }))}
              onAddPayment={addPayment}
              onUpdatePayment={updatePayment}
            />
          )}
          {currentView === "settings" && <Settings />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;