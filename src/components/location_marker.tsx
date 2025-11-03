import { useEffect } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L, {LatLng} from 'leaflet';
import {useAppStore} from "../main.tsx";
import {observer} from "mobx-react-lite";

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3253/3253238.png',
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5], // Point the bottom center to the actual location
  popupAnchor: [0, -30],
});

const LocationMarker = observer(() => {
  const store = useAppStore();

  const map = useMapEvents({
    // This event fires when Leaflet successfully locates the user
    locationfound(e) {
      store.setPosition(e.latlng);
      store.setAccuracy(e.accuracy);
    },
    // This event fires if the geolocation attempt fails
    locationerror(e) {
      store.userLocationError(e);
    },

  });

  useEffect(() => {
    // When the component mounts, trigger the location request.
    // This will prompt the user for permission.
    map.locate({
      setView: false, // Don't automatically set the view on initial load
      maxZoom: 16,
      enableHighAccuracy: true,
      watch: false // Set to true if you want continuous updates
    });

  }, [map]);

  useEffect(() => {
      const points = store.getBoundPoints();
      if (!points) return;
      const point = new LatLng(points[0][0], points[0][1]);
      if (points.length >= 2) {
        const bounds = L.latLngBounds(points);
        const center = bounds.getCenter();
        const zoom = map.getBoundsZoom(bounds);
        map.flyTo(center, zoom > 10 ? zoom - (zoom/18) : zoom - 0.05, {duration: 0.5, animate: true,});
      } else {
        map.flyTo(point, 14, {duration: 0.5, animate: true});
      }
  }, [store.showMap, map, store.position]);


  return store.position === null || store.position === undefined ? null : (
      <>
        <Marker position={store.position} icon={userIcon}>
          <Popup>You are here (within {store.accuracy ? Math.round(store.accuracy) : 0} meters)</Popup>
        </Marker>
      </>
  );
});

// Don't forget to export your new component
export default LocationMarker;