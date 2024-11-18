import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useEffect, useState } from "react";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [lat, lng] = useUrlLocation();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    console.log(geoLocationPosition);
  }, [geoLocationPosition]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={6}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <button
        onClick={getPosition}
        className="bg-blue-900 cursor-pointer shadow-lg text-gray-50 font-semibold px-4 py-1 absolute left-2 bottom-2 z-1002 rounded-xl"
      >
        {isLoadingPosition ? "Loading ..." : " Use Your Location"}
      </button>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DetectClick />
      <ChangeCenter position={mapCenter} />
      {markerLocations.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>{item.host_location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
