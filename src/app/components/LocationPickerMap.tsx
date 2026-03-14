import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationPickerMapProps {
  initialCenter: [number, number];
  radiusKm: number;
  onChange: (coords: [number, number]) => void;
}

export function LocationPickerMap({ initialCenter, radiusKm, onChange }: LocationPickerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  // Initialize map on first render
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: initialCenter,
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: false, // Prevent accidental scrolling when page scrolling
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
    }).addTo(map);

    // Custom brutalist icon
    const icon = L.divIcon({
      html: `<div style="
        width:24px;height:24px;background:red;
        border:4px solid #DFE104;
        box-shadow:0 0 15px rgba(255,0,0,0.8);
        border-radius:50%;
        cursor:pointer;
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      className: "",
    });

    // Initial Marker
    const marker = L.marker(initialCenter, { icon, draggable: true }).addTo(map);
    
    // Initial Radius Circle
    const circle = L.circle(initialCenter, {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.1,
      dashArray: "10,10",
      weight: 2,
      radius: radiusKm * 1000,
    }).addTo(map);

    // Handle Map Clicks to move the pin
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      circle.setLatLng([lat, lng]);
      onChange([lat, lng]);
    });

    // Handle Marker Dragging
    marker.on("dragend", (e) => {
      const { lat, lng } = e.target.getLatLng();
      circle.setLatLng([lat, lng]);
      onChange([lat, lng]);
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;
    circleRef.current = circle;

    // Force a resize after mount to ensure map fills container properly
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync radius circle with prop changes
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radiusKm * 1000);
    }
  }, [radiusKm]);

  return (
    <>
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px] z-10 relative cursor-crosshair"
      />
      <style>{`
        .leaflet-layer {
          filter: grayscale(100%) contrast(1.2) sepia(10%) hue-rotate(155deg) brightness(0.75);
        }
        .leaflet-container { background: #18181b !important; }
        /* Style the zoom controls to match the brutalist aesthetic */
        .leaflet-bar a {
          background-color: #3F3F46 !important;
          color: white !important;
          border-bottom: 1px solid #18181b !important;
        }
        .leaflet-bar a:hover {
          background-color: #DFE104 !important;
          color: black !important;
        }
      `}</style>
    </>
  );
}
