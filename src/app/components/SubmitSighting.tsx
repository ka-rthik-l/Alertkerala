import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { MapPin, Upload, CheckCircle, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function SubmitSighting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [location] = useState("Kaloor Stadium, Kochi");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate(`/alert/${id}`);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full border-2 border-[#DFE104] bg-background p-12 text-center"
        >
          <CheckCircle className="w-24 h-24 text-[#DFE104] mx-auto mb-8" />
          <h1 className="text-5xl md:text-6xl mb-6">SUBMITTED</h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground normal-case leading-tight">
            Your sighting has been sent to authorities. Thank you for helping.
          </p>
          <div className="bg-muted p-8 mb-8">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Location Captured</div>
            <div className="text-2xl">{location}</div>
          </div>
          <div className="text-muted-foreground normal-case">
            Redirecting back...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-[#3F3F46] sticky top-0 z-50 bg-background">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(`/alert/${id}`)}
              className="flex items-center gap-3 text-muted-foreground hover:text-[#DFE104] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="text-xl normal-case">Back</span>
            </button>
            <h1 className="text-2xl md:text-3xl">REPORT SIGHTING</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Alert Reference */}
        <div className="border-2 border-[#3F3F46] bg-background p-6 mb-12 flex items-center gap-6">
          <div className="w-20 h-20 bg-muted flex-shrink-0">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1741805190461-eeda3ba59bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGQlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc3MzQ1ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Missing person"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-2xl mb-1">AARAV KUMAR</div>
            <div className="text-sm text-muted-foreground normal-case">Age 8 • Missing 2h 14m</div>
            <div className="text-sm text-muted-foreground normal-case">Last seen: Marine Drive</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Auto Location */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Your Current Location</label>
            <div className="bg-[#DFE104]/10 border-2 border-[#DFE104] p-8 flex items-start gap-4">
              <MapPin className="w-8 h-8 text-[#DFE104] flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm uppercase tracking-wide mb-2 text-[#DFE104]">Auto-Detected via GPS</div>
                <div className="text-2xl normal-case">{location}</div>
              </div>
              <CheckCircle className="w-6 h-6 text-[#DFE104]" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 normal-case">
              Your location helps track the missing person's movement
            </p>
          </div>

          {/* Map Confirmation */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Location Confirmation</label>
            <div className="relative aspect-video bg-muted flex items-center justify-center border-2 border-[#3F3F46]">
              <div className="text-[10rem] font-bold text-muted-foreground/10 absolute">MAP</div>
              <div className="w-12 h-12 bg-[#DFE104] flex items-center justify-center relative z-10">
                <MapPin className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Upload Photo (Optional)</label>
            <div className="border-2 border-dashed border-[#3F3F46] p-16 text-center hover:border-[#DFE104] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="text-lg mb-1 normal-case">Click to upload</div>
              <div className="text-sm text-muted-foreground normal-case">Photo helps verify sighting</div>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Additional Details (Optional)</label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border-2 border-[#3F3F46] px-4 py-4 text-lg focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted normal-case"
              placeholder="What were they doing? Were they with anyone? Which direction were they heading?"
            ></textarea>
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">When Did You See Them?</label>
            <select className="w-full bg-transparent border-2 border-[#3F3F46] px-4 py-4 text-lg focus:border-[#DFE104] outline-none transition-colors normal-case">
              <option>Just now (less than 5 minutes ago)</option>
              <option>5-15 minutes ago</option>
              <option>15-30 minutes ago</option>
              <option>30-60 minutes ago</option>
              <option>More than 1 hour ago</option>
            </select>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            className="w-full bg-[#DFE104] text-black px-8 py-8 h-20 text-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <CheckCircle className="w-8 h-8" />
            SUBMIT SIGHTING
          </button>

          <p className="text-sm text-muted-foreground text-center normal-case">
            Your sighting will be immediately sent to authorities and emergency responders
          </p>
        </form>
      </div>
    </div>
  );
}
