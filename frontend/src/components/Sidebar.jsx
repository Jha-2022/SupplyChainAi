import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, Map, Inbox, Calendar, Flame, ArrowRight } from 'lucide-react';
import './Sidebar.css';
import { shipments } from './RoutesPage.jsx';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shipments.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentShipment = shipments[currentIndex];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'routes', label: 'Routes', icon: Map },
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo-container">
        <h1 className="company-logo">Aero<span>Freight</span></h1>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li 
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="icon"><Icon size={20} /></span>
                {item.label}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* New Widgets Section */}
      <div className="sidebar-widgets">
        <div className="widget-card today-card">
          <div className="today-content">
            <span className="today-label">
              <span className="today-dot" style={{ backgroundColor: currentShipment.status === 'Delayed' ? '#ef4444' : (currentShipment.status === 'Loading' ? '#f59e0b' : '#059669') }}></span>
              {currentShipment.status}
            </span>
            <h2 className="today-value" style={{ fontSize: '18px', margin: '4px 0' }}>{currentShipment.tid}</h2>
            <span className="today-sub">{currentShipment.type}</span>
          </div>
          <div className="today-image-wrapper">
            <img src={currentShipment.image} alt="Truck" className="today-truck-img" />
          </div>
        </div>

        <div className="widget-card notif-card">
          <div className="notif-header">
            <div className="notif-icon-wrapper">
              <Flame size={14} color="#4f46e5" />
            </div>
            <span className="notif-text">Update: {currentShipment.origin.city.split(',')[0]} → {currentShipment.destination.city.split(',')[0]}</span>
          </div>
          <a href="#" className="notif-link" onClick={(e) => { e.preventDefault(); setActiveTab('schedule'); }}>
            Details <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
