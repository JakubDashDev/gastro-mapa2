import React, { useEffect, useMemo, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import {
  GeolocateControl,
  Map as MapGL,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import MapMarker from '../ui/MapMarker';
import useWindowDimensions from '../../hooks/useWindoDimensions';
// mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

function Map({ data, darkMode }) {
  const { width } = useWindowDimensions();
  return (
    <MapGL
      id="mapMain"
      mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      initialViewState={{
        longitude: 21.017532,
        latitude: 52.237049,
        zoom: 5,
      }}
      mapStyle={darkMode ? 'mapbox://styles/mapbox/navigation-night-v1' : 'mapbox://styles/mapbox/navigation-day-v1'}
      style={{
        width: '100%',
        height: '100%',
        border: width >= 1280 && '2px solid #d3d3d3',
        borderRadius: width >= 1280 && '0.5rem',
      }}
    >
      <MapMarker data={data} />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserHeading={true}
      />
      <NavigationControl />
    </MapGL>
  );
}

export default Map;
