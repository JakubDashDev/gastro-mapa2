import "mapbox-gl/dist/mapbox-gl.css";
import { GeolocateControl, Map as MapGL, Marker, NavigationControl, useMap } from "react-map-gl";
import MapMarker from "../ui/MapMarker";
import useWindowDimensions from "../../hooks/useWindoDimensions";
import { RestaurantType } from "../../redux/restaurantsSlice";
import useSuperclaster from "use-supercluster";
import { useState } from "react";
import NewMarkers from "../ui/NewMarkers";
import Supercluster from "supercluster";
import ClusterLeavesModal from "../ui/ClusterLeavesModal";

type MapProps = {
  data: Array<RestaurantType>;
  darkMode: boolean;
};

function Map({ data, darkMode }: MapProps) {
  const { width } = useWindowDimensions();
  const [zoom, setZoom] = useState<number>(5);
  const [popupInfo, setPopupInfo] = useState<RestaurantType | null>();
  const [clusterLeaves, setClusterLeaves] = useState<
    | Supercluster.PointFeature<{
        cluster: boolean;
        restaurantId: string | undefined;
        restaurant: RestaurantType;
      }>[]
    | undefined
  >(undefined);

  return (
    <MapGL
      id="mapMain"
      mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      initialViewState={{
        longitude: 21.017532,
        latitude: 52.237049,
        zoom: 5,
      }}
      mapStyle={darkMode ? "mapbox://styles/mapbox/navigation-night-v1" : "mapbox://styles/mapbox/navigation-day-v1"}
      style={{
        width: "100%",
        height: "100%",
        border: width >= 1280 ? "2px solid #d3d3d3" : "",
        borderRadius: width >= 1280 ? "0.5rem" : "",
      }}
      onZoom={(e) => setZoom(e.viewState.zoom)}
    >
      <NewMarkers zoom={zoom} setClusterLeaves={setClusterLeaves} />
      <ClusterLeavesModal clusterLeaves={clusterLeaves} setClusterLeaves={setClusterLeaves} />

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
