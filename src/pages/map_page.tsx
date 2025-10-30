import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {observer} from "mobx-react-lite";

export interface Position {
  lat: number;
  lng: number;
}

interface MapPageProps {
  center?: Position;
  polylineCoordinates?: Position[];
  markers?: Position[];
  initialZoom?: number;
}

const MapPage = observer(({center, polylineCoordinates, markers, initialZoom}: MapPageProps) => {

  return (
      <MapContainer
          center={center ?? [46.0569, 14.5058]}
          zoom={initialZoom ?? 13}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{height: '100vh', width: '100%', overflow: 'hidden'}}
      >
        <TileLayer
            url="https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2"
        />

        {polylineCoordinates && <Polyline positions={polylineCoordinates.map((p) => [p.lat, p.lng])} color="blue" weight={5}/>}
        {markers && markers.map((marker, index) => (
         <Marker key={index} position={[marker.lat, marker.lng]}></Marker>
        ))}

      </MapContainer>
  );
});

export default MapPage;