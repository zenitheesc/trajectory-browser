import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import './App.css';
import L, { LatLngExpression } from 'leaflet';
import LaunchButton from './LaunchButton';
import Footer from './Footer';

interface ProbeData {
  lat: number;
  lon: number;
  alt: number;
  datetime: string;
  uploader_callsign: string;
}

function App(): JSX.Element {
  const [selectedProbe, setSelectedProbe] = useState<number>(1);

  const handleProbeSelect = (probeId: number) => {
    setSelectedProbe(probeId);
  };

  const requireContext = require.context('./data', false, /\.json$/);
  const probeData: ProbeData[][] = Array.from(requireContext.keys()).map((key) => requireContext(key));
  const positions: LatLngExpression[] = probeData[selectedProbe - 1].map((probe) => [probe.lat, probe.lon]);

  const pathOptions = {
    color: 'black',
    weight: 3,
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="menu">
          {probeData.map((data, index) => (
            <LaunchButton
              key={index}
              name={data[0].uploader_callsign}
              alt={Math.max(...data.map((probe) => probe.alt))}
              datetime={data[0].datetime}
              onClick={() => handleProbeSelect(index + 1)}
            />
          ))}
        </div>
        <div className="map">
          <MapContainer center={positions[0]} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline pathOptions={pathOptions} positions={positions} />
            <Marker position={positions[0]} icon={L.icon({ popupAnchor: [-2, -75], iconAnchor: [18, 60], iconUrl: './green.png', iconSize: [32, 64] })} />
            <Marker position={positions[positions.length - 1]} icon={L.icon({ popupAnchor: [-2, -75], iconAnchor: [18, 60], iconUrl: './red.png', iconSize: [32, 64] })} />
          </MapContainer>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
