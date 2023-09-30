import { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // Import the 'L' object
// import pinMap from "/public/images/openStreetMap/pinMap.svg";
interface MarkerMapProps {
  lat: number;
  long: number;
}

export default function MarkerMap({ lat, long }: MarkerMapProps) {
  // Static data for latitude and longitude
  lat = -6.2; // Replace with your desired latitude
  long = 106.816666; // Replace with your desired longitude

  const center = {
    lat: lat,
    lng: long,
  };

  let DefaultIcon = L.icon({
    iconUrl: "/images/openStreetMap/location-sign.png",
    iconSize: [32, 32], // Set the size of your custom icon
    iconAnchor: [16, 32], // Anchor point of the icon (centered, bottom)
    popupAnchor: [0, -32], // Anchor point for popups (top, centered)
  });

  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    setPosition({
      lat: lat,
      lng: long,
    });
  }, [lat, long]);

  const toggleDraggable = () => {
    setDraggable((d) => !d);
  };

  return (
    <>
      <Marker
        draggable={draggable} // Uncomment this line if you want to make the marker draggable
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef!}
        icon={DefaultIcon}
      >
        {/* <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup> */}
      </Marker>
    </>
  );
}
