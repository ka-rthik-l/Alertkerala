import { useParams, Link } from "react-router";
import { ArrowLeft, BrainCircuit, Activity, Navigation, ExternalLink, MapPin } from "lucide-react";
import { useAlerts, type Alert } from "../context/AlertContext.js";
import { PredictiveMap, type RouteData } from "./PredictiveMap.js";

export function AiAnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const { alerts } = useAlerts();

  const personData = alerts.find((a: Alert) => a.id === (id || "1")) || alerts[0];

  if (!personData) {
    return <div className="p-8 text-center text-muted-foreground uppercase tracking-wide">Alert not found</div>;
  }

  // Generate generic predictive routes spreading out from the person's exact coordinates.
  const baseLat = personData.coordinates[0];
  const baseLng = personData.coordinates[1];

  const dummyRoutes: RouteData[] = [
    {
      id: "r1",
      name: "ROUTE A: INTERCITY TRANSIT",
      probability: 74,
      color: "#DFE104", // Brand Yellow
      path: [
        [baseLat, baseLng],
        [baseLat + 0.005, baseLng + 0.006],
        [baseLat + 0.008, baseLng + 0.015],
        [baseLat + 0.012, baseLng + 0.024],
        [baseLat + 0.025, baseLng + 0.030],
      ]
    },
    {
      id: "r2",
      name: "ROUTE B: SUBURBAN HIGHWAY",
      probability: 18,
      color: "#3b82f6", // Blue
      path: [
        [baseLat, baseLng],
        [baseLat - 0.004, baseLng + 0.002],
        [baseLat - 0.010, baseLng + 0.005],
        [baseLat - 0.018, baseLng + 0.008],
      ]
    },
    {
      id: "r3",
      name: "ROUTE C: LOCAL GRID SEARCH",
      probability: 8,
      color: "#ef4444", // Red
      path: [
        [baseLat, baseLng],
        [baseLat + 0.002, baseLng - 0.003],
        [baseLat + 0.001, baseLng - 0.008],
        [baseLat - 0.002, baseLng - 0.012],
      ]
    }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col uppercase">
      {/* Navbar Area */}
      <header className="border-b-2 border-[#3F3F46] bg-background shrink-0 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={`/response/${personData.id}`}
              className="flex items-center gap-2 md:gap-3 text-muted-foreground hover:text-[#DFE104] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xl">BACK TO RESPONSE</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="bg-[#DFE104] text-black px-4 py-2 flex items-center gap-2 font-bold animate-pulse">
                <BrainCircuit className="w-5 h-5" />
                AI PREDICTIVE MODE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid View */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        
        {/* Left Side: Stats and Route Breakdown */}
        <div className="w-full md:w-[450px] lg:w-[500px] border-r-2 border-[#3F3F46] flex flex-col bg-background z-10 shadow-2xl overflow-y-auto">
          <div className="p-6 md:p-8 space-y-8">
            {/* Header Block */}
            <div className="border-b-2 border-[#3F3F46] pb-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-none">
                {personData.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm tracking-wide text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#DFE104]" />
                  <span>{personData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>PREDICTION Confidence: 89%</span>
                </div>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-muted-foreground font-bold flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  POTENTIAL ROUTES
                </h3>
              </div>

              <div className="space-y-4">
                {dummyRoutes.map((route, idx) => (
                  <div 
                    key={route.id} 
                    className="border-2 border-[#3F3F46] p-4 bg-[#18181b] relative overflow-hidden group"
                  >
                    <div 
                      className="absolute inset-y-0 left-0 w-2"
                      style={{ backgroundColor: route.color }}
                    ></div>
                    <div className="pl-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="font-bold text-lg tracking-wide">{route.name}</div>
                        <div className="text-3xl font-bold" style={{ color: route.color }}>{route.probability}%</div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div>{route.path.length} WAYPOINTS DETECTED</div>
                        <div>PROJECTIONS VIA CAMERA GRID</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-destructive/10 border-2 border-destructive p-6 mt-8">
              <div className="flex gap-4">
                <Activity className="w-6 h-6 text-destructive flex-shrink-0 animate-pulse" />
                <div>
                  <div className="font-bold text-destructive mb-2">SYSTEM NOTICE</div>
                  <div className="text-sm normal-case text-muted-foreground">
                    These predictions are generated by cross-referencing live CCTV patterns, public transit timetables, and recent crowdsourced sightings within the area.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Predictive Area Mapping */}
        <div className="flex-1 relative bg-[#18181b]">
          <PredictiveMap 
            center={personData.coordinates as [number, number]} 
            routes={dummyRoutes} 
          />
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3F3F46_1px,transparent_1px),linear-gradient(to_bottom,#3F3F46_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-10"></div>
        </div>
      </div>
    </div>
  );
}
