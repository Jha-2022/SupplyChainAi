import React, { useMemo } from 'react';
import {
  AreaChart, Area, PieChart, Pie, Cell, Legend,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line
} from 'recharts';
import { Package, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { shipments } from './RoutesPage.jsx';
import './Dashboard.css';

const pieData = [
  { name: 'Dry Van', value: 45, color: '#35858E' },
  { name: 'Box Truck', value: 25, color: '#f59e0b' },
  { name: 'Flat Bed', value: 20, color: '#8b5cf6' },
  { name: 'Delivery Van', value: 10, color: '#ec4899' },
];

const chartData = [
  { name: 'Mon', volume: 4000 },
  { name: 'Tue', volume: 3000 },
  { name: 'Wed', volume: 2000 },
  { name: 'Thu', volume: 2780 },
  { name: 'Fri', volume: 1890 },
  { name: 'Sat', volume: 2390 },
  { name: 'Sun', volume: 3490 },
];

const regionData = [
  { region: 'Asia', onTime: 84, delayed: 12, loading: 18 },
  { region: 'Europe', onTime: 72, delayed: 8, loading: 14 },
  { region: 'N. America', onTime: 65, delayed: 14, loading: 10 },
  { region: 'M. East', onTime: 48, delayed: 9, loading: 6 },
  { region: 'S. America', onTime: 31, delayed: 7, loading: 5 },
  { region: 'Oceania', onTime: 22, delayed: 3, loading: 4 },
];

const onTimeData = [
  { month: 'Nov', rate: 88 },
  { month: 'Dec', rate: 85 },
  { month: 'Jan', rate: 79 },
  { month: 'Feb', rate: 83 },
  { month: 'Mar', rate: 90 },
  { month: 'Apr', rate: 94 },
];

const costData = [
  { week: 'W1', air: 12400, sea: 4200, road: 6100 },
  { week: 'W2', air: 10200, sea: 5100, road: 7800 },
  { week: 'W3', air: 14800, sea: 3900, road: 5200 },
  { week: 'W4', air: 9600, sea: 6600, road: 8400 },
];

const tooltipStyle = { borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' };

const typeColors = {
  'Dry Van': '#35858E',
  'Box Truck': '#f59e0b',
  'Flat Bed': '#8b5cf6',
  'Flat bed': '#8b5cf6',
  'Van': '#ec4899',
};

const Dashboard = () => {

  // --- Compute Fleet Charts from live shipments data ---
  const fleetTypeCount = useMemo(() => {
    const counts = {};
    shipments.forEach(s => {
      const t = s.type === 'Flat bed' ? 'Flat Bed' : s.type;
      counts[t] = (counts[t] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      color: typeColors[name] || '#94a3b8'
    }));
  }, []);

  const avgWeightByType = useMemo(() => {
    const sums = {}, cnts = {};
    shipments.forEach(s => {
      const t = s.type === 'Flat bed' ? 'Flat Bed' : s.type;
      const kg = parseFloat(s.Weight.replace(/[^0-9.]/g, ''));
      sums[t] = (sums[t] || 0) + kg;
      cnts[t] = (cnts[t] || 0) + 1;
    });
    return Object.entries(sums).map(([type, total]) => ({
      type,
      avgWeight: Math.round(total / cnts[type]),
      color: typeColors[type] || '#94a3b8'
    })).sort((a, b) => b.avgWeight - a.avgWeight);
  }, []);

  const avgSpaceByType = useMemo(() => {
    const sums = {}, cnts = {};
    shipments.forEach(s => {
      const t = s.type === 'Flat bed' ? 'Flat Bed' : s.type;
      const pct = parseFloat(s.Space.replace('%', ''));
      sums[t] = (sums[t] || 0) + pct;
      cnts[t] = (cnts[t] || 0) + 1;
    });
    return Object.entries(sums).map(([type, total]) => ({
      type,
      avgSpace: parseFloat((total / cnts[type]).toFixed(1)),
      color: typeColors[type] || '#94a3b8'
    })).sort((a, b) => b.avgSpace - a.avgSpace);
  }, []);

  const topBuyers = useMemo(() => {
    const counts = {};
    shipments.forEach(s => {
      const name = s.buyer.name;
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([buyer, count]) => ({ buyer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, []);

  const shipmentsByCountry = useMemo(() => {
    const counts = {};
    const countryNames = {
      'EST': 'Estonia', 'UAE': 'UAE', 'ESP': 'Spain', 'USA': 'USA',
      'MEX': 'Mexico', 'FRA': 'France', 'ITA': 'Italy', 'GBR': 'UK',
      'VNM': 'Vietnam', 'CZE': 'Czech Rep.', 'AUS': 'Australia',
      'BRA': 'Brazil', 'CAN': 'Canada', 'SAU': 'Saudi Arabia',
      'DEU': 'Germany', 'BGR': 'Bulgaria', 'CHE': 'Switzerland',
      'CHN': 'China', 'IND': 'India'
    };
    shipments.forEach(s => {
      const parts = s.destination.city.split(', ');
      const code = parts[parts.length - 1];
      const label = countryNames[code] || code;
      counts[label] = (counts[label] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Supply Chain Overview</h1>
      </div>

      {/* KPI Section */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Total Active Shipments</span>
            <div className="kpi-icon"><Package size={18} /></div>
          </div>
          <h2 className="kpi-value">1,284</h2>
          <span className="kpi-trend positive"><TrendingUp size={14} /> +12.5% from last week</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Delayed Orders</span>
            <div className="kpi-icon" style={{ background: '#fde8e8', color: '#ef4444' }}><AlertTriangle size={18} /></div>
          </div>
          <h2 className="kpi-value">24</h2>
          <span className="kpi-trend negative"><TrendingUp size={14} style={{ transform: 'scaleY(-1)' }} /> +4.2% from last week</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Avg. Delivery Time</span>
            <div className="kpi-icon" style={{ background: '#fdf6b2', color: '#c27803' }}><Clock size={18} /></div>
          </div>
          <h2 className="kpi-value">3.2 Days</h2>
          <span className="kpi-trend positive"><TrendingUp size={14} style={{ transform: 'scaleY(-1)' }} /> -0.4 days improvement</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Fleet Efficiency Score</span>
            <div className="kpi-icon" style={{ background: '#def7ec', color: '#057a55' }}><TrendingUp size={18} /></div>
          </div>
          <h2 className="kpi-value">94%</h2>
          <span className="kpi-trend positive"><TrendingUp size={14} /> Top 5% industry average</span>
        </div>
      </div>

      {/* Row 1: Area Chart + Pie */}
      <div className="charts-row">
        <div className="chart-card">
          <h3 className="chart-title">Freight Volume Over Time (TEU)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#35858E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#35858E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="volume" stroke="#35858E" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Fleet Composition</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Stacked Bar + Line Chart */}
      <div className="charts-row">
        <div className="chart-card">
          <h3 className="chart-title">Shipments by Region</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="region" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="onTime" name="On Time" stackId="a" fill="#35858E" />
                <Bar dataKey="delayed" name="Delayed" stackId="a" fill="#ef4444" />
                <Bar dataKey="loading" name="Loading" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">On-Time Delivery Rate (%)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={onTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="rate" name="On-Time %" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Fleet Composition Charts */}
      <div className="charts-row">
        {/* Chart 3A: Trucks by Type — Donut */}
        <div className="chart-card">
          <h3 className="chart-title">Trucks by Type</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fleetTypeCount} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="count">
                  {fleetTypeCount.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v} trucks`, n]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3B: Avg Weight by Truck Type — Horizontal Bar */}
        <div className="chart-card">
          <h3 className="chart-title">Avg Weight by Truck Type (kg)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={avgWeightByType} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="type" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} width={60} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v.toLocaleString()} kg`, 'Avg Weight']} />
                <Bar dataKey="avgWeight" name="Avg Weight" radius={[0, 6, 6, 0]}>
                  {avgWeightByType.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Avg Space Utilization — full width */}
      <div className="chart-card chart-card-full">
        <h3 className="chart-title">Avg Space Utilization by Truck Type (%)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={avgSpaceByType} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="type" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v.toFixed(1)}%`, 'Avg Space Used']} />
              <Bar dataKey="avgSpace" name="Avg Utilization" radius={[6, 6, 0, 0]}>
                {avgSpaceByType.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Row 5 & 6: Top Buyers + Destination Country side by side */}
      <div className="charts-row">

        <div className="chart-card">
          <h3 className="chart-title">Top Buyers by Shipment Count</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBuyers} layout="vertical" margin={{ top: 5, right: 40, left: 120, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="buyer" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} width={115} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} shipment${v > 1 ? 's' : ''}`, 'Orders']} />
                <Bar dataKey="count" name="Shipments" fill="#35858E" radius={[0, 6, 6, 0]} barSize={18}>
                  {topBuyers.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? '#0f4f55' : i === 1 ? '#35858E' : i === 2 ? '#5ba8b0' : '#99cdd1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Shipments by Destination Country</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shipmentsByCountry} layout="vertical" margin={{ top: 5, right: 40, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="country" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} width={95} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} shipment${v > 1 ? 's' : ''}`, 'Incoming']} />
                <Bar dataKey="count" name="Shipments" radius={[0, 6, 6, 0]} barSize={16}>
                  {shipmentsByCountry.map((_, i) => (
                    <Cell key={i} fill={`hsl(${184 + i * 15}, ${70 - i * 3}%, ${35 + i * 4}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
