import { Link } from "react-router";
import { Shield, MapPin, Users, Activity, Eye, Clock, ArrowLeft, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Marquee from "react-fast-marquee";

export function ResponsePanel() {
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
          <Marquee speed={60} gradient={false}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-8">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#DFE104]">1,243</span>
                  <span className="text-sm uppercase tracking-wide">NOTIFIED</span>
                </div>
                <span className="text-2xl text-muted-foreground">●</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#DFE104]">3</span>
                  <span className="text-sm uppercase tracking-wide">SIGHTINGS</span>
                </div>
                <span className="text-2xl text-muted-foreground">●</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#DFE104]">143</span>
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
                src="https://images.unsplash.com/photo-1741805190461-eeda3ba59bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGQlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc3MzQ1ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Missing person"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-4xl mb-2">AARAV KUMAR, AGE 8</h2>
                  <div className="flex items-center gap-4 text-muted-foreground normal-case">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Marine Drive, Kochi
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Missing 2h 14m
                    </div>
                  </div>
                </div>
                <div className="bg-destructive px-4 py-2 text-xs">ACTIVE</div>
              </div>
              <p className="text-lg text-muted-foreground normal-case">
                Blue t-shirt with cartoon character, khaki shorts, red sneakers. Brown hair, medium complexion.
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
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">1,243</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Notified</div>
          </div>

          <div className="bg-background p-8 group hover:bg-[#DFE104] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-12 h-12 group-hover:text-black transition-colors" />
              <TrendingUp className="w-6 h-6 text-[#DFE104] group-hover:text-black transition-colors" />
            </div>
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">3</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Sightings</div>
          </div>

          <div className="bg-background p-8 group hover:bg-[#DFE104] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-12 h-12 group-hover:text-black transition-colors" />
              <TrendingUp className="w-6 h-6 text-[#DFE104] group-hover:text-black transition-colors" />
            </div>
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">143</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Active</div>
          </div>

          <div className="bg-background p-8 group hover:bg-[#DFE104] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-12 h-12 group-hover:text-black transition-colors" />
              <div className="text-xs px-2 py-1 bg-muted group-hover:bg-black/20 transition-colors">5KM</div>
            </div>
            <div className="text-5xl font-bold mb-2 group-hover:text-black transition-colors">2.8</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-black/80 transition-colors">Radius (km)</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Heatmap */}
          <div className="col-span-2 border-2 border-[#3F3F46] bg-background p-8">
            <h3 className="text-3xl mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-destructive" />
              SIGHTINGS HEATMAP
            </h3>
            <div className="relative aspect-video bg-muted flex items-center justify-center">
              <div className="text-[10rem] font-bold text-muted-foreground/10 absolute">MAP</div>
              
              {/* Center Point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-48 bg-destructive/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-destructive"></div>
                </div>
              </div>

              {/* Sightings */}
              <div className="absolute top-1/3 left-1/4">
                <div className="w-32 h-32 bg-[#DFE104]/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#DFE104] animate-pulse"></div>
                </div>
              </div>

              <div className="absolute top-2/3 left-1/3">
                <div className="w-24 h-24 bg-[#DFE104]/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#DFE104] animate-pulse"></div>
                </div>
              </div>

              <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-muted-foreground animate-pulse"></div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive"></div>
                <span className="text-muted-foreground normal-case">Last seen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#DFE104]"></div>
                <span className="text-muted-foreground normal-case">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted-foreground"></div>
                <span className="text-muted-foreground normal-case">Unverified</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="border-2 border-[#3F3F46] bg-background p-8">
            <h3 className="text-2xl mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-[#DFE104]" />
              ACTIVITY
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[
                { type: "sighting", location: "Kaloor Stadium", time: "2m" },
                { type: "view", count: 243, time: "3m" },
                { type: "sighting", location: "Edappally Junction", time: "15m" },
                { type: "share", count: 89, time: "18m" },
                { type: "sighting", location: "Palarivattom", time: "28m" },
              ].map((activity, i) => (
                <div key={i} className="bg-muted p-4 border-2 border-[#3F3F46]">
                  {activity.type === "sighting" && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-[#DFE104]" />
                        <span className="text-sm">SIGHTING</span>
                      </div>
                      <div className="text-sm text-muted-foreground normal-case">{activity.location}</div>
                      <div className="text-xs text-muted-foreground mt-1 normal-case">{activity.time} ago</div>
                    </div>
                  )}
                  {activity.type === "view" && (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{activity.count} VIEWS</span>
                      </div>
                      <div className="text-xs text-muted-foreground normal-case">{activity.time} ago</div>
                    </div>
                  )}
                  {activity.type === "share" && (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{activity.count} SHARES</span>
                      </div>
                      <div className="text-xs text-muted-foreground normal-case">{activity.time} ago</div>
                    </div>
                  )}
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
              { value: "1,243", label: "Notified" },
              { value: "892", label: "Viewed" },
              { value: "456", label: "Shared" },
              { value: "143", label: "Active" },
              { value: "3", label: "Sightings" },
              { value: "71.8%", label: "Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-[#DFE104] mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
