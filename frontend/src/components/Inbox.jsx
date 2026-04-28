import React, { useState } from 'react';
import {
  AlertTriangle, CheckCircle, Bell, Truck, Package,
  Clock, ArrowRight, CheckCheck, RefreshCw
} from 'lucide-react';
import { shipments } from './RoutesPage.jsx';
import './Inbox.css';

// Auto-generate notifications from shipment data
const generateNotifications = (shipments) => {
  const now = new Date('2026-04-28T14:00:00Z');
  const notifs = [];

  shipments.forEach((s) => {
    const eta = new Date(s.schedule?.updatedETA || s.schedule?.estimatedArrival);
    const orig = new Date(s.schedule?.estimatedArrival);

    if (s.status === 'Delayed') {
      const delayHours = Math.round((eta - orig) / 3600000);
      notifs.push({
        id: `delay-${s.id}`,
        type: 'delay',
        priority: delayHours > 12 ? 'high' : 'medium',
        title: `Shipment Delayed — ${delayHours}h behind schedule`,
        desc: `Truck ${s.tid} en route to ${s.destination.city} is delayed. Buyer: ${s.buyer.name}.`,
        shipmentId: s.id,
        route: `${s.origin.city.split(',')[0]} → ${s.destination.city.split(',')[0]}`,
        time: s.schedule?.lastUpdate ? new Date(s.schedule.lastUpdate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now',
        unread: true,
      });
    }

    if (s.status === 'Delivered') {
      notifs.push({
        id: `delivered-${s.id}`,
        type: 'success',
        priority: 'low',
        title: `Shipment Delivered Successfully`,
        desc: `${s.id} arrived at ${s.destination.city}. Buyer ${s.buyer.name} confirmed receipt.`,
        shipmentId: s.id,
        route: `${s.origin.city.split(',')[0]} → ${s.destination.city.split(',')[0]}`,
        time: s.schedule?.lastUpdate ? new Date(s.schedule.lastUpdate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently',
        unread: false,
      });
    }

    if (s.status === 'Loading') {
      notifs.push({
        id: `loading-${s.id}`,
        type: 'info',
        priority: 'low',
        title: `Shipment Loading at ${s.origin.city.split(',')[0]}`,
        desc: `${s.tid} is being loaded at ${s.origin.detail}. Expected departure: ${s.schedule ? new Date(s.schedule.departureTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'TBD'}.`,
        shipmentId: s.id,
        route: `${s.origin.city.split(',')[0]} → ${s.destination.city.split(',')[0]}`,
        time: 'Today',
        unread: true,
      });
    }

    if (s.status === 'On way') {
      const progress = Math.round(((now - new Date(s.schedule?.departureTime)) / (new Date(s.schedule?.updatedETA) - new Date(s.schedule?.departureTime))) * 100);
      if (progress > 80) {
        notifs.push({
          id: `arriving-${s.id}`,
          type: 'warning',
          priority: 'medium',
          title: `Shipment Arriving Soon`,
          desc: `${s.id} is ${Math.min(progress, 99)}% complete. Truck ${s.tid} approaching ${s.destination.city}. Prepare receiving bay.`,
          shipmentId: s.id,
          route: `${s.origin.city.split(',')[0]} → ${s.destination.city.split(',')[0]}`,
          time: s.schedule ? new Date(s.schedule.updatedETA).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Soon',
          unread: true,
        });
      }
    }
  });

  // Sort: unread first, then by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return notifs.sort((a, b) => {
    if (a.unread !== b.unread) return a.unread ? -1 : 1;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

const typeIcons = {
  delay: <AlertTriangle size={18} />,
  success: <CheckCircle size={18} />,
  warning: <Clock size={18} />,
  info: <Package size={18} />,
};

const Inbox = () => {
  const [allNotifs, setAllNotifs] = useState(() => generateNotifications(shipments));
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Delayed', 'Delivered', 'Loading', 'Arriving'];

  const filtered = allNotifs.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Delayed') return n.type === 'delay';
    if (filter === 'Delivered') return n.type === 'success';
    if (filter === 'Loading') return n.type === 'info';
    if (filter === 'Arriving') return n.type === 'warning';
    return true;
  });

  const markAllRead = () => setAllNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  const markRead = (id) => setAllNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));

  const counts = {
    delayed: allNotifs.filter(n => n.type === 'delay').length,
    delivered: allNotifs.filter(n => n.type === 'success').length,
    loading: allNotifs.filter(n => n.type === 'info').length,
    arriving: allNotifs.filter(n => n.type === 'warning').length,
    unread: allNotifs.filter(n => n.unread).length,
  };

  return (
    <div className="inbox-container">
      {/* Header */}
      <div className="inbox-header">
        <div>
          <h1 className="inbox-title">Inbox</h1>
          <p className="inbox-subtitle">{counts.unread} unread notifications across your fleet.</p>
        </div>
        <div className="inbox-actions">
          <button className="inbox-action-btn" onClick={markAllRead}>
            <CheckCheck size={14} /> Mark all read
          </button>
          <button className="inbox-action-btn" onClick={() => setAllNotifs(generateNotifications(shipments))}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="inbox-summary-cards">
        <div className="summary-card">
          <div className="summary-card-icon red"><AlertTriangle size={22} /></div>
          <div>
            <p className="summary-card-value">{counts.delayed}</p>
            <p className="summary-card-label">Delayed Shipments</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon amber"><Clock size={22} /></div>
          <div>
            <p className="summary-card-value">{counts.arriving}</p>
            <p className="summary-card-label">Arriving Soon</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon blue"><Package size={22} /></div>
          <div>
            <p className="summary-card-value">{counts.loading}</p>
            <p className="summary-card-label">Currently Loading</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon green"><CheckCircle size={22} /></div>
          <div>
            <p className="summary-card-value">{counts.delivered}</p>
            <p className="summary-card-label">Delivered</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="inbox-filters">
        {filters.map(f => (
          <button
            key={f}
            className={`inbox-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="inbox-list">
        <div className="inbox-list-header">
          <div></div>
          <div>Notification</div>
          <div>Route</div>
          <div>Time</div>
          <div>Priority</div>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
            <Bell size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p>No notifications in this category.</p>
          </div>
        )}

        {filtered.map(notif => (
          <div
            key={notif.id}
            className={`inbox-item ${notif.unread ? 'unread' : ''}`}
            onClick={() => markRead(notif.id)}
          >
            {/* Unread dot */}
            <div>{notif.unread ? <div className="unread-dot" /> : null}</div>

            {/* Content */}
            <div className="inbox-item-content">
              <div className={`notif-type-icon ${notif.type}`}>
                {typeIcons[notif.type]}
              </div>
              <div>
                <h4 className="notif-title">{notif.title}</h4>
                <p className="notif-desc">{notif.desc}</p>
                <span className="notif-shipment-id">{notif.shipmentId}</span>
              </div>
            </div>

            {/* Route */}
            <div className="notif-route">{notif.route}</div>

            {/* Time */}
            <div className="notif-time">{notif.time}</div>

            {/* Priority */}
            <div>
              <span className={`notif-priority-badge ${notif.priority}`}>
                {notif.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
