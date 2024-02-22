import React, { useMemo, useState } from 'react';
import { Marker } from 'react-map-gl';
import img from '../../assets/logo.png';
import MarkerPopup from './MarkerPopup';

function MapMarker({ data }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const markers = useMemo(
    () =>
      data.map((restaurant, index) => (
        <Marker
          key={index}
          longitude={restaurant.latlng.lng}
          latitude={restaurant.latlng.lat}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(restaurant);
          }}
        >
          <img
            src={img}
            alt="marker"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Marker>
      )),
    []
  );

  return (
    <>
      {markers}
      {popupInfo && <MarkerPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />}
    </>
  );
}

export default MapMarker;
