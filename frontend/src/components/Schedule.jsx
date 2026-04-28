import React, { useMemo } from 'react';
import { Clock, AlertTriangle, CheckCircle, Truck } from 'lucide-react';
import './Schedule.css';

const shipments = [
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
    type: 'Box Truck',
    schedule: {
      departureTime: '2026-04-26T08:00:00Z',
      estimatedArrival: '2026-04-29T14:00:00Z',
      updatedETA: '2026-04-29T16:30:00Z',
      transitDurationDays: 3.5,
      lastUpdate: '2026-04-28T10:15:00Z'
    }
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
    type: 'Dry Van',
    schedule: {
      departureTime: '2026-04-29T10:00:00Z',
      estimatedArrival: '2026-05-18T14:00:00Z',
      updatedETA: '2026-05-18T14:00:00Z',
      transitDurationDays: 19.2,
      lastUpdate: '2026-04-28T13:00:00Z'
    }
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
    type: 'Flat bed',
    schedule: {
      departureTime: '2026-04-27T07:30:00Z',
      estimatedArrival: '2026-04-27T12:00:00Z',
      updatedETA: '2026-04-28T22:00:00Z',
      transitDurationDays: 0.5,
      lastUpdate: '2026-04-28T11:45:00Z'
    }
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
    type: 'Van',
    schedule: {
      departureTime: '2026-04-28T09:00:00Z',
      estimatedArrival: '2026-04-28T11:00:00Z',
      updatedETA: '2026-04-28T11:15:00Z',
      transitDurationDays: 0.1,
      lastUpdate: '2026-04-28T10:30:00Z'
    }
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
    type: 'Dry Van',
    schedule: {
      departureTime: '2026-04-27T22:00:00Z',
      estimatedArrival: '2026-04-29T08:00:00Z',
      updatedETA: '2026-04-29T08:30:00Z',
      transitDurationDays: 1.4,
      lastUpdate: '2026-04-28T12:00:00Z'
    }
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
    type: 'Flat Bed',
    schedule: {
      departureTime: '2026-04-26T14:00:00Z',
      estimatedArrival: '2026-04-27T18:00:00Z',
      updatedETA: '2026-04-29T10:00:00Z',
      transitDurationDays: 1.2,
      lastUpdate: '2026-04-28T09:20:00Z'
    }
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
    type: 'Box Truck',
    schedule: {
      departureTime: '2026-04-28T06:30:00Z',
      estimatedArrival: '2026-04-28T14:00:00Z',
      updatedETA: '2026-04-28T14:45:00Z',
      transitDurationDays: 0.3,
      lastUpdate: '2026-04-28T11:00:00Z'
    }
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
    type: 'Van',
    schedule: {
      departureTime: '2026-04-28T04:00:00Z',
      estimatedArrival: '2026-04-28T09:00:00Z',
      updatedETA: '2026-04-28T16:30:00Z',
      transitDurationDays: 0.2,
      lastUpdate: '2026-04-28T10:10:00Z'
    }
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
    type: 'Dry Van',
    schedule: {
      departureTime: '2026-04-26T18:00:00Z',
      estimatedArrival: '2026-04-30T12:00:00Z',
      updatedETA: '2026-04-30T12:00:00Z',
      transitDurationDays: 3.8,
      lastUpdate: '2026-04-28T08:45:00Z'
    }
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
    type: 'Flat Bed',
    schedule: {
      departureTime: '2026-04-29T06:00:00Z',
      estimatedArrival: '2026-04-30T08:00:00Z',
      updatedETA: '2026-04-30T08:00:00Z',
      transitDurationDays: 1.1,
      lastUpdate: '2026-04-28T12:30:00Z'
    }
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
    type: 'Box Truck',
    schedule: {
      departureTime: '2026-04-28T10:00:00Z',
      estimatedArrival: '2026-04-28T12:30:00Z',
      updatedETA: '2026-04-28T13:15:00Z',
      transitDurationDays: 0.1,
      lastUpdate: '2026-04-28T11:20:00Z'
    }
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
    type: 'Van',
    schedule: {
      departureTime: '2026-04-28T18:00:00Z',
      estimatedArrival: '2026-04-28T22:00:00Z',
      updatedETA: '2026-04-28T22:00:00Z',
      transitDurationDays: 0.16,
      lastUpdate: '2026-04-28T13:00:00Z'
    }
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
    type: 'Dry Van',
    schedule: {
      departureTime: '2026-04-25T08:00:00Z',
      estimatedArrival: '2026-04-27T10:00:00Z',
      updatedETA: '2026-04-29T18:00:00Z',
      transitDurationDays: 2.1,
      lastUpdate: '2026-04-28T09:15:00Z'
    }
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
    type: 'Flat Bed',
    schedule: {
      departureTime: '2026-04-28T05:00:00Z',
      estimatedArrival: '2026-04-28T13:00:00Z',
      updatedETA: '2026-04-28T13:00:00Z',
      transitDurationDays: 0.33,
      lastUpdate: '2026-04-28T10:50:00Z'
    }
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
    type: 'Box Truck',
    schedule: {
      departureTime: '2026-04-26T20:00:00Z',
      estimatedArrival: '2026-04-27T22:00:00Z',
      updatedETA: '2026-04-29T14:00:00Z',
      transitDurationDays: 1.1,
      lastUpdate: '2026-04-28T08:30:00Z'
    }
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
    type: 'Van',
    schedule: {
      departureTime: '2026-04-25T06:00:00Z',
      estimatedArrival: '2026-04-25T10:00:00Z',
      updatedETA: '2026-04-25T10:15:00Z',
      transitDurationDays: 0.17,
      lastUpdate: '2026-04-25T10:20:00Z'
    }
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
    type: 'Dry Van',
    schedule: {
      departureTime: '2026-04-27T10:00:00Z',
      estimatedArrival: '2026-04-27T13:00:00Z',
      updatedETA: '2026-04-28T20:00:00Z',
      transitDurationDays: 0.13,
      lastUpdate: '2026-04-28T11:00:00Z'
    }
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
    type: 'Flat Bed',
    schedule: {
      departureTime: '2026-04-26T08:00:00Z',
      estimatedArrival: '2026-04-26T13:00:00Z',
      updatedETA: '2026-04-26T13:30:00Z',
      transitDurationDays: 0.2,
      lastUpdate: '2026-04-26T13:40:00Z'
    }
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
    type: 'Box Truck',
    schedule: {
      departureTime: '2026-04-24T07:00:00Z',
      estimatedArrival: '2026-04-24T14:00:00Z',
      updatedETA: '2026-04-24T14:00:00Z',
      transitDurationDays: 0.3,
      lastUpdate: '2026-04-24T14:15:00Z'
    }
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
    type: 'Van',
    schedule: {
      departureTime: '2026-04-29T08:00:00Z',
      estimatedArrival: '2026-04-29T11:30:00Z',
      updatedETA: '2026-04-29T11:30:00Z',
      transitDurationDays: 0.15,
      lastUpdate: '2026-04-28T13:00:00Z'
    }
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
    type: 'Dry Van',
    schedule: {
      departureTime: '2026-04-27T18:00:00Z',
      estimatedArrival: '2026-04-28T22:00:00Z',
      updatedETA: '2026-04-28T23:30:00Z',
      transitDurationDays: 1.17,
      lastUpdate: '2026-04-28T13:30:00Z'
    }
  }
];

