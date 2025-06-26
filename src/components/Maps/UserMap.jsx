import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- Fix icon hilang ---------- */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/* ---------- Warna tema ---------- */
const PRIMARY = "#FE724C";
const SECONDARY = "#FFD36E";
const ACCENT_BG = "#F3F6FF";

/* ---------- Helper: atur peta ke koordinat user ---------- */
const SetViewToUser = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 16);
  }, [coords, map]);
  return null;
};

function UserMap() {
  const [position, setPosition] = useState(null);

  /* Ambil lokasi sekali saat mount */
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) return;

    geo.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error("Gagal ambil lokasi:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="w-full px-0 mt-6">
      {/* ---------- Card wrapper ---------- */}
      <div
        className="
          relative
          rounded-[1.618rem]            /* rasio emas radius */
          backdrop-blur-md
          bg-white/80
          shadow-[0_8px_24px_rgba(0,0,0,0.06)]
          border border-white/40
          overflow-hidden
        "
        style={{ aspectRatio: "1 / 0.618" }} /* card height = width × φ-1 */
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-lg font-semibold text-[#363636]">
            Lokasi Kamu
          </h3>
          <span
            className="
              text-xs font-medium
              px-3 py-1
              rounded-full
            "
            style={{
              backgroundColor: SECONDARY + "33", /* 20% opacity */
              color: PRIMARY,
            }}
          >
            {position ? "GPS Aktif" : "Mendeteksi..."}
          </span>
        </div>

        {/* Map container (ratio emas dalam card) */}
        <div className="w-full h-full">
          <MapContainer
            center={position || [-6.2, 106.8]}
            zoom={15}
            zoomControl={false}
            scrollWheelZoom={false}
            attributionControl={false}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

        {/* Decorative accent pill (opsional) */}
        <span
          className="
            absolute -top-6 -right-6 w-20 h-20
            rounded-full
            mix-blend-multiply
            opacity-30
            blur-lg
          "
          style={{ backgroundColor: ACCENT_BG }}
        />
      </div>
    </div>
  );
}

export default UserMap;
