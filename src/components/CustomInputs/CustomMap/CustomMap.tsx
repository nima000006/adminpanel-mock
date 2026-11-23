// CustomMap.tsx
import { forwardRef, useEffect, useState } from "react";

import { divIcon, Map, Zoom } from "leaflet";
import { useMapEvents } from "react-leaflet";
import { MapContainer, MapContainerProps } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";

import CustomTileLayer from "./CustomMapUtil/CustomTileLayer";
import Div from "../../Renderers/Div/Div";
import "./_customMap.scss";
import "leaflet/dist/leaflet.css";

type CustomMapProps = {
  setLng?: React.Dispatch<React.SetStateAction<number>>;
  setLat?: React.Dispatch<React.SetStateAction<number>>;
  lat?: number;
  lng?: number;
  scrollWheelZoom?: Zoom | undefined;
  zoom?: number | undefined;
  className?: string | undefined;
  isLoading?: boolean;
  isReadOnly?: boolean;
  triggerRerender?: number; // prop to force re-render if needed (in case of problem showing map)
} & MapContainerProps;

type CustomMapRef = Map | null;

const CustomMap = forwardRef<CustomMapRef, CustomMapProps>(
  (
    {
      setLat,
      setLng,
      lat = 35.69947719509053,
      lng = 51.336965560913086,
      scrollWheelZoom = true,
      zoom,
      className,
      isLoading = false,
      isReadOnly = false,
      triggerRerender,
      ...mapContainerProps
    },
    ref
  ) => {
    const [zoomLevel, setZoomLevel] = useState(zoom ?? 13);
    const LocationFinder = () => {
      const map = useMapEvents({
        click: ({ latlng }) => {
          map.locate();
          if (!isReadOnly) {
            setLat?.(latlng?.lat);
            setLng?.(latlng?.lng);
          }
        },
        zoomend: (e) => setZoomLevel(e.target._zoom),
      });
      map.attributionControl.setPrefix("");
      return null;
    };

    const customIcon = divIcon({
      className: "custom-marker-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      html: `<img src="/images/marker-icon.png" width="32" height="32" alt="مارکر کوله" />`,
    });

    // Use effect to handle re-rendering when drawer opens or lat/lng changes
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.invalidateSize();
      }
    }, [triggerRerender, lat, lng]); // Dependencies include triggerRerender, lat, and lng

    return (
      <Div
        className={`map-main-content ${className ? className : ""}`}
        loading={isLoading}
      >
        <MapContainer
          key={JSON.stringify([lat, lng, triggerRerender])} // Use key to force re-render
          center={[lat, lng]}
          zoom={zoomLevel}
          scrollWheelZoom={scrollWheelZoom}
          className="map-container-style"
          ref={ref}
          {...mapContainerProps}
        >
          <CustomTileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            fallbackUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[lat ?? 35.699739, lng ?? 51.338097]}
            icon={customIcon}
          ></Marker>
          <LocationFinder />
        </MapContainer>
      </Div>
    );
  }
);

CustomMap.displayName = "CustomMap";

export default CustomMap;
