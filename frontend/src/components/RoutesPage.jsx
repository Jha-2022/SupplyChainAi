import React, { useState, useEffect } from 'react';
import { Plus, Phone, Mail, MapPin, Truck, ChevronDown, FileText } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import AddOrderModal from './AddOrderModal';
import './RoutesPage.css';

const cityCoordinates = {
  'Athens, GRC': { lat: 37.9838, lng: 23.7275 },
  'Tallinn, EST': { lat: 59.4370, lng: 24.7536 },
  'Yingkou, CHN': { lat: 40.6667, lng: 122.2333 },
  'Abu Dhabi, UAE': { lat: 24.4539, lng: 54.3773 },
  'Huelva, ESP': { lat: 37.2614, lng: -6.9447 },
  'Malaga, ESP': { lat: 36.7213, lng: -4.4214 },
  'Boston, USA': { lat: 42.3601, lng: -71.0589 },
  'Mecum Technologies': { lat: 42.3601, lng: -71.78 },
  'Rotterdam, NLD': { lat: 51.9244, lng: 4.4777 },
  'Berlin, DEU': { lat: 52.5200, lng: 13.4050 },
  'Houston, USA': { lat: 29.7604, lng: -95.3698 },
  'Monterrey, MEX': { lat: 25.6866, lng: -100.3161 },
  'Lyon, FRA': { lat: 45.7640, lng: 4.8357 },
  'Milan, ITA': { lat: 45.4642, lng: 9.1900 },
  'London, GBR': { lat: 51.5074, lng: -0.1278 },
  'Manchester, GBR': { lat: 53.4808, lng: -2.2426 },
  'Shenzhen, CHN': { lat: 22.5431, lng: 114.0579 },
  'Hanoi, VNM': { lat: 21.0285, lng: 105.8542 },
  'Hamburg, DEU': { lat: 53.5511, lng: 9.9937 },
  'Prague, CZE': { lat: 50.0755, lng: 14.4378 },
  'Newark, USA': { lat: 40.7357, lng: -74.1724 },
  'Philadelphia, USA': { lat: 39.9526, lng: -75.1652 },
  'Bangalore, IND': { lat: 12.9716, lng: 77.5946 },
  'Mysore, IND': { lat: 12.2958, lng: 76.6394 },
  'Veracruz, MEX': { lat: 19.1738, lng: -96.1342 },
  'Laredo, USA': { lat: 27.5064, lng: -99.5075 },
  'Montreal, CAN': { lat: 45.5017, lng: -73.5673 },
  'Toronto, CAN': { lat: 43.6532, lng: -79.3832 },
  'Dubai, UAE': { lat: 25.2048, lng: 55.2708 },
  'Riyadh, SAU': { lat: 24.7136, lng: 46.6753 },
  'Sydney, AUS': { lat: -33.8688, lng: 151.2093 },
  'Canberra, AUS': { lat: -35.2809, lng: 149.1300 },
  'Santos, BRA': { lat: -23.9618, lng: -46.3322 },
  'Sao Paulo, BRA': { lat: -23.5505, lng: -46.6333 },
  'Valencia, ESP': { lat: 39.4699, lng: -0.3774 },
  'Madrid, ESP': { lat: 40.4168, lng: -3.7038 },
  'Marseille, FRA': { lat: 43.2965, lng: 5.3698 },
  'Geneva, CHE': { lat: 46.2044, lng: 6.1432 },
  'Birmingham, GBR': { lat: 52.4862, lng: -1.8904 },
  'Istanbul, TUR': { lat: 41.0082, lng: 28.9784 },
  'Sofia, BGR': { lat: 42.6977, lng: 23.3219 },
};

const getLatLng = (cityString) => {
  return cityCoordinates[cityString] || { lat: 0, lng: 0 };
};

