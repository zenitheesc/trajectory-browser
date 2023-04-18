import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import './App.css';
import probeData1 from "./data/J4830341.json";
import probeData2 from "./data/J4840095.json";
import L, { LatLngExpression } from 'leaflet';

interface ProbeData {
  lat: number;
  lon: number;
}

function App(): JSX.Element {
  const [selectedProbe, setSelectedProbe] = useState<number>(1);

  const handleProbeSelect = (probeId: number) => {
    setSelectedProbe(probeId);
  }

  const probeData: ProbeData[][] = [probeData1, probeData2];
  const positions: LatLngExpression[] = probeData[selectedProbe - 1].map(probe => [probe.lat, probe.lon]);

  const pathOptions = {
    color: 'black',
    weight: 3
  };

  return (
    <div className="container">
      <div className="menu">
        <button className="launchItem" onClick={() => handleProbeSelect(1)}>Trajectory 1</button>
        <button className="launchItem" onClick={() => handleProbeSelect(2)}>Trajectory 2</button>
      </div>
      <div className="map">
        <MapContainer center={positions[0]} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline pathOptions={pathOptions} positions={positions} />
          <Marker position={positions[0]} icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [32, 64] })} />
          <Marker position={positions[positions.length - 1]} icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [32, 64] })} />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
