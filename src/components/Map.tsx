import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import locationIcon from '../assets/location.png';
import { useNavigate } from 'react-router-dom';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const customIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
}

function SetViewToCurrentLocation() {
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 16);
      },
      () => {
        console.warn('Could not get location');
      }
    );
  }, [map]);

  return null;
}

const MyMap = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [markedLocation, setMarkedLocation] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchAddress = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat,
          lon: lng,
          format: 'json',
          addressdetails: 1
        }
      });

      setMarkedLocation({
        lat,
        lng,
        address: res.data.display_name || 'Address not found'
      });
    } catch (err) {
      console.error('Error fetching address', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        fetchAddress(coords[0], coords[1]);
      },
      () => {
        console.warn('Could not get location');
      }
    );
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <MapContainer
        center={position || [0, 0]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        dragging={false}
        touchZoom={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <SetViewToCurrentLocation />

        {position && (
          <>
            <Marker position={position} icon={customIcon}></Marker>
            <Circle
              center={position}
              radius={200}
              pathOptions={{ color: 'blue', fillColor: '#3b82f6', fillOpacity: 0.2 }}
            />
          </>
        )}
      </MapContainer>

      <button
        className="absolute top-5 left-4 z-[1000] bg-white rounded-full p-2 shadow-md"
        onClick={() => navigate('/home')}
      >
        ←
      </button>
      <div
        className="absolute bottom-28 right-4 z-[1000] bg-white p-3 rounded-full shadow-md text-xl cursor-default"
      >
        📍
      </div>
      {markedLocation && (
        <div className="absolute bottom-0 w-full bg-white p-4 rounded-t-2xl shadow-lg z-[1000]">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <span className="text-blue-500">📍</span>
            You are marking in from
          </p>
          <p className="text-sm mt-2 text-gray-800 font-medium">{markedLocation.address}</p>
          <button className="mt-4 w-full py-3 bg-blue-600 text-white rounded-full text-base font-semibold">
            Mark in
          </button>
        </div>
      )}
    </div>
  );
};

export default MyMap;
