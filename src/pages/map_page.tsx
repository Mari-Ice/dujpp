import {MapContainer, TileLayer, Marker, Polyline, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import {observer} from "mobx-react-lite";
import LocationMarker from "../components/map/location_marker.tsx";
import L, {type LatLngExpression} from "leaflet";
import type {Station} from "../types/stations.ts";
import {DujppColors} from "../theme.tsx";
import MarkerClusterGroup from "react-leaflet-markercluster";

export interface Position {
  lat: number;
  lng: number;
}

interface MapPageProps {
  center?: Position;
  polylineCoordinates?: LatLngExpression[];
  markers?: any[];
  initialZoom?: number;
}

const MapPage = observer(({center, polylineCoordinates, markers, initialZoom}: MapPageProps) => {

  const clusterMarkers = [];
  const displayMarkers = [];
  if (!!markers) {
    for (const marker of markers) {
      if (marker.selected) {
        displayMarkers.push(marker);
      } else {
        clusterMarkers.push(marker);
      }
    }
  }


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
            <Polyline positions={polylineCoordinates} color={`${DujppColors.primary}`} weight={5}/>}
        {displayMarkers && displayMarkers.map((marker, index) => (
            <MarkerIcon key={`${index}-standalone-${marker.station.id}`} itemKey={index} lat={marker.station.latitude} lng={marker.station.longitude}
                        markerInfo={marker.station.name} station={marker.station} onClick={marker.onClick} color={marker.color} />
        ))}
        {clusterMarkers &&
            <MarkerClusterGroup
            removeOutsideVisibleBounds={true}
            showCoverageOnHover={false}
            iconCreateFunction={ClusterIcon}
            >
            {
              clusterMarkers.map((marker, index) => (
                  <MarkerIcon key={`${index}-${marker.station.id}-cluster`} itemKey={index} lat={marker.station.latitude} lng={marker.station.longitude}
              markerInfo={marker.station.name} station={marker.station} onClick={marker.onClick}
                              color={marker.color}/>
              ))
            }
            </MarkerClusterGroup>
        }
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

const MarkerIcon = ({itemKey, lat, lng, markerInfo, onClick, station, color = DujppColors.primary}: {
  itemKey: string | number,
  lat: number,
  lng: number,
  markerInfo: string,
  onClick?: (v: Station | undefined) => void,
  station?: Station,
  color?: string,
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

const ClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  const baseColor = DujppColors.primary;
  const size = 35;
  const outerStyle = `background-color: ${DujppColors.primaryLight}80; color: ${DujppColors.contentShade}; padding: ${size * 0.08}px; border-radius: 100%; display: flex; align-items: center; justify-content: center; width: ${size * 1.16}px; height: ${size * 1.16}px;`;
  const innerStyle = `background-color: ${baseColor}; color: white; font-size: 14px; font-weight: bold; font-family: Barlow; line-height: ${size}px; width: ${size}px; height: ${size}px; text-align: center; display: inline-block; border-radius: 100%;`;
  return new L.DivIcon({
    html: `
          <div style="${outerStyle}">
            <span style="${innerStyle}">
              ${count}
            </span>
          </div>
        `,
    className: `marker-cluster-custom`,
    iconSize: new L.Point(40, 40)
  });
};