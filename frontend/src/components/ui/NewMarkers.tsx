import React, { useState, MouseEvent, Fragment } from "react";
import { useAppSelector } from "../../redux/store";
import { Marker, MarkerEvent, useMap } from "react-map-gl";
import useSupercluster from "use-supercluster";
import img from "../../assets/logo.png";
import MarkerPopup from "./MarkerPopup";
import { RestaurantType } from "../../redux/restaurantsSlice";
import Supercluster from "supercluster";
import MobileMarkerPopup from "./MobileMarkerPopup";
import useWindowDimensions from "../../hooks/useWindoDimensions";

interface INewMarker {
  zoom: number;
  setClusterLeaves: React.Dispatch<
    React.SetStateAction<
      | Supercluster.PointFeature<{
          cluster: boolean;
          restaurantId: string | undefined;
          restaurant: RestaurantType;
        }>[]
      | undefined
    >
  >;
}

function NewMarkers({ zoom, setClusterLeaves }: INewMarker) {
  const { restaurants } = useAppSelector((state) => state.restaurants);
  const { width } = useWindowDimensions();
  const { mapMain } = useMap();
  const [showPopup, setShowPopup] = useState<RestaurantType | null>(null);

  const points = restaurants.map((restaurant) => ({
    type: "Feature",
    properties: {
      cluster: false,
      restaurantId: restaurant._id,
      restaurant: restaurant,
    },
    geometry: { type: "Point", coordinates: restaurant.geometry.coordinates },
  }));

  const bounds = mapMain?.getBounds().toArray().flat() as [number, number, number, number];

  const { clusters, supercluster } = useSupercluster({
    //@ts-ignore
    points,
    bounds,
    zoom: zoom,
    options: { radius: 1, maxZoom: 30 },
  });

  return clusters.map((cluster) => {
    const coordinates = cluster.geometry.coordinates;
    //@ts-ignore -- point_count exists
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    const hadnleClusterClick = (e: any) => {
      e.originalEvent.stopPropagation();

      if (mapMain!.getZoom() < 13) {
        mapMain?.flyTo({
          center: [coordinates[0], coordinates[1]],
          zoom: 13,
          duration: 2000,
        });
      } else {
        setClusterLeaves(supercluster?.getLeaves(Number(cluster.id)));
      }
    };

    const handleMarkerClick = (e: any) => {
      e.originalEvent.stopPropagation();

      if (mapMain!.getZoom() < 10) {
        mapMain?.flyTo({
          center: [coordinates[0], coordinates[1]],
          zoom: 16,
          duration: 2000,
        });

        setTimeout(() => {
          setShowPopup(cluster.properties.restaurant);
        }, 2000);
      } else {
        setShowPopup(cluster.properties.restaurant);
      }
    };

    if (isCluster) {
      return (
        <Marker
          key={cluster.id}
          latitude={coordinates[1]}
          longitude={coordinates[0]}
          onClick={(e) => hadnleClusterClick(e)}
          style={{ zIndex: 10 }}
        >
          <div className="relative cursor-pointer">
            <img
              src={img}
              alt="marker"
              width={50 + (pointCount / points.length) * 20}
              height={50 + (pointCount / points.length) * 20}
            />
            <div
              style={{
                width: `${45 + (pointCount / points.length) * 20}px`,
                height: `${45 + (pointCount / points.length) * 20}px`,
              }}
              className="absolute top-0 left-[51%] bg-black/30 rounded-full translate-x-[-50%] tranlsate-y-[50%]"
            ></div>
            <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50px] h-[50px] flex items-center justify-center text-primary-900 text-lg">
              {pointCount}
            </span>
          </div>
        </Marker>
      );
    }

    return (
      <Fragment>
        <Marker
          key={cluster.properties.restaurantId}
          latitude={coordinates[1]}
          longitude={coordinates[0]}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            handleMarkerClick(e);
          }}
        >
          <img src={img} alt="marker" width={50} height={50} className="cursor-pointer" />
          {showPopup && width >= 640 && <MarkerPopup popupInfo={showPopup} setPopupInfo={setShowPopup} />}
        </Marker>
        {showPopup && width < 640 && <MobileMarkerPopup popupInfo={showPopup} setPopupInfo={setShowPopup} />}
      </Fragment>
    );
  });
}

export default NewMarkers;
