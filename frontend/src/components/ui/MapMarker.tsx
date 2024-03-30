import React, { useMemo, useState } from "react";
import { Marker } from "react-map-gl";
import img from "../../assets/logo.png";
import MarkerPopup from "./MarkerPopup";
import useWindowDimensions from "../../hooks/useWindoDimensions";
import MobileMarkerPopup from "./MobileMarkerPopup";
import { Restaurant } from "../../redux/restaurantsSlice";

type MapMarkerProps = {
  data: Restaurant[];
};

function MapMarker({ data }: MapMarkerProps) {
  const [popupInfo, setPopupInfo] = useState<Restaurant | null>(null);
  const { width } = useWindowDimensions();


  const markers = data.map((restaurant, index) => (
    <Marker
      key={index}
      longitude={restaurant.address.latLng[0]}
      latitude={restaurant.address.latLng[1]}
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
  ));

  return (
    <>
      {markers}
      {popupInfo && width >= 640 && (
        <MarkerPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
      )}
      {width < 640 && (
        <MobileMarkerPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
      )}
    </>
  );
}

export default MapMarker;