export const shipments = [
  {
    id: 'UA-1450098S',
    tid: 'ZKN-4921',
    image: '/BoxTruck.png',
    Weight: '10,200 kg',
    status: 'On way',
    pallets: 12,
    Space: '65%',
    Volume: '38 m³',
    origin: { city: 'Athens, GRC', detail: 'Piraeus Harbour' },
    destination: { city: 'Tallinn, EST', detail: 'Hektor Container Hotel' },
    buyer: { name: 'Milton Hines', detail: 'Fort Worth' },
    type: 'Box Truck'
  },
  {
    id: 'MK-549893XC',
    tid: '辽H·8B729',
    image: '/DryVan.png',
    Weight: '34,200 kg',
    status: 'Loading',
    pallets: 44,
    Space: '85%',
    Volume: '112 m³',
    origin: { city: 'Yingkou, CHN', detail: 'Bayuquan District Yingkou' },
    destination: { city: 'Abu Dhabi, UAE', detail: 'Mina St - Zayed Port' },
    buyer: { name: 'Gary Muncy', detail: 'Leonard Krower & Sons' },
    type: 'Dry Van'
  },
  {
    id: 'DA-549893XC',
    tid: 'MA-7304-CS',
    image: '/flatbed.png',
    Weight: '18,500 kg',
    status: 'Delayed',
    pallets: 14,
    Space: '65%',
    Volume: '45 m³',
    origin: { city: 'Huelva, ESP', detail: 'Port of Huelva' },
    destination: { city: 'Malaga, ESP', detail: 'Puerto de Malaga' },
    buyer: { name: 'Robert Williams', detail: 'LTD Industries' },
    type: 'Flat bed'
  },
  {
    id: 'PL-549893GH',
    tid: '8S-52907',
    image: '/delivaryVan.jpg',
    Weight: '4,800 kg',
    status: 'On way',
    pallets: 6,
    Space: '75%',
    Volume: '14 m³',
    origin: { city: 'Boston, USA', detail: '27 Drydock Boston' },
    destination: { city: 'Mecum Technologies', detail: '65 Hartwell St, West Boylston' },
    buyer: { name: 'Vernon Bueno', detail: 'Luria\'s' },
    type: 'Van'
  },

  {
    id: 'RF-992031LP',
    tid: 'CA-442-TR',
    image: '/DryVan.png',
    Weight: '26,400 kg',
    status: 'On way',
    pallets: 22,
    Space: '70%',
    Volume: '82 m³',
    origin: { city: 'Rotterdam, NLD', detail: 'Maasvlakte Terminal' },
    destination: { city: 'Berlin, DEU', detail: 'Wes Westpoint' },
    buyer: { name: 'Sonia Varma', detail: 'Global Cold Chain' },
    type: 'Dry Van'
  },
  {
    id: 'ST-112345BT',
    tid: 'TX-9088-K',
    image: '/flatbed.png',
    Weight: '22,100 kg',
    status: 'Delayed',
    pallets: 18,
    Space: '90%',
    Volume: '60 m³',
    origin: { city: 'Houston, USA', detail: 'Port of Houston Authority' },
    destination: { city: 'Monterrey, MEX', detail: 'Industrial Park Santa Maria' },
    buyer: { name: 'Jorge Ortiz', detail: 'Steel Solutions' },
    type: 'Flat Bed'
  },
  {
    id: 'CV-667821MN',
    tid: 'FR-22-XB9',
    image: '/BoxTruck.png',
    Weight: '15,800 kg',
    status: 'On way',
    pallets: 26,
    Space: '80%',
    Volume: '94 m³',
    origin: { city: 'Lyon, FRA', detail: 'Port Edouard Herriot' },
    destination: { city: 'Milan, ITA', detail: 'Segrate Logistics Center' },
    buyer: { name: 'Elena Rossi', detail: 'Euro Distribution Co.' },
    type: 'Box Truck'
  },
  {
    id: 'LV-334510ZH',
    tid: 'UK-77-PDQ',
    image: '/delivaryVan.jpg',
    Weight: '3,200 kg',
    status: 'Delayed',
    pallets: 3,
    Space: '45%',
    Volume: '19 m³',
    origin: { city: 'London, GBR', detail: 'Tilbury Docks' },
    destination: { city: 'Manchester, GBR', detail: 'Trafford Park' },
    buyer: { name: 'Liam Hughes', detail: 'FastTrack Courier Ltd.' },
    type: 'Van'
  },
  {
    id: 'TR-882910QM',
    tid: '粤B·55291',
    image: '/DryVan.png',
    Weight: '31,400 kg',
    status: 'On way',
    pallets: 38,
    Space: '78%',
    Volume: '102 m³',
    origin: { city: 'Shenzhen, CHN', detail: 'Yantian Terminal' },
    destination: { city: 'Hanoi, VNM', detail: 'Noi Bai Logistics Zone' },
    buyer: { name: 'Chen Wei', detail: 'Pacific Electronics' },
    type: 'Dry Van'
  },
  {
    id: 'FB-445092WE',
    tid: 'DE-99-A21',
    image: '/flatbed.png',
    Weight: '21,200 kg',
    status: 'Loading',
    pallets: 16,
    Space: '70%',
    Volume: '48 m³',
    origin: { city: 'Hamburg, DEU', detail: 'Altenwerder Quay' },
    destination: { city: 'Prague, CZE', detail: 'Metrans Hub' },
    buyer: { name: 'Klaus Fischer', detail: 'Bauen Group' },
    type: 'Flat Bed'
  },
  {
    id: 'BT-332109XG',
    tid: 'NY-5022-L',
    image: '/BoxTruck.png',
    Weight: '9,800 kg',
    status: 'On way',
    pallets: 10,
    Space: '55%',
    Volume: '32 m³',
    origin: { city: 'Newark, USA', detail: 'Port Newark' },
    destination: { city: 'Philadelphia, USA', detail: 'Old City Depot' },
    buyer: { name: 'Sarah Jenkins', detail: 'Retail Direct' },
    type: 'Box Truck'
  },
  {
    id: 'VN-110022MK',
    tid: 'KA-01-MJ-45',
    image: '/delivaryVan.jpg',
    Weight: '3,900 kg',
    status: 'Loading',
    pallets: 4,
    Space: '60%',
    Volume: '11 m³',
    origin: { city: 'Bangalore, IND', detail: 'Peenya Industrial Area' },
    destination: { city: 'Mysore, IND', detail: 'Hebbal Electronics City' },
    buyer: { name: 'Rohan Gupta', detail: 'QuickShip India' },
    type: 'Van'
  },
  {
    id: 'DV-774930PL',
    tid: 'MEX-8832-S',
    image: '/DryVan.png',
    Weight: '33,900 kg',
    status: 'Delayed',
    pallets: 42,
    Space: '92%',
    Volume: '121 m³',
    origin: { city: 'Veracruz, MEX', detail: 'Terminal de Contenedores' },
    destination: { city: 'Laredo, USA', detail: 'World Trade Bridge' },
    buyer: { name: 'Mateo Hernandez', detail: 'Logistica Norte' },
    type: 'Dry Van'
  },
  {
    id: 'FB-552011KL',
    tid: 'QC-1190-Z',
    image: '/flatbed.png',
    Weight: '24,500 kg',
    status: 'On way',
    pallets: 20,
    Space: '85%',
    Volume: '58 m³',
    origin: { city: 'Montreal, CAN', detail: 'Port of Montreal' },
    destination: { city: 'Toronto, CAN', detail: 'Vaughan Intermodal' },
    buyer: { name: 'David Miller', detail: 'Maple Leaf Steel' },
    type: 'Flat Bed'
  },
  {
    id: 'BT-990443RN',
    tid: 'AB-221-XY',
    image: '/BoxTruck.png',
    Weight: '12,400 kg',
    status: 'Delayed',
    pallets: 14,
    Space: '80%',
    Volume: '46 m³',
    origin: { city: 'Dubai, UAE', detail: 'Jebel Ali Port' },
    destination: { city: 'Riyadh, SAU', detail: 'Dry Port Riyadh' },
    buyer: { name: 'Omar Al-Farsi', detail: 'Desert Logistics' },
    type: 'Box Truck'
  },
  {
    id: 'VN-223409JH',
    tid: '77-BND-4',
    image: '/delivaryVan.jpg',
    Weight: '5,100 kg',
    status: 'Delivered',
    pallets: 7,
    Space: '90%',
    Volume: '16 m³',
    origin: { city: 'Sydney, AUS', detail: 'Botany Bay' },
    destination: { city: 'Canberra, AUS', detail: 'Fyshwick Hub' },
    buyer: { name: 'James Cook', detail: 'OzExpress' },
    type: 'Van'
  },
  {
    id: 'DV-665511OA',
    tid: 'BR-882-MK',
    image: '/DryVan.png',
    Weight: '28,100 kg',
    status: 'Delayed',
    pallets: 32,
    Space: '68%',
    Volume: '89 m³',
    origin: { city: 'Santos, BRA', detail: 'Port of Santos' },
    destination: { city: 'Sao Paulo, BRA', detail: 'Lapa Logistics Park' },
    buyer: { name: 'Lucas Silva', detail: 'Amazonia Corp' },
    type: 'Dry Van'
  },
  {
    id: 'FB-110099WE',
    tid: 'ES-440-GG',
    image: '/flatbed.png',
    Weight: '19,300 kg',
    status: 'Delivered',
    pallets: 12,
    Space: '50%',
    Volume: '34 m³',
    origin: { city: 'Valencia, ESP', detail: 'Port of Valencia' },
    destination: { city: 'Madrid, ESP', detail: 'Coslada Transport Centre' },
    buyer: { name: 'Carlos Ruiz', detail: 'Iberia Infra' },
    type: 'Flat Bed'
  },
  {
    id: 'BT-887722PP',
    tid: 'FR-993-LL',
    image: '/BoxTruck.png',
    Weight: '11,100 kg',
    status: 'Delivered',
    pallets: 13,
    Space: '72%',
    Volume: '41 m³',
    origin: { city: 'Marseille, FRA', detail: 'Grand Port Maritime' },
    destination: { city: 'Geneva, CHE', detail: 'Cointrin Cargo' },
    buyer: { name: 'Marc Dupont', detail: 'Alpine Goods' },
    type: 'Box Truck'
  },
  {
    id: 'VN-554433GH',
    tid: 'UK-00-ZZA',
    image: '/delivaryVan.jpg',
    Weight: '3,100 kg',
    status: 'Loading',
    pallets: 3,
    Space: '40%',
    Volume: '8 m³',
    origin: { city: 'Birmingham, GBR', detail: 'Hams Hall Intermodal' },
    destination: { city: 'London, GBR', detail: 'Park Royal' },
    buyer: { name: 'Alice Smith', detail: 'City Parcel Ltd' },
    type: 'Van'
  },
  
  {
    id: 'DV-990011ZX',
    tid: 'TK-44-RPT',
    image: '/DryVan.png',
    Weight: '32,800 kg',
    status: 'On way',
    pallets: 40,
    Space: '82%',
    Volume: '108 m³',
    origin: { city: 'Istanbul, TUR', detail: 'Ambarli Port' },
    destination: { city: 'Sofia, BGR', detail: 'Elin Pelin Logistics Hub' },
    buyer: { name: 'Dimitri Ivanov', detail: 'Balkan Trade Co.' },
    type: 'Dry Van'
  }
];