const Schedule = () => {
  const sortedShipments = useMemo(() => {
    return [...shipments].sort((a, b) => {
      const dateA = new Date(a.schedule.updatedETA || a.schedule.estimatedArrival).getTime();
      const dateB = new Date(b.schedule.updatedETA || b.schedule.estimatedArrival).getTime();
      return dateA - dateB;
    });
  }, []);

  const calculateProgress = (departure, eta, status) => {
    if (status === 'Delivered') return 100;
    if (status === 'Loading') return 0;
    
    const now = new Date('2026-04-28T14:00:00Z').getTime();
    const start = new Date(departure).getTime();
    const end = new Date(eta).getTime();
    
    if (now < start) return 0;
    
    let percent = ((now - start) / (end - start)) * 100;
    
    // If the ETA has passed but it's not marked Delivered yet, cap it at 99%
    if (percent >= 100 && status !== 'Delivered') return 99;
    
    return Math.max(5, Math.min(100, percent));
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const isDelayed = (estimated, updated) => {
    return new Date(updated).getTime() > new Date(estimated).getTime();
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <div>
          <h1 className="schedule-title">Dispatch Schedule</h1>
          <p className="schedule-subtitle">Live delivery tracking and estimated arrivals.</p>
        </div>
      </div>

      <div className="schedule-list">
        <div className="schedule-list-header">
          <div>Shipment ID</div>
          <div>Departure</div>
          <div>ETA / Updated ETA</div>
          <div>Transit Progress</div>
          <div>Status</div>
        </div>

        {sortedShipments.map(shipment => {
          const delayed = isDelayed(shipment.schedule.estimatedArrival, shipment.schedule.updatedETA);
          const progress = calculateProgress(shipment.schedule.departureTime, shipment.schedule.updatedETA, shipment.status);
          
          let statusClass = 'pending';
          if (shipment.status === 'On way') statusClass = 'on-time';
          if (shipment.status === 'Delayed') statusClass = 'delayed';
          if (shipment.status === 'Delivered') statusClass = 'completed';

          return (
            <div className="schedule-item" key={shipment.id}>
              {/* Column 1: ID & Route */}
              <div className="schedule-col">
                <div className="shipment-id">
                  {shipment.id}
                  {delayed && <AlertTriangle size={14} className="alert-icon" />}
                </div>
                <div className="shipment-route">{shipment.origin.city} → {shipment.destination.city}</div>
              </div>

              {/* Column 2: Departure */}
              <div className="schedule-col">
                <div className="time-val">{formatDate(shipment.schedule.departureTime)}</div>
                <div className="time-sub">Actual Departure</div>
              </div>

              {/* Column 3: ETA */}
              <div className="schedule-col">
                <div className={`time-val ${delayed ? 'delayed' : ''}`}>
                  {formatDate(shipment.schedule.updatedETA)}
                </div>
                <div className="time-sub">
                  {delayed ? `Orig: ${formatDate(shipment.schedule.estimatedArrival)}` : 'Estimated Arrival'}
                </div>
              </div>

              {/* Column 4: Progress Bar */}
              <div className="schedule-col progress-wrapper">
                <div className="progress-info">
                  <span>{shipment.origin.city.split(',')[0]}</span>
                  <span>{Math.round(progress)}% Complete</span>
                  <span>{shipment.destination.city.split(',')[0]}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className={`progress-bar-fill ${statusClass}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Column 5: Status */}
              <div className="schedule-col">
                <div className={`status-chip ${statusClass}`}>
                  {shipment.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
