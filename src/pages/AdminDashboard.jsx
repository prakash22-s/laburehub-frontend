import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Briefcase, TrendingUp, DollarSign, UserCheck, UserX, 
  Clock, AlertCircle, CheckCircle2, Search, Filter, BarChart3, 
  Activity, MapPin, Star, PhoneCall, Calendar, ShieldCheck 
} from 'lucide-react';
// Recharts for functional analytics
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Data from provided GitHub source
const statsData = {
  totalWorkers: 1247,
  activeWorkers: 892,
  totalCustomers: 3456,
  activeCustomers: 2103,
  revenue: 2456780,
  growth: 23.5
};

const bookingTrends = [
  { month: 'Jan', bookings: 520, revenue: 156000 },
  { month: 'Feb', bookings: 680, revenue: 198000 },
  { month: 'Mar', bookings: 750, revenue: 225000 },
  { month: 'Apr', bookings: 820, revenue: 246000 },
  { month: 'May', bookings: 890, revenue: 267000 },
  { month: 'Jun', bookings: 940, revenue: 282000 }
];

const categoryDistribution = [
  { name: 'Electrician', value: 234, color: '#3b82f6' },
  { name: 'Plumber', value: 189, color: '#10b981' },
  { name: 'Carpenter', value: 156, color: '#f59e0b' },
  { name: 'Painter', value: 178, color: '#8b5cf6' },
  { name: 'Construction', value: 443, color: '#ef4444' }
];

const pendingVerifications = [
  { id: '1', name: 'Ramesh Patel', category: 'Electrician', location: 'Mumbai', phone: '+91 98765 43211', date: '2025-12-30' },
  { id: '2', name: 'Sandeep Kumar', category: 'Plumber', location: 'Delhi', phone: '+91 98765 43212', date: '2025-12-29' }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Platform Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">LabourHub Admin</h1>
            <p className="text-gray-500 font-medium">Platform performance & management overview</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
              <ShieldCheck size={16} /> Server Status: Online
            </div>
            <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition shadow-sm">
              <Calendar size={16} /> Last 30 Days
            </button>
          </div>
        </div>

        {/* Dynamic Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Workers" value={statsData.totalWorkers} subValue={`${statsData.activeWorkers} active`} icon={<Users />} color="bg-blue-600" />
          <StatCard label="Total Customers" value={statsData.totalCustomers} subValue={`${statsData.activeCustomers} active`} icon={<UserCheck />} color="bg-purple-600" />
          <StatCard label="Revenue" value={`₹${(statsData.revenue / 1000).toFixed(0)}K`} subValue={`+${statsData.growth}% Growth`} icon={<DollarSign />} color="bg-emerald-600" />
          <StatCard label="Pending" value={pendingVerifications.length} subValue="Applications" icon={<AlertCircle />} color="bg-orange-500" />
        </div>

        {/* Interactive Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mt-8">
          {['overview', 'workers', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Trend Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Booking & Revenue Trend</h3>
                <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Bookings</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Revenue</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Service Distribution Pie Chart */}
            <div className="bg-white p-6 rounded-3xl border shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-gray-800 text-center">Service Categories</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryDistribution} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                      {categoryDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Verification Table */}
            <div className="lg:col-span-3 bg-white rounded-3xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center bg-white">
                <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                  <CheckCircle2 className="text-blue-600" /> Worker Verification Queue
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input className="pl-10 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 w-64" placeholder="Search worker profile..." />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="p-6">Worker Profile</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Location</th>
                      <th className="p-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {pendingVerifications.map((worker) => (
                      <tr key={worker.id} className="hover:bg-gray-50/50 transition">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">{worker.name[0]}</div>
                            <div><p className="font-bold text-gray-900">{worker.name}</p><p className="text-xs text-gray-500">ID: #{worker.id}00{worker.id}</p></div>
                          </div>
                        </td>
                        <td className="p-6 text-gray-700 font-medium">{worker.category}</td>
                        <td className="p-6 text-gray-500 flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {worker.location}</td>
                        <td className="p-6">
                          <div className="flex justify-center gap-2">
                            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition shadow-sm">Approve</button>
                            <button className="bg-red-50 text-red-600 px-5 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition">Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Stat Card
const StatCard = ({ label, value, subValue, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-5 hover:shadow-md transition cursor-default">
    <div className={`p-4 rounded-2xl text-white ${color} shadow-lg shadow-${color.split('-')[1]}-200`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 leading-none">{value.toLocaleString()}</p>
      <p className="text-[10px] font-bold text-emerald-600 mt-2 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">{subValue}</p>
    </div>
  </div>
);