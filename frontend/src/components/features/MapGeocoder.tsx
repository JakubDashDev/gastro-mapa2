import MapboxGeocoder, { GeocoderOptions, Result } from "@mapbox/mapbox-gl-geocoder";
import { useCallback, useEffect, useState } from "react";
import { ControlPosition, LngLat, Map, Marker, MarkerDragEvent, MarkerProps, useControl, useMap } from "react-map-gl";

const TOKEN = import.meta.env.VITE_MAP_TOKEN;

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: number[] | undefined;
}

interface MapGeocoderProps {
  setResult: React.Dispatch<React.SetStateAction<IAddressState>>;
}

function MapGeocoder({ setResult }: MapGeocoderProps) {
  return (
    <div className="w-full h-full border-2 border-blue-500 rounded-md p-1">
      <Map
        initialViewState={{
          longitude: 21.01223,
          latitude: 52.229675,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" onResult={setResult} />
      </Map>
    </div>
  );
}

export default MapGeocoder;

type GeocoderControlProps = Omit<GeocoderOptions, "accessToken" | "mapboxgl" | "marker"> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, "longitude" | "latitude">;

  position: ControlPosition;

  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: any;
  onError?: (e: object) => void;
};

function GeocoderControl(props: GeocoderControlProps) {
  const [marker, setMarker] = useState<any>(null);

  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
        flyTo: {
          speed: 3,
          bearing: 0,
          curve: 1,
        },
      });
      ctrl.on("loading", props.onLoading!);
      ctrl.on("results", props.onResults!);
      ctrl.on("result", (evt) => {
        props.onResult(evt.result);

        const { result } = evt;
        const location =
          result && (result.center || (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && props.marker) {
          setMarker(<Marker {...(props.marker as object)} longitude={location[0]} latitude={location[1]} />);
        } else {
          setMarker(null);
        }
      });
      ctrl.on("error", props.onError!);
      return ctrl;
    },
    {
      position: props.position,
    }
  );

  //NOTE: this comes from mapbox docs
  // @ts-ignore (TS2339) private member
  if (geocoder._map) {
    if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
      geocoder.setProximity(props.proximity);
    }
    if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
      geocoder.setRenderFunction(props.render);
    }
    if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
      geocoder.setLanguage(props.language);
    }
    if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
      geocoder.setZoom(props.zoom);
    }
    if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
      geocoder.setFlyTo(props.flyTo);
    }
    if (geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined) {
      geocoder.setPlaceholder(props.placeholder);
    }
    if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
      geocoder.setCountries(props.countries);
    }
    if (geocoder.getTypes() !== props.types && props.types !== undefined) {
      geocoder.setTypes(props.types);
    }
    if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
      geocoder.setMinLength(props.minLength);
    }
    if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
      geocoder.setLimit(props.limit);
    }
    if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
      geocoder.setFilter(props.filter);
    }
    if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
      geocoder.setOrigin(props.origin);
    }
    // Types missing from @types/mapbox__mapbox-gl-geocoder
    // if (geocoder.getAutocomplete() !== props.autocomplete && props.autocomplete !== undefined) {
    //   geocoder.setAutocomplete(props.autocomplete);
    // }
    // if (geocoder.getFuzzyMatch() !== props.fuzzyMatch && props.fuzzyMatch !== undefined) {
    //   geocoder.setFuzzyMatch(props.fuzzyMatch);
    // }
    // if (geocoder.getRouting() !== props.routing && props.routing !== undefined) {
    //   geocoder.setRouting(props.routing);
    // }
    // if (geocoder.getWorldview() !== props.worldview && props.worldview !== undefined) {
    //   geocoder.setWorldview(props.worldview);
    // }
  }
  return marker;
}

const noop = () => {};

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
};
