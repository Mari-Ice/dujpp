import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // **Crucial: Import Leaflet's CSS**

// --- Fix for Leaflet's Default Icon Issue with Webpack/CRA ---
import L from 'leaflet';


L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// -----------------------------------------------------------

const center: [number, number] = [46.505, 15.09]; // Initial center [Lat, Lng]
const markerPosition: [number, number] = [46.515, 15.01];

// Array of coordinates for the polyline
const polylineCoordinates: [number, number][] = [
  [46.505, 15.1],
  [46.509, 15.1],
  [46.51, 15.08],
];

const MapPage: React.FC = () => {
  return (
      <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
            url="https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2"
        />

        <Polyline positions={polylineCoordinates} color="blue" weight={5} />

        <Marker position={markerPosition}>
          <Popup>
          </Popup>
        </Marker>

        <Marker position={center}>
          <Popup>
          </Popup>
        </Marker>

      </MapContainer>
  );
};

export default MapPage;