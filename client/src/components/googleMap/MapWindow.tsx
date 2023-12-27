import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface IMapProps {
  address: string;
}

function MapWindow({ address }: IMapProps) {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Geocoding address={address} />
    </APIProvider>
  );
}

function Geocoding({ address }: { address: string }) {
  const geocodingLibrary = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] =
    useState<google.maps.Geocoder>();
  const [geoPosition, setGeoPosition] = useState<google.maps.LatLng>();

  useEffect(() => {
    if (!geocodingLibrary) return;

    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingLibrary]);

  useEffect(() => {
    if (!geocodingService || !address) return;

    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK") {
        setGeoPosition(results[0].geometry.location);
      }
    });
  }, [geocodingService, address]);

  if (!geocodingService || !geoPosition) return;

  return (
    <Map
      center={geoPosition}
      zoom={10}
      style={{ minWidth: 500, minHeight: 500 }}
    >
      <Marker position={geoPosition} />
    </Map>
  );
}
export default MapWindow;
