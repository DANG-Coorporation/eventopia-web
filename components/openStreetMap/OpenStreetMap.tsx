import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MarkerMap from "./Marker";

export default function OpenStreetMapLoader() {
  const lat = -6.2;
  const long = 106.816666;

  const mapDimensions = { width: "100%", height: "300px" };
  const center = {
    lat: lat,
    lng: long,
  };

  const Recenter = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
  };

  return (
    <>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={16}
        scrollWheelZoom={false}
        style={mapDimensions}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <MarkerMap lat={lat} long={long} />
        <Recenter lat={lat} lng={long} />
      </MapContainer>
    </>
  );
}
