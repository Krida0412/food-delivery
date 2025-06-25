import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker hilang di React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SetViewToUser = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 16);
  }, [coords, map]);
  return null;
};

const UserMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error('Gagal ambil lokasi:', err);
      },
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <div className="w-full px-0 py-0 sm:py-0 mt-4">
      <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4">
        <div className="flex flex-row items-center justify-between mb-3 space-y-2 sm:space-y-0">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Lokasi Kamu
            </h3>
          </div>
          <div className="text-xs sm:text-sm px-3 py-1 bg-orange-100 text-orange-600 rounded-full font-medium text-center w-fit">
            GPS Aktif
          </div>
        </div>

        <div className="w-full h-36 sm:h-48 md:h-56 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
          <MapContainer
            center={position || [-6.2, 106.8]}
            zoom={15}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            />
            {position && (
              <>
                <Marker position={position}>
                  <Popup>Ini lokasi kamu sekarang</Popup>
                </Marker>
                <SetViewToUser coords={position} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default UserMap;
