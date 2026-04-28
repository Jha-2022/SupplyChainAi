import React, { useState } from 'react';
import { X } from 'lucide-react';
import './AddOrderModal.css';

const AddOrderModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: '',
    tid: '',
    type: 'Dry Van',
    Weight: '',
    status: 'Loading',
    pallets: '',
    Space: '',
    Volume: '',
    originCity: '',
    originDetail: '',
    destCity: '',
    destDetail: '',
    buyerName: '',
    buyerDetail: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Map vehicle type to image
    let image = '/DryVan.png';
    if (formData.type === 'Van') image = '/delivaryVan.jpg';
    if (formData.type === 'Flat Bed') image = '/flatbed.png';
    if (formData.type === 'Box Truck') image = '/BoxTruck.png';

    const newShipment = {
      id: formData.id || `TR-${Math.floor(Math.random() * 10000)}`,
      tid: formData.tid,
      image,
      Weight: formData.Weight + (formData.Weight.includes('kg') ? '' : ' kg'),
      status: formData.status,
      pallets: parseInt(formData.pallets) || 0,
      Space: formData.Space + (formData.Space.includes('%') ? '' : '%'),
      Volume: formData.Volume + (formData.Volume.includes('m³') ? '' : ' m³'),
      origin: { city: formData.originCity, detail: formData.originDetail },
      destination: { city: formData.destCity, detail: formData.destDetail },
      buyer: { name: formData.buyerName, detail: formData.buyerDetail },
      type: formData.type
    };

    onAdd(newShipment);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Shipment</h2>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Shipment ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="e.g. TR-882910QM" required />
            </div>
            <div className="form-group">
              <label>Truck ID / License</label>
              <input type="text" name="tid" value={formData.tid} onChange={handleChange} placeholder="e.g. 粤B·55291" required />
            </div>
            
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Dry Van">Dry Van</option>
                <option value="Box Truck">Box Truck</option>
                <option value="Flat Bed">Flat Bed</option>
                <option value="Van">Delivery Van</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Loading">Loading</option>
                <option value="On way">On way</option>
                <option value="Delayed">Delayed</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="text" name="Weight" value={formData.Weight} onChange={handleChange} placeholder="e.g. 31,400" required />
            </div>
            <div className="form-group">
              <label>Pallets</label>
              <input type="number" name="pallets" value={formData.pallets} onChange={handleChange} placeholder="e.g. 38" required />
            </div>

            <div className="form-group">
              <label>Used Space (%)</label>
              <input type="text" name="Space" value={formData.Space} onChange={handleChange} placeholder="e.g. 78" required />
            </div>
            <div className="form-group">
              <label>Volume (m³)</label>
              <input type="text" name="Volume" value={formData.Volume} onChange={handleChange} placeholder="e.g. 102" required />
            </div>

            <div className="form-group">
              <label>Origin City</label>
              <input type="text" name="originCity" value={formData.originCity} onChange={handleChange} placeholder="e.g. Shenzhen, CHN" required />
            </div>
            <div className="form-group">
              <label>Origin Detail</label>
              <input type="text" name="originDetail" value={formData.originDetail} onChange={handleChange} placeholder="e.g. Yantian Terminal" required />
            </div>

            <div className="form-group">
              <label>Destination City</label>
              <input type="text" name="destCity" value={formData.destCity} onChange={handleChange} placeholder="e.g. Hanoi, VNM" required />
            </div>
            <div className="form-group">
              <label>Destination Detail</label>
              <input type="text" name="destDetail" value={formData.destDetail} onChange={handleChange} placeholder="e.g. Noi Bai Logistics Zone" required />
            </div>

            <div className="form-group">
              <label>Buyer Name</label>
              <input type="text" name="buyerName" value={formData.buyerName} onChange={handleChange} placeholder="e.g. Chen Wei" required />
            </div>
            <div className="form-group">
              <label>Buyer Company</label>
              <input type="text" name="buyerDetail" value={formData.buyerDetail} onChange={handleChange} placeholder="e.g. Pacific Electronics" required />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Add Shipment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