const getStatusClass = (status) => {
  if (!status) return '';
  return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
};

const RoutesPage = () => {
  const [shipmentsData, setShipmentsData] = useState(shipments);
  const [selectedShipment, setSelectedShipment] = useState(shipments[0]);
  const [filter, setFilter] = useState('all');
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/config/maps')
      .then(res => res.json())
      .then(data => {
        setGoogleMapsApiKey(data.apiKey || '');
      })
      .catch(err => {
        console.error('Failed to fetch maps API key:', err);
        setGoogleMapsApiKey('');
      });
  }, []);

  const filteredShipments = shipmentsData.filter(shipment => {
    if (filter === 'all') return true;
    if (filter === 'active') return shipment.status === 'On way';
    if (filter === 'delivered') return shipment.status === 'Delivered';
    return true;
  });

  const handleAddShipment = (newShipment) => {
    setShipmentsData([newShipment, ...shipmentsData]);
  };

  return (
    <div className="routes-container">
      <AddOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddShipment} 
      />
      {/* Left Panel - List */}
      <div className="left-panel">
        <div className="page-header">
          <h1 className="page-title">Shipment Management</h1>
          <button className="add-order-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Add order
          </button>
        </div>

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            View all <span className="badge">{shipmentsData.length}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active <span className="badge">{shipmentsData.filter((shipment) => shipment.status === 'On way').length}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
            onClick={() => setFilter('delivered')}
          >
            Delivered <span className="badge">{shipmentsData.filter((shipment) => shipment.status === 'Delivered').length}</span>
          </button>
        </div>

        <div className="shipments-grid">
          {filteredShipments.map((shipment) => (
            <div 
              key={shipment.id} 
              className={`shipment-card ${selectedShipment.id === shipment.id ? 'selected' : ''}`}
              onClick={() => setSelectedShipment(shipment)}
            >
              <div className="card-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <span className="card-label">Shipment number</span>
                    <h3 className="shipment-number">{shipment.id}</h3>
                    <span className="card-label" style={{ marginTop: '4px' }}>Truck number</span>
                    <h4 className="truck-number">{shipment.tid}</h4>
                  </div>
                  {/* {shipment.status && (
                    <div className={`status-badge ${getStatusClass(shipment.status)}`}>
                      <div className="status-dot"></div>
                      {shipment.status}
                    </div>
                  )} */}
                </div>
                {shipment.image && (
                  <img src={shipment.image} alt="Vehicle" style={{ width:'40%', height: 'auto', objectFit: 'contain' }} />
                )}
              </div>

              <div className="route-points">
                <div className="point">
                  <div className="point-icon"><MapPin size={14} /></div>
                  <div className="point-details">
                    <h4>{shipment.origin.city}</h4>
                    <p>{shipment.origin.detail}</p>
                  </div>
                </div>
                <div className="point">
                  <div className="point-icon"><MapPin size={14} /></div>
                  <div className="point-details">
                    <h4>{shipment.destination.city}</h4>
                    <p>{shipment.destination.detail}</p>
                  </div>
                </div>
              </div>

              <div className="buyer-info">
                <span className="card-label">Buyer</span>
                <h4>{shipment.buyer.name}</h4>
                <p>{shipment.buyer.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="right-panel">
        <div className="detail-header">
          <div className="detail-title-group">
            <h2 className="detail-title">{selectedShipment.id}</h2>
            {selectedShipment.status && (
              <div className={`status-badge ${getStatusClass(selectedShipment.status)}`}>
                <div className="status-dot"></div>
                {selectedShipment.status}
              </div>
            )}
          </div>
          <div className="action-buttons">
            <button className="action-btn"><Phone size={16} /> Phone</button>
            <button className="action-btn"><Mail size={16} /> Email</button>
          </div>
        </div>

        <div className="detail-tabs">
          <div className="tab">Information</div>
          <div className="tab active">Vehicle info</div>
          <div className="tab">Company</div>
          <div className="tab">Billing</div>
        </div>

        <div className="thumbnails-row">
          <div className="thumbnails">
            <div className="thumb"></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
          </div>
          <button className="docs-btn">Documents</button>
        </div>

        <div className="load-capacity">
          <h3>Load capacity</h3>
          <div className="truck-visualization" style={{ position: 'relative', padding: '20px' }}>
            
             <img 
                src={selectedShipment.image} 
                alt="Selected Truck" 
                className="truck-image-placeholder" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            
{/*             
            {selectedShipment.image ? (
             
            ) : (
              <div className="truck-image-placeholder" style={{width: '60%', height: '80%', border: '2px solid #d1d5db', borderRadius: '8px', position: 'relative'}}>
                 <div className="truck-cab" style={{position: 'absolute', right: '100%', bottom: '0', width: '30%', height: '60%', border: '2px solid #d1d5db', borderRight: 'none', borderTopLeftRadius: '12px'}}></div>
              </div>
            )} */}
            <div className="fill-level" style={{ position: 'absolute', top: '30%', right: '10px', background: 'rgba(53, 133, 142, 0.9)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontWeight: 'bold', width: 'auto', height: 'auto', left: 'auto', bottom: 'auto' }} >{selectedShipment.Space}</div>
          <div className="trucktype" style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(53, 133, 142, 0.9)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontWeight: 'bold', width: 'auto', height: 'auto', left: 'auto', bottom: 'auto' }}>{selectedShipment.type}</div>

          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="label">Truck No.</span>
              <span className="value">{selectedShipment.tid}</span>
            </div>
            <div className="stat-item">
              <span className="label">Weight</span>
              <span className="value">{selectedShipment.Weight}</span>
            </div>
            <div className="stat-item">
              <span className="label">Pallets</span>
              <span className="value">{selectedShipment.pallets}</span>
            </div>
            <div className="stat-item">
              <span className="label">Space</span>
              <span className="value">{selectedShipment.Space}</span>
            </div>

            <div className="stat-item">
              <span className="label">Volume</span>
              <span className="value">{selectedShipment.Volume}</span>
            </div>
            
          </div>
        </div>

        <div className="route-map">
          <h3>Route map</h3>
          <div className="map-container" style={{ 
            position: 'relative', 
            width: '100%', 
            height: '500px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '1px solid #e2e8f0'
          }}>
            {(() => {
              const originLoc = getLatLng(selectedShipment.origin.city);
              const destLoc = getLatLng(selectedShipment.destination.city);
              
              const mapCenter = {
                lat: (originLoc.lat + destLoc.lat) / 2,
                lng: (originLoc.lng + destLoc.lng) / 2
              };

              let truckPos = originLoc;
              if (selectedShipment.status === 'On way' || selectedShipment.status === 'Delayed') {
                truckPos = mapCenter;
              } else if (selectedShipment.status === 'Delivered') {
                truckPos = destLoc;
              }

              if (googleMapsApiKey === null) {
                return <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>;
              }

              return (
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={mapCenter}
                    zoom={4}
                    options={{ disableDefaultUI: true }}
                  >
                    {/* Origin and Destination Markers */}
                    <Marker position={originLoc} label="A" />
                    <Marker position={destLoc} label="B" />
                    
                    {/* Route Line */}
                    <Polyline 
                      path={[originLoc, destLoc]} 
                      options={{ strokeColor: '#35858E', strokeOpacity: 0.8, strokeWeight: 4 }} 
                    />
                    
                    {/* Truck Position Marker */}
                    <Marker 
                      position={truckPos} 
                      icon={{
                        path: "M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h1.1a3 3 0 0 0 5.8 0h4.2a3 3 0 0 0 5.8 0H21a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-11-1a2 2 0 0 1 4 0v1H8V6Zm3 12a1 1 0 1 1 1-1 1 1 0 0 1-1 1Zm8 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z",
                        fillColor: selectedShipment.status === 'Delayed' ? '#ef4444' : '#1e429f',
                        fillOpacity: 1,
                        strokeWeight: 1,
                        scale: 1.5,
                        anchor: { x: 12, y: 12 }
                      }}
                      zIndex={10}
                    />
                  </GoogleMap>
                </LoadScript>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
