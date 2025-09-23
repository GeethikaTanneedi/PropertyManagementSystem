import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from './components/Auth';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Properties } from './components/Properties';
import { Tenants } from './components/Tenants';
import { Leases } from './components/Leases';
import { Payments } from './components/Payments';
import { Settings } from './components/Settings';

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  units: number;
  rent: number;
  status: 'available' | 'occupied' | 'maintenance';
  image: string;
}

interface Tenant {
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const [properties, setProperties] = useState<Property[]>([
    { id: 1, name: 'Lotus Residency', address: '123 MG Road, Bengaluru, Karnataka', type: 'apartment', units: 24, rent: 25000, status: 'maintenance', image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg' },
    { id: 2, name: 'Ganga Heights', address: '45 Nehru Nagar, Delhi', type: 'condo', units: 12, rent: 30000, status: 'available', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg' },
    { id: 3, name: 'Himalaya Towers', address: '78 MG Road, Pune, Maharashtra', type: 'apartment', units: 18, rent: 28000, status: 'occupied', image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg' },
    { id: 4, name: 'Shivneri Apartments', address: '12 Marine Drive, Mumbai, Maharashtra', type: 'apartment', units: 20, rent: 22000, status: 'available', image: 'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg' },
    { id: 5, name: 'Sundar Villa', address: '34 Residency Road, Hyderabad, Telangana', type: 'villa', units: 10, rent: 27000, status: 'maintenance', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
    { id: 6, name: 'Marigold Residency', address: '56 Park Street, Kolkata, West Bengal', type: 'apartment', units: 15, rent: 26000, status: 'available', image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg' },
    { id: 7, name: 'Rosewood Apartments', address: '78 Brigade Road, Bengaluru, Karnataka', type: 'apartment', units: 22, rent: 32000, status: 'occupied', image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg' },
    { id: 8, name: 'Lotus Residency Tower B', address: '125 MG Road, Bengaluru, Karnataka', type: 'apartment', units: 18, rent: 25000, status: 'maintenance', image: 'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg' }
  ]);

  const [tenants, setTenants] = useState<Tenant[]>([
    { id: 1, name: 'Rohit Sharma', email: 'rohit.sharma@email.com', phone: '+91 98765 43210', propertyName: 'Lotus Residency', unit: 'A-101', leaseStart: '2024-01-01', leaseEnd: '2024-12-31', rent: 25000, status: 'active' },
    { id: 2, name: 'Anjali Mehta', email: 'anjali.mehta@email.com', phone: '+91 91234 56789', propertyName: 'Ganga Heights', unit: 'B-205', leaseStart: '2024-02-15', leaseEnd: '2025-02-14', rent: 30000, status: 'active' },
    { id: 3, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 99887 66554', propertyName: 'Himalaya Towers', unit: 'C-310', leaseStart: '2024-03-01', leaseEnd: '2025-02-28', rent: 28000, status: 'inactive' },
    { id: 4, name: 'Priya Kapoor', email: 'priya.kapoor@email.com', phone: '+91 98765 12345', propertyName: 'Shivneri Apartments', unit: 'D-402', leaseStart: '2024-04-01', leaseEnd: '2025-03-31', rent: 22000, status: 'inactive' },
    { id: 5, name: 'Amit Verma', email: 'amit.verma@email.com', phone: '+91 91234 67890', propertyName: 'Sundar Villa', unit: 'E-108', leaseStart: '2024-05-01', leaseEnd: '2025-04-30', rent: 27000, status: 'active' },
    { id: 6, name: 'Neha Reddy', email: 'neha.reddy@email.com', phone: '+91 99876 54321', propertyName: 'Marigold Residency', unit: 'F-302', leaseStart: '2024-06-01', leaseEnd: '2025-05-31', rent: 26000, status: 'active' },
    { id: 7, name: 'Karan Jain', email: 'karan.jain@email.com', phone: '+91 98765 43211', propertyName: 'Rosewood Apartments', unit: 'G-210', leaseStart: '2024-07-01', leaseEnd: '2025-06-30', rent: 32000, status: 'inactive' },
    { id: 8, name: 'Simran Kaur', email: 'simran.kaur@email.com', phone: '+91 91234 56780', propertyName: 'Lotus Residency', unit: 'A-102', leaseStart: '2024-08-01', leaseEnd: '2025-07-31', rent: 25000, status: 'active' }
  ]);

  const [leases, setLeases] = useState<Lease[]>([
    { id: 1, tenantName: 'Rohit Sharma', propertyName: 'Lotus Residency', unit: 'A-101', startDate: '2024-01-01', endDate: '2024-12-31', monthlyRent: 25000, securityDeposit: 50000, status: 'active', terms: 'Standard residential lease terms apply. No pets allowed. Water and maintenance included. Electricity billed separately.' },
    { id: 2, tenantName: 'Anjali Mehta', propertyName: 'Ganga Heights', unit: 'B-205', startDate: '2024-02-15', endDate: '2025-02-14', monthlyRent: 30000, securityDeposit: 60000, status: 'active', terms: 'Standard lease. Pets allowed with prior approval. Maintenance included. Electricity and gas separate.' },
    { id: 3, tenantName: 'Vikram Singh', propertyName: 'Himalaya Towers', unit: 'C-310', startDate: '2024-03-01', endDate: '2025-02-28', monthlyRent: 28000, securityDeposit: 56000, status: 'active', terms: 'Residential lease with 1-year term. No smoking allowed inside units. Maintenance included. Electricity separate.' },
    { id: 4, tenantName: 'Priya Kapoor', propertyName: 'Shivneri Apartments', unit: 'D-402', startDate: '2024-04-01', endDate: '2025-03-31', monthlyRent: 22000, securityDeposit: 44000, status: 'active', terms: 'Lease term: 1 year. Pets allowed. Water and maintenance included. Electricity billed separately.' }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, tenantName: 'Rohit Sharma', propertyName: 'Lotus Residency', unit: 'A-101', amount: 25000, dueDate: '2025-01-01', paidDate: '2024-12-28', status: 'paid', paymentMethod: 'Bank Transfer' },
    { id: 2, tenantName: 'Anjali Mehta', propertyName: 'Ganga Heights', unit: 'B-205', amount: 30000, dueDate: '2025-01-01', status: 'pending', paymentMethod: 'Cash' },
    { id: 3, tenantName: 'Vikram Singh', propertyName: 'Himalaya Towers', unit: 'C-310', amount: 28000, dueDate: '2025-01-01', status: 'overdue', paymentMethod: 'Credit Card' },
    { id: 4, tenantName: 'Priya Kapoor', propertyName: 'Shivneri Apartments', unit: 'D-402', amount: 22000, dueDate: '2025-01-01', status: 'pending', paymentMethod: 'Bank Transfer' },
    { id: 5, tenantName: 'Rohit Sharma', propertyName: 'Lotus Residency', unit: 'A-101', amount: 25000, dueDate: '2025-02-01', status: 'pending' },
    { id: 6, tenantName: 'Anjali Mehta', propertyName: 'Ganga Heights', unit: 'B-205', amount: 30000, dueDate: '2025-02-01', status: 'pending' },
    { id: 7, tenantName: 'Vikram Singh', propertyName: 'Himalaya Towers', unit: 'C-310', amount: 28000, dueDate: '2025-02-01', status: 'pending' },
    { id: 8, tenantName: 'Priya Kapoor', propertyName: 'Shivneri Apartments', unit: 'D-402', amount: 22000, dueDate: '2025-02-01', status: 'pending' }
  ]);

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Property management functions
  const addProperty = (property: Omit<Property, 'id'>) => setProperties([...properties, { ...property, id: Date.now() }]);
  const editProperty = (updatedProperty: Property) => setProperties(properties.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  const deleteProperty = (id: number) => setProperties(properties.filter(p => p.id !== id));

  // Tenant management functions
  const addTenant = (tenant: Omit<Tenant, 'id'>) => setTenants([...tenants, { ...tenant, id: Date.now() }]);
  const editTenant = (updatedTenant: Tenant) => setTenants(tenants.map(t => t.id === updatedTenant.id ? updatedTenant : t));
  const deleteTenant = (id: number) => setTenants(tenants.filter(t => t.id !== id));

  // Lease management functions
  const addLease = (lease: Omit<Lease, 'id'>) => setLeases([...leases, { ...lease, id: Date.now() }]);
  const editLease = (updatedLease: Lease) => setLeases(leases.map(l => l.id === updatedLease.id ? updatedLease : l));
  const deleteLease = (id: number) => setLeases(leases.filter(l => l.id !== id));

  // Payment management functions
  const addPayment = (payment: Omit<Payment, 'id'>) => setPayments([...payments, { ...payment, id: Date.now() }]);
  const updatePayment = (updatedPayment: Payment) => setPayments(payments.map(p => p.id === updatedPayment.id ? updatedPayment : p));

  // Dashboard stats
  const dashboardStats = {
    properties: properties.length,
    tenants: tenants.filter(t => t.status === 'active').length,
    revenue: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    leases: leases.filter(l => l.status === 'active').length
  };

  if (!isAuthenticated) return <Auth onLogin={handleLogin} onSignup={handleSignup} />;

  return (
    <BrowserRouter basename="/PropertyManagementSystem/">
      <div className="app min-h-screen bg-gray-50">
        <Navbar currentView={currentView} onViewChange={setCurrentView} onLogout={handleLogout} />
        <div className="main-content">
          {currentView === 'dashboard' && <Dashboard stats={dashboardStats} />}
          {currentView === 'properties' && <Properties properties={properties} onAddProperty={addProperty} onEditProperty={editProperty} onDeleteProperty={deleteProperty} />}
          {currentView === 'tenants' && <Tenants tenants={tenants} properties={properties.map(p => ({ id: p.id, name: p.name, units: p.units }))} onAddTenant={addTenant} onEditTenant={editTenant} onDeleteTenant={deleteTenant} />}
          {currentView === 'leases' && <Leases leases={leases} tenants={tenants.map(t => ({ id: t.id, name: t.name, propertyName: t.propertyName, unit: t.unit }))} onAddLease={addLease} onEditLease={editLease} onDeleteLease={deleteLease} />}
          {currentView === 'payments' && <Payments payments={payments} tenants={tenants.map(t => ({ id: t.id, name: t.name, propertyName: t.propertyName, unit: t.unit, rent: t.rent }))} onAddPayment={addPayment} onUpdatePayment={updatePayment} />}
          {currentView === 'settings' && <Settings />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
