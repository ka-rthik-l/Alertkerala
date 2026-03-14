import { useParams, Link } from "react-router";
import { AlertCircle, MapPin, Share2, Navigation, Clock, Eye, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function CivilianAlert() {
  const { id } = useParams();
  const [elapsedTime, setElapsedTime] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Emergency Header */}
      <div className="bg-destructive text-foreground px-4 py-6 border-b-2 border-black">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <AlertCircle className="w-8 h-8 animate-pulse" />
            <div>
              <h1 className="text-3xl md:text-4xl">EMERGENCY</h1>
              <p className="text-sm md:text-base normal-case tracking-normal">Missing Person in Your Area</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-px bg-[#3F3F46] mb-8">
          <div className="bg-background p-6 text-center">
            <div className="text-4xl font-bold text-[#DFE104] mb-2">{formatTime(elapsedTime)}</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Alert Age</div>
          </div>
          <div className="bg-background p-6 text-center">
            <div className="text-4xl font-bold text-[#DFE104] mb-2">1,243</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Notified</div>
          </div>
        </div>

        {/* Missing Person Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-[#3F3F46] bg-background mb-8"
        >
          {/* Photo */}
          <div className="relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1741805190461-eeda3ba59bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGQlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc3MzQ1ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Missing child"
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 left-4 bg-destructive text-foreground px-6 py-3 text-xl">
              MISSING
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <h2 className="text-5xl md:text-6xl mb-4">
              AARAV KUMAR
            </h2>
            <div className="text-2xl text-muted-foreground mb-8 normal-case">Age 8 Years</div>

            <div className="space-y-6 mb-8 border-t-2 border-[#3F3F46] pt-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Last Seen</div>
                  <div className="text-xl normal-case">Marine Drive, Kochi</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Time Missing</div>
                  <div className="text-xl normal-case">2 Hours 14 Minutes</div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 mb-8">
              <div className="text-xs uppercase tracking-wide mb-3">Description</div>
              <p className="text-lg normal-case text-muted-foreground leading-tight">
                Blue t-shirt with cartoon character, khaki shorts, red sneakers. 
                Brown hair, medium complexion. Last seen near waterfront.
              </p>
            </div>

            {/* Search Area */}
            <div className="mb-8">
              <div className="text-xs uppercase tracking-wide mb-4">Search Area - 5km Radius</div>
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <div className="text-[8rem] font-bold text-muted-foreground/20">MAP</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 border-2 border-destructive opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-destructive"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link 
                to={`/sighting/${id}`}
                className="w-full bg-[#DFE104] text-black px-8 py-6 h-16 flex items-center justify-center gap-3 text-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Eye className="w-6 h-6" />
                I SAW THEM
              </Link>

              <button className="w-full border-2 border-[#3F3F46] bg-transparent text-foreground px-8 py-6 h-16 flex items-center justify-center gap-3 text-xl hover:bg-foreground hover:text-background transition-all duration-300">
                <Share2 className="w-6 h-6" />
                SHARE ALERT
              </button>

              <button className="w-full border-2 border-[#3F3F46] bg-transparent text-foreground px-8 py-6 h-16 flex items-center justify-center gap-3 text-xl hover:bg-foreground hover:text-background transition-all duration-300">
                <Navigation className="w-6 h-6" />
                NAVIGATE
              </button>
            </div>

            {/* Contact */}
            <div className="mt-8 p-6 bg-muted border-2 border-[#3F3F46]">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Emergency Contact</div>
              <div className="text-2xl">+91-484-2366100</div>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#DFE104] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="normal-case">Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
