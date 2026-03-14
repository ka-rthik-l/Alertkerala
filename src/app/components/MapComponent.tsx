import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  center: [number, number];
  name: string;
  age?: number;
  location?: string;
  time?: string;
  sightings?: number;
  alertId?: number;
}

export function MapComponent({ center, name, age, location, time, sightings, alertId }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  function buildPopupHTML(n: string, a?: number, loc?: string, t?: string, s?: number, id?: number) {
    return `
      <div style="background:#09090b;border:2px solid #3F3F46;color:#fff;font-family:monospace;padding:0;min-width:220px;max-width:260px;">
        <div style="border-bottom:2px solid #3F3F46;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:10px;letter-spacing:0.12em;color:#ef4444;">● ACTIVE ALERT</span>
          <span style="font-size:10px;color:#6b7280;letter-spacing:0.08em;">#${id ?? 1}</span>
        </div>
        <div style="padding:14px;">
          <div style="font-size:15px;font-weight:bold;letter-spacing:0.06em;margin-bottom:4px;">${n.toUpperCase()}</div>
          ${a ? `<div style="font-size:11px;color:#9ca3af;letter-spacing:0.08em;margin-bottom:10px;">AGE ${a}</div>` : ""}
          ${loc ? `<div style="display:flex;align-items:center;gap:6px;font-size:10px;color:#d1d5db;margin-bottom:5px;letter-spacing:0.06em;">
            <span style="color:#DFE104;">⊙</span> ${loc.toUpperCase()}
          </div>` : ""}
          ${t ? `<div style="display:flex;align-items:center;gap:6px;font-size:10px;color:#d1d5db;margin-bottom:5px;letter-spacing:0.06em;">
            <span style="color:#9ca3af;">◷</span> MISSING ${t}
          </div>` : ""}
          ${s !== undefined ? `<div style="display:flex;align-items:center;gap:6px;font-size:10px;color:#d1d5db;margin-bottom:14px;letter-spacing:0.06em;">
            <span style="color:#9ca3af;">◉</span> ${s} SIGHTINGS
          </div>` : ""}
          <a href="/response/${id ?? 1}" style="
            display:block;text-align:center;
            background:#DFE104;color:#000;
            font-size:10px;font-weight:bold;
            letter-spacing:0.12em;
            padding:8px 0;
            text-decoration:none;
            text-transform:uppercase;
          ">VIEW RESPONSE PAGE →</a>
        </div>
      </div>`;
  }

  // Initialize map on first render
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom: 14,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
    }).addTo(map);

    // Custom icon
    const icon = L.divIcon({
      html: `<div style="
        width:20px;height:20px;background:red;
        border:3px solid #fff;
        box-shadow:0 0 10px rgba(255,0,0,0.8);
        cursor:pointer;
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: "",
    });

    const marker = L.marker(center, { icon }).addTo(map);
    marker.bindPopup(buildPopupHTML(name, age, location, time, sightings, alertId), {
      closeButton: true,
      className: "brutalist-profile-popup",
      maxWidth: 280,
    });

    const circle = L.circle(center, {
      color: "red",
      fillColor: "transparent",
      fillOpacity: 0,
      dashArray: "10,10",
      weight: 2,
      radius: 2000,
    }).addTo(map);

    mapInstanceRef.current = map;
    markerRef.current = marker;
    circleRef.current = circle;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map when center / alert changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.closePopup();
    mapInstanceRef.current.setView(center, 14, { animate: true });
    markerRef.current?.setLatLng(center);
    markerRef.current?.getPopup()?.setContent(
      buildPopupHTML(name, age, location, time, sightings, alertId)
    );
    circleRef.current?.setLatLng(center);
  }, [center, name, age, location, time, sightings, alertId]);

  return (
    <>
      <div ref={mapRef} className="absolute inset-0" style={{ zIndex: 0 }} />
      <style>{`
        .leaflet-layer {
          filter: grayscale(100%) contrast(1.2) sepia(10%) hue-rotate(155deg) brightness(0.75);
        }
        .brutalist-profile-popup .leaflet-popup-content-wrapper {
          background: #09090b !important;
          border: 2px solid #3F3F46 !important;
          border-radius: 0 !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.8) !important;
          color: white !important;
          padding: 0 !important;
        }
        .brutalist-profile-popup .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .brutalist-profile-popup .leaflet-popup-tip {
          background: #3F3F46 !important;
        }
        .brutalist-profile-popup .leaflet-popup-close-button {
          color: #6b7280 !important;
          font-size: 18px !important;
          top: 6px !important;
          right: 8px !important;
          z-index: 10;
        }
        .brutalist-profile-popup .leaflet-popup-close-button:hover {
          color: #fff !important;
        }
        .leaflet-container { background: #18181b !important; }
      `}</style>
    </>
  );
}
