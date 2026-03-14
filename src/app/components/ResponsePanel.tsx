import { Link, useParams } from "react-router";
import { Shield, MapPin, Users, Activity, Eye, Clock, ArrowLeft, TrendingUp, CheckCircle, AlertCircle, Maximize2, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.js";
import Marquee from "react-fast-marquee";
import { SightingsMap } from "./SightingsMap.js";
import { useState } from "react";
import { useAlerts, type Alert } from "../context/AlertContext.js";

export function ResponsePanel() {
  const { id } = useParams<{ id: string }>();
  const [mapExpanded, setMapExpanded] = useState(false);
  const { alerts } = useAlerts();

  const personData = alerts.find((a: Alert) => a.id === (id || "1")) || alerts[0];
  const displaySightings = personData?.sightings || [];

  if (!personData) {
    return <div className="p-8 text-center text-muted-foreground uppercase tracking-wide">Alert not found</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-[#3F3F46] bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-muted-foreground hover:text-[#DFE104] transition-colors"
              >
                <ArrowLeft className="w-8 h-8" />
              </Link>
              <div>
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-6 md:mt-8">
                  <Link to={`/sighting/${id || 1}`} className="w-full bg-[#3F3F46] text-white py-4 flex items-center justify-center gap-3 hover:bg-[#DFE104] hover:text-black transition-colors group">
                    <Eye className="w-5 h-5" />
                    <span className="font-bold md:text-lg">LOG SIGHTING</span>
                  </Link>
                  <Link to={`/analysis/${id || 1}`} className="w-full bg-foreground text-background py-4 flex items-center justify-center gap-3 hover:bg-[#DFE104] hover:text-black transition-colors group">
                    <Activity className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="font-bold md:text-lg text-center">AI PREDICTIONS</span>
                  </Link>
                </div>
                <h1 className="text-3xl md:text-4xl">RESPONSE PANEL</h1>
                <p className="text-sm text-muted-foreground normal-case tracking-normal">Real-Time Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#DFE104] text-black px-4 py-2 text-sm">
              <Activity className="w-4 h-4 animate-pulse" />
              LIVE
            </div>
          </div>
        </div>

        {/* Live Stats Marquee */}
        <div className="bg-muted border-t-2 border-b-2 border-[#3F3F46] py-4">
          {/* @ts-ignore */}
          <Marquee speed={60} gradient={false}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-8">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#DFE104]">{personData.metrics.notified}</span>
                  <span className="text-sm uppercase tracking-wide">NOTIFIED</span>
                </div>
                <span className="text-2xl text-muted-foreground">●</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#DFE104]">{personData.metrics.sightings}</span>
                  <span className="text-sm uppercase tracking-wide">SIGHTINGS</span>
                </div>
                <span className="text-2xl text-muted-foreground">●</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#DFE104]">{personData.metrics.active}</span>
                  <span className="text-sm uppercase tracking-wide">ACTIVE</span>
                </div>
                <span className="text-2xl text-muted-foreground">●</span>
              </div>
            ))}
          </Marquee>
        </div>
      </header>

      <div className="p-6">
        {/* Alert Info */}
        <div className="border-2 border-[#3F3F46] bg-background p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-muted flex-shrink-0">
              <ImageWithFallback
                src={personData.image}
                alt="Missing person"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-4xl mb-2">{personData.name}, AGE {personData.age}</h2>
                  <div className="flex items-center gap-4 text-muted-foreground normal-case">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {personData.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Missing {personData.time}
                    </div>
                  </div>
                </div>
                <div className="bg-destructive px-4 py-2 text-xs">ACTIVE</div>
              </div>
              <p className="text-lg text-muted-foreground normal-case">
                {personData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-px bg-[#3F3F46] mb-8">
          <div className="bg-background p-8 group hover:bg-[#DFE104] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-12 h-12 group-hover:text-black transition-colors" />
              <TrendingUp className="w-6 h-6 text-[#DFE104] group-hover:text-black transition-colors" />
            </div>
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">{personData.metrics.notified}</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Notified</div>
          </div>

          <div className="bg-background p-8 group hover:bg-[#DFE104] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-12 h-12 group-hover:text-black transition-colors" />
              <TrendingUp className="w-6 h-6 text-[#DFE104] group-hover:text-black transition-colors" />
            </div>
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">{personData.metrics.sightings}</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Sightings</div>
          </div>

          <div className="bg-background p-8 group hover:bg-[#DFE104] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-12 h-12 group-hover:text-black transition-colors" />
              <TrendingUp className="w-6 h-6 text-[#DFE104] group-hover:text-black transition-colors" />
            </div>
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">{personData.metrics.verified}</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Verified</div>
          </div>

          <div className="bg-background p-8 group hover:bg-[#DFE104] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-12 h-12 group-hover:text-black transition-colors" />
              <div className="text-xs px-2 py-1 bg-muted group-hover:bg-black/20 transition-colors">5KM</div>
            </div>
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">{personData.metrics.radius}</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Radius (km)</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Interactive Sightings Heatmap */}
          <div className="col-span-2 border-2 border-[#3F3F46] bg-background p-8">
            <h3 className="text-3xl mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-destructive" />
              SIGHTINGS HEATMAP
              <button
                onClick={() => setMapExpanded(true)}
                className="ml-auto flex items-center gap-2 border-2 border-[#3F3F46] hover:border-[#DFE104] text-muted-foreground hover:text-[#DFE104] px-3 py-1.5 text-xs font-bold tracking-wide transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
                EXPAND
              </button>
            </h3>
            <div className="relative w-full" style={{ height: "340px" }}>
              {!mapExpanded && <SightingsMap sightings={displaySightings} />}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive"></div>
                <span className="text-muted-foreground normal-case">Last seen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#DFE104]"></div>
                <span className="text-muted-foreground normal-case">Verified sighting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted-foreground"></div>
                <span className="text-muted-foreground normal-case">Unverified</span>
              </div>
            </div>
          </div>

          {/* Recent Sightings Feed */}
          <div className="border-2 border-[#3F3F46] bg-background p-8">
            <h3 className="text-2xl mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-[#DFE104]" />
              RECENT SIGHTINGS
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
              {displaySightings.map((s: any, i: number) => (
                <div key={i} className={`bg-muted p-4 border-2 ${s.isLastSeen ? "border-destructive" : s.verified ? "border-[#DFE104]/40" : "border-[#3F3F46]"} flex flex-col gap-2`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {s.isLastSeen
                        ? <AlertCircle className="w-4 h-4 text-destructive" />
                        : <Eye className="w-4 h-4 text-[#DFE104]" />}
                      <span className="text-sm font-bold tracking-wide">
                        {s.isLastSeen ? "LAST SEEN" : "SIGHTING"}
                      </span>
                    </div>
                    {s.verified
                      ? <span className="text-xs bg-[#DFE104] text-black px-2 py-0.5 font-bold">VERIFIED</span>
                      : <span className="text-xs border border-[#3F3F46] text-muted-foreground px-2 py-0.5">UNVERIFIED</span>}
                  </div>
                  <div className="text-sm text-foreground font-bold normal-case">{s.label}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="normal-case">{s.lat.toFixed(4)}°N, {s.lng.toFixed(4)}°E</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="normal-case">{s.time} ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="mt-8 border-2 border-[#3F3F46] bg-background p-8">
          <h3 className="text-2xl mb-8">ENGAGEMENT METRICS</h3>
          <div className="grid grid-cols-6 gap-8">
            {[
              { value: personData.metrics.notified, label: "Notified" },
              { value: personData.metrics.viewed, label: "Viewed" },
              { value: personData.metrics.shared, label: "Shared" },
              { value: personData.metrics.active, label: "Active" },
              { value: personData.metrics.sightings, label: "Sightings" },
              { value: personData.metrics.rate, label: "Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-[#DFE104] mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Map Overlay */}
      {mapExpanded && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl h-[85vh] border-2 border-[#3F3F46] bg-background flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#3F3F46] flex-shrink-0">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-destructive" />
                <span className="text-xl font-bold tracking-wide">SIGHTINGS HEATMAP — FULL VIEW</span>
              </div>
              <button
                onClick={() => setMapExpanded(false)}
                className="flex items-center gap-2 border-2 border-[#3F3F46] hover:border-destructive text-muted-foreground hover:text-destructive px-3 py-1.5 text-xs font-bold tracking-wide transition-colors"
              >
                <X className="w-4 h-4" />
                CLOSE
              </button>
            </div>
            <div className="flex-1 relative">
              <SightingsMap sightings={displaySightings} />
            </div>
            <div className="flex items-center gap-6 px-6 py-4 border-t-2 border-[#3F3F46] text-sm flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive"></div>
                <span className="text-muted-foreground normal-case">Last seen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#DFE104]"></div>
                <span className="text-muted-foreground normal-case">Verified sighting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted-foreground"></div>
                <span className="text-muted-foreground normal-case">Unverified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
