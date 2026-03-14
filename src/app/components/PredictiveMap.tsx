import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface RouteData {
  id: string;
  name: string;
  probability: number;
  color: string;
  path: [number, number][]; // Array of lat/lng tuples drawing the route
}

interface PredictiveMapProps {
  center: [number, number];
  routes: RouteData[];
}

export function PredictiveMap({ center, routes }: PredictiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polylinesRef = useRef<L.Polyline[]>([]);
  const markerRef = useRef<L.Marker | null>(null);

  // Map Setup
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
    }).addTo(map);

    // Initial Center Marker (Last Known)
    const icon = L.divIcon({
      html: `<div style="
        width:20px;height:20px;background:red;
        border:3px solid #fff;
        box-shadow:0 0 10px rgba(255,0,0,0.8);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: "",
    });

    markerRef.current = L.marker(center, { icon }).addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Route Overlay Updates
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear old lines
    polylinesRef.current.forEach(line => line.remove());
    polylinesRef.current = [];

    // Recenter
    map.setView(center, 13);
    if (markerRef.current) {
        markerRef.current.setLatLng(center);
    }

    // Draw new lines
    routes.forEach(route => {
      // Draw a subtle wider background line for "glow"
      const glow = L.polyline(route.path, {
        color: route.color,
        weight: 12,
        opacity: 0.15,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Core Path Line
      const core = L.polyline(route.path, {
        color: route.color,
        weight: 4,
        opacity: 0.9,
        dashArray: "8, 12",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
      
      // Node at end of route
      const lastPoint = route.path[route.path.length - 1];
      if (lastPoint) {
         const endIcon = L.divIcon({
          html: `<div style="
            width:16px;height:16px;background:${route.color};
            border-radius:50%;
            border:2px solid #000;
          "></div>`,
          className: "",
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        const marker = L.marker(lastPoint, { icon: endIcon }).addTo(map);
        polylinesRef.current.push(glow, core, marker as any);
      } else {
        polylinesRef.current.push(glow, core);
      }
    });

  }, [center, routes]);

  return (
    <>
      <div ref={mapRef} className="absolute inset-0" style={{ zIndex: 0 }} />
      <style>{`
        .leaflet-layer {
          filter: grayscale(100%) contrast(1.2) sepia(10%) hue-rotate(155deg) brightness(0.75);
        }
        .leaflet-container { background: #18181b !important; }
        
        /* Dash animation for predictive feeling */
        path.leaflet-interactive {
          animation: dash 30s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}</style>
    </>
  );
}
