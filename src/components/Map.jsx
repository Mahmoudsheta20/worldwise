import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CititsContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
const Map = () => {
  const { cities } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading: isLoadingPostion,
    position: geolocation,
    getPosition,
  } = useGeolocation();
  const [mapPostion, setMapPostion] = useState([40, 0]);
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  useEffect(() => {
    mapLat && mapLng && setMapPostion([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  useEffect(() => {
    geolocation && setMapPostion([geolocation.lat, geolocation.lng]);
  }, [geolocation]);
  return (
    <div className={styles.mapContainer}>
      {!geolocation && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPostion ? "Loading..." : "Use your postion"}
        </Button>
      )}
      <MapContainer
        center={mapPostion}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPostion} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};
const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
};
export default Map;
