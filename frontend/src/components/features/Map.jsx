import React, { useEffect, useMemo, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { Map as MapGL, Marker, Popup } from 'react-map-gl';
import MapMarker from '../ui/MapMarker';
// mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

function Map({ data }) {
  return (
    <MapGL
      mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      initialViewState={{
        longitude: 21.017532,
        latitude: 52.237049,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/navigation-day-v1"
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid #d3d3d3',
        borderRadius: '0.5rem',
      }}
    >
      <MapMarker data={data} />
    </MapGL>
  );
}

export default Map;
