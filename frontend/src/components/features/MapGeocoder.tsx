import MapboxGeocoder, { GeocoderOptions, Result } from "@mapbox/mapbox-gl-geocoder";
import { useState } from "react";
import { ControlPosition, Map, Marker, MarkerProps, useControl } from "react-map-gl";
import { MarkerInstance } from "react-map-gl/dist/esm/types";

const TOKEN = import.meta.env.VITE_MAP_TOKEN;

type MapGeocoderProps = {
  setResult: React.Dispatch<React.SetStateAction<Result | null>>;
  initalMarker?: {
    lat: number;
    lng: number;
  };
  center?: {
    lat: number;
    lng: number;
  };
};

function MapGeocoder({ setResult, initalMarker, center }: MapGeocoderProps) {
  return (
    <>
      <Map
        initialViewState={{
          longitude: center?.lng || 21.01223,
          latitude: center?.lat || 52.229675,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" onResult={(res: any) => setResult(res.result)} />
        {initalMarker && <Marker latitude={initalMarker.lat} longitude={initalMarker.lng} />}
      </Map>
    </>
  );
}

export default MapGeocoder;

type GeocoderControlProps = Omit<GeocoderOptions, "accessToken" | "mapboxgl" | "marker"> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, "longitude" | "latitude">;

  position: ControlPosition;

  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: Result) => void;
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
      });
      ctrl.on("loading", props.onLoading!);
      ctrl.on("results", props.onResults!);
      ctrl.on("result", (evt) => {
        props.onResult!(evt);

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
