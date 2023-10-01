import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MarkerMap from "./Marker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function OpenStreetMapLoader() {
  const event = useSelector((state: RootState) => state.createEvent);
  const [lat, setLat] = useState(-6.2);
  const [long, setLong] = useState(106.816666);

  useEffect(() => {
    if (event.latitude && event.longitude) {
      setLat(parseFloat(event.latitude));
      setLong(parseFloat(event.longitude));
    }
  }, [event.latitude, event.longitude]);

  const mapDimensions = { width: "100%", height: "300px", zIndex: 0 };
  const center = {
    lat: event.latitude ? parseFloat(event.latitude) : lat,
    lng: event.longitude ? parseFloat(event.longitude) : long,
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
