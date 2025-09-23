import React from 'react';
import { Building2, Users, IndianRupee, FileText, TrendingUp } from 'lucide-react';

interface DashboardProps {
  stats: {
    properties: number;
    tenants: number;
    revenue: number;
    leases: number;
  };
}

export function Dashboard({ stats }: DashboardProps) {
  const cards = [
    { title: 'Total Properties', value: stats.properties, icon: Building2, color: 'bg-orange-100 text-orange-600' },
    { title: 'Active Tenants', value: stats.tenants, icon: Users, color: 'bg-amber-100 text-amber-600' },
    { title: 'Monthly Revenue', value: `${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Active Leases', value: stats.leases, icon: FileText, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="dashboard p-6">
      <div className="dashboard-header mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your property overview.</p>
      </div>

      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="stat-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`icon-container ${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="recent-activity bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="activity-list space-y-3">
            <div className="activity-item flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-700">New lease agreement signed for Property #101</span>
            </div>
            <div className="activity-item flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
              <IndianRupee className="h-5 w-5 text-amber-600" />
              <span className="text-sm text-gray-700">Payment received from John Smith - 1,200</span>
            </div>
            <div className="activity-item flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Building2 className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-gray-700">New property added: Sunset Apartments</span>
            </div>
          </div>
        </div>

        <div className="quick-stats bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="progress-section space-y-4">
            <div className="stat-item">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Occupancy Rate</span>
                <span className="text-sm font-medium text-gray-800">85%</span>
              </div>
              <div className="progress-bar bg-gray-200 rounded-full h-2">
                <div className="progress-fill bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="stat-item">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Payment Collection</span>
                <span className="text-sm font-medium text-gray-800">92%</span>
              </div>
              <div className="progress-bar bg-gray-200 rounded-full h-2">
                <div className="progress-fill bg-amber-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="stat-item">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Maintenance Requests</span>
                <span className="text-sm font-medium text-gray-800">12 Open</span>
              </div>
              <div className="progress-bar bg-gray-200 rounded-full h-2">
                <div className="progress-fill bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}