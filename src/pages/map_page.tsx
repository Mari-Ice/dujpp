import {MapContainer, TileLayer, Marker, Polyline, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {observer} from "mobx-react-lite";
import LocationMarker from "../components/location_marker.tsx";
import L from "leaflet";
import type {Station} from "../types/stations.tsx";

export interface Position {
  lat: number;
  lng: number;
}

interface MapPageProps {
  center?: Position;
  polylineCoordinates?: Position[];
  markers?: any[];
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

        {polylineCoordinates &&
            <Polyline positions={polylineCoordinates.map((p) => [p.lat, p.lng])} color="blue" weight={5}/>}
        {markers && markers.map((marker, index) => (
            <MarkerIcon key={index} itemKey={index} lat={marker.station.lat} lng={marker.station.lng} markerInfo={marker.station.label} station={marker.station} onClick={marker.onClick} color={marker.color}/>
        ))}
        <LocationMarker/>
      </MapContainer>
  );
});

export default MapPage;

const LocationPinSVGTemplate = (fillColor: string) => `
  <svg width="25" height="35" viewBox="0 0 25 35" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.875 12.5 35 12.5 35C12.5 35 25 21.875 25 12.5C25 5.6 19.4 0 12.5 0ZM12.5 18.75C9.04 18.75 6.25 15.96 6.25 12.5C6.25 9.04 9.04 6.25 12.5 6.25C15.96 6.25 18.75 9.04 18.75 12.5C18.75 15.96 15.96 18.75 12.5 18.75Z" 
      fill="${fillColor}" // <-- Injected color here
    />
  </svg>
`;

const MarkerIcon = ({itemKey, lat, lng, markerInfo, onClick, station, color = 'blue'}: {
  itemKey: string | number,
  lat: number,
  lng: number,
  markerInfo: string,
  onClick?: (v: Station | undefined) => void,
  station?: Station,
  color?: 'red' | 'blue' | 'green' | '',
}) => {

  const currentColor = color;
  return <div
      style={{ color: currentColor }}
  >
    <Marker key={itemKey} position={[lat, lng]} icon={L.divIcon({
      className: 'custom-div-icon',
      html: LocationPinSVGTemplate(currentColor),
      iconSize: [25, 35],
      iconAnchor: [12.5, 35],
      popupAnchor: [0, -30],
    })} eventHandlers={{
      click: () => {
        onClick && onClick(station)
      }
    }}>
      <Popup>{markerInfo}</Popup>
    </Marker>
  </div>
}