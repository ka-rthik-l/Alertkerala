import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface Sighting {
  id: number;
  label: string;
  lat: number;
  lng: number;
  verified: boolean;
  isLastSeen?: boolean;
}

interface SightingsMapProps {
  sightings: Sighting[];
}

export function SightingsMap({ sightings }: SightingsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Center on average of sighting coords
    const avgLat = sightings.reduce((s, p) => s + p.lat, 0) / sightings.length;
    const avgLng = sightings.reduce((s, p) => s + p.lng, 0) / sightings.length;

    const map = L.map(mapRef.current, {
      center: [avgLat, avgLng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
    }).addTo(map);

    sightings.forEach((s) => {
      // Heatmap layer: concentric circles simulating heat intensity
      if (!s.isLastSeen) {
        // outer glow
        L.circle([s.lat, s.lng], {
          radius: 800,
          color: "transparent",
          fillColor: s.verified ? "#DFE104" : "#6b7280",
          fillOpacity: 0.08,
          weight: 0,
        }).addTo(map);
        L.circle([s.lat, s.lng], {
          radius: 400,
          color: "transparent",
          fillColor: s.verified ? "#DFE104" : "#6b7280",
          fillOpacity: 0.15,
          weight: 0,
        }).addTo(map);
        L.circle([s.lat, s.lng], {
          radius: 150,
          color: "transparent",
          fillColor: s.verified ? "#DFE104" : "#6b7280",
          fillOpacity: 0.35,
          weight: 0,
        }).addTo(map);
      } else {
        // Last seen: red heat
        L.circle([s.lat, s.lng], {
          radius: 900,
          color: "transparent",
          fillColor: "#ef4444",
          fillOpacity: 0.08,
          weight: 0,
        }).addTo(map);
        L.circle([s.lat, s.lng], {
          radius: 450,
          color: "transparent",
          fillColor: "#ef4444",
          fillOpacity: 0.18,
          weight: 0,
        }).addTo(map);
        L.circle([s.lat, s.lng], {
          radius: 180,
          color: "transparent",
          fillColor: "#ef4444",
          fillOpacity: 0.45,
          weight: 0,
        }).addTo(map);
      }

      // Sharp marker square via divIcon
      const icon = L.divIcon({
        html: `<div style="
          width:14px;height:14px;
          background:${s.isLastSeen ? "red" : s.verified ? "#DFE104" : "#6b7280"};
          border:2px solid rgba(255,255,255,0.6);
          box-shadow:0 0 ${s.isLastSeen ? 14 : 8}px ${s.isLastSeen ? "rgba(255,0,0,0.9)" : s.verified ? "rgba(223,225,4,0.8)" : "rgba(120,120,120,0.5)"};
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: "",
      });

      L.marker([s.lat, s.lng], { icon })
        .addTo(map)
        .bindTooltip(s.label, {
          permanent: true,
          direction: "top",
          offset: [0, -10],
          className: "brutalist-label",
        })
        .bindPopup(
          `<div style="background:#09090b;border:2px solid #3F3F46;color:#fff;font-family:monospace;font-size:10px;padding:6px;letter-spacing:0.1em;text-transform:uppercase;min-width:140px;">
            <div style="color:${s.isLastSeen ? "red" : s.verified ? "#DFE104" : "#9ca3af"};margin-bottom:3px;">${s.isLastSeen ? "LAST SEEN" : s.verified ? "✓ VERIFIED" : "UNVERIFIED"}</div>
            <div style="font-size:11px;color:#fff;">${s.label}</div>
          </div>`,
          { closeButton: false, className: "brutalist-popup" }
        );
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: "320px" }} />
      <style>{`
        .leaflet-layer {
          filter: grayscale(100%) contrast(1.2) sepia(5%) brightness(0.7);
        }
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #09090b !important;
          border: 2px solid #3F3F46 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          color: white !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-close-button { color: #fff !important; }
        .leaflet-container { background: #18181b !important; }
        .leaflet-control-zoom a {
          background: #09090b !important;
          color: #DFE104 !important;
          border: 1px solid #3F3F46 !important;
          border-radius: 0 !important;
        }
        .leaflet-control-zoom a:hover { background: #3F3F46 !important; }
        /* Permanent label cards */
        .brutalist-label {
          background: #09090b !important;
          border: 1.5px solid #3F3F46 !important;
          border-radius: 0 !important;
          color: #fff !important;
          font-family: monospace !important;
          font-size: 10px !important;
          font-weight: bold !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          padding: 3px 7px !important;
          box-shadow: none !important;
          white-space: nowrap !important;
        }
        .brutalist-label::before {
          border-top-color: #3F3F46 !important;
        }
      `}</style>
    </>
  );
}
