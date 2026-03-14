import React, { useState } from "react";
import { Link } from "react-router";
import { Shield, MapPin, Eye, Users, Clock, Activity, AlertCircle, Radio } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapComponent } from "./MapComponent";
import { useAlerts, type Alert } from "../context/AlertContext";

export function AuthorityDashboard() {
  const { alerts: activeAlerts } = useAlerts();

  const [selectedAlertId, setSelectedAlertId] = useState<string>("1");
  const selectedAlert = activeAlerts.find((a: Alert) => a.id === selectedAlertId) || activeAlerts[0];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col uppercase">
      {/* Header */}
      <header className="border-b-2 border-[#3F3F46] bg-background relative z-10 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#DFE104]" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">ALERTKERALA COMMAND CENTER</h1>
                <div className="text-sm text-muted-foreground tracking-wide">Authority Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 border-2 border-[#DFE104] text-[#DFE104] px-4 py-2 text-sm font-bold tracking-wide">
                <Activity className="w-4 h-4 animate-pulse relative -top-[1px]" />
                SYSTEM ACTIVE
              </div>
              <Link 
                to="/report"
                className="bg-destructive text-destructive-foreground px-6 py-2 text-sm font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 border-2 border-destructive"
              >
                <AlertCircle className="w-4 h-4" />
                NEW ALERT
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="border-t-2 border-[#3F3F46] bg-background">
          <div className="grid grid-cols-5 divide-x-2 divide-[#3F3F46]">
            <div className="px-6 py-4 text-center group hover:bg-[#3F3F46]/50 transition-colors">
              <div className="text-3xl font-bold mb-1 text-[#DFE104]">2</div>
              <div className="text-xs tracking-wide text-muted-foreground">ACTIVE ALERTS</div>
            </div>
            <div className="px-6 py-4 text-center group hover:bg-[#3F3F46]/50 transition-colors">
              <div className="text-3xl font-bold mb-1 text-foreground">4</div>
              <div className="text-xs tracking-wide text-muted-foreground">TOTAL SIGHTINGS</div>
            </div>
            <div className="px-6 py-4 text-center group hover:bg-[#3F3F46]/50 transition-colors">
              <div className="text-3xl font-bold mb-1 text-foreground">45</div>
              <div className="text-xs tracking-wide text-muted-foreground">CIVILIANS NOTIFIED</div>
            </div>
            <div className="px-6 py-4 text-center group hover:bg-[#3F3F46]/50 transition-colors">
              <div className="text-3xl font-bold mb-1 text-foreground">12</div>
              <div className="text-xs tracking-wide text-muted-foreground">ACTIVE RESPONDERS</div>
            </div>
            <div className="px-6 py-4 text-center group hover:bg-[#3F3F46]/50 transition-colors">
              <div className="text-3xl font-bold mb-1 text-foreground">4.2S</div>
              <div className="text-xs tracking-wide text-muted-foreground">AVG RESPONSE</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar Menu */}
        <div className="w-96 border-r-2 border-[#3F3F46] bg-background overflow-y-auto flex flex-col scrollbar-hide flex-shrink-0">
          {/* Active Alerts */}
          <div className="p-6 border-b-2 border-[#3F3F46]">
            <h2 className="text-lg tracking-wide text-muted-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              ACTIVE ALERTS
            </h2>
            <div className="space-y-4">
              {activeAlerts.map((alert: Alert) => (
                <button
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`block border-2 w-full text-left bg-background p-4 group transition-colors relative ${selectedAlertId === alert.id ? 'border-[#DFE104]' : 'border-[#3F3F46] hover:border-[#DFE104]/50'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xl font-bold tracking-tight text-foreground group-hover:text-[#DFE104] transition-colors">{alert.name}</div>
                      <div className="text-sm text-muted-foreground tracking-wide mt-1">AGE {alert.age}</div>
                    </div>
                    <div className="text-xs border-2 border-destructive text-destructive px-2 py-1 font-bold tracking-wide animate-pulse">
                      ACTIVE
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 normal-case tracking-wide">
                    <MapPin className="w-4 h-4 text-[#DFE104]" />
                    <span className="uppercase">{alert.location}</span>
                  </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-bold border-t-2 border-[#3F3F46] pt-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {alert.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {alert.metrics?.sightings || 0} SIGHTINGS
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Main Map Area */}
          <div className="flex-1 relative bg-[#18181b]">
            <div className="absolute inset-0 z-0">
              <MapComponent
                center={selectedAlert?.coordinates || [9.9796, 76.2796]}
                name={selectedAlert?.name || "Loading..."}
                age={selectedAlert?.age || 0}
                location={selectedAlert?.location || ""}
                time={selectedAlert?.time || ""}
                sightings={selectedAlert?.metrics?.sightings || 0}
                alertId={Number(selectedAlert?.id) || 1}
              />
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3F3F46_1px,transparent_1px),linear-gradient(to_bottom,#3F3F46_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-10"></div>
          </div>

          {/* Overlays rendering ON TOP of map container */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Map Controls */}
            <div className="absolute top-6 left-6 border-2 border-[#3F3F46] bg-background/90 backdrop-blur-md p-4 pointer-events-auto">
              <div className="text-sm font-bold text-muted-foreground mb-4 tracking-wide border-b-2 border-[#3F3F46] pb-2">MAP LEGEND</div>
              <div className="space-y-4 text-xs font-bold tracking-wide">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-destructive"></div>
                  <span className="text-foreground">LAST SEEN LOCATION</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-destructive"></div>
                  <span className="text-foreground">SEARCH RADIUS</span>
                </div>
              </div>
            </div>

            {/* Live Updates Indicator */}
            <div className="absolute top-6 right-6 border-2 border-[#DFE104] bg-[#DFE104]/10 backdrop-blur px-4 py-3 flex items-center gap-3 pointer-events-auto">
              <Radio className="w-5 h-5 text-[#DFE104] animate-pulse" />
              <span className="text-sm font-bold text-[#DFE104] tracking-wide">LIVE UPDATES ACTIVE</span>
            </div>
            
            <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
               <Link to={`/response/${selectedAlert.id}`} className="bg-[#DFE104] text-black px-8 py-4 font-bold tracking-wider hover:scale-105 active:scale-95 transition-all text-lg flex items-center gap-2">
                 VIEW RESPONSES &rarr;
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
