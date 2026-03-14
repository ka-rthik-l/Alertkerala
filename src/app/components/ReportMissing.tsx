import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Upload, MapPin, AlertCircle, ArrowLeft } from "lucide-react";

export function ReportMissing() {
  const navigate = useNavigate();
  const [radius, setRadius] = useState(5);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      navigate("/broadcast/demo");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-[#3F3F46] sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-[#DFE104] transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="text-xl normal-case">Back</span>
            </Link>
            <h1 className="text-2xl md:text-3xl">REPORT MISSING</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Alert Notice */}
        <div className="bg-destructive/10 border-2 border-destructive p-8 mb-12 flex gap-4">
          <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
          <div>
            <h2 className="text-2xl mb-2">EMERGENCY SYSTEM</h2>
            <p className="text-lg normal-case text-muted-foreground leading-tight">
              This will instantly broadcast to all civilians in selected radius. Ensure all information is accurate.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Photo Upload */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Upload Photo *</label>
            <div className="border-2 border-dashed border-[#3F3F46] p-20 text-center hover:border-[#DFE104] transition-colors cursor-pointer">
              <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <div className="text-xl mb-2 normal-case">Click to upload</div>
              <div className="text-sm text-muted-foreground normal-case">PNG, JPG up to 10MB</div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-wide mb-4">Full Name *</label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-2xl focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted"
                placeholder="ENTER NAME"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide mb-4">Age *</label>
              <input 
                type="number" 
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-2xl focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted"
                placeholder="AGE"
              />
            </div>
          </div>

          {/* Last Seen Location */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Last Seen Location *</label>
            <div className="relative">
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-2xl focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted"
                placeholder="ENTER LOCATION"
              />
              <MapPin className="absolute right-0 bottom-4 w-6 h-6 text-muted-foreground" />
            </div>
          </div>

          {/* Map Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Mark Location on Map *</label>
            <div className="relative aspect-video bg-muted flex items-center justify-center cursor-pointer border-2 border-[#3F3F46] hover:border-[#DFE104] transition-colors">
              <div className="text-[10rem] font-bold text-muted-foreground/10 absolute">MAP</div>
              <div className="relative z-10">
                <div 
                  className="border-2 border-destructive opacity-50"
                  style={{ width: `${radius * 40}px`, height: `${radius * 40}px` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-destructive" />
                </div>
              </div>
            </div>
          </div>

          {/* Radius Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">
              Broadcast Radius: {radius} KM
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-1 bg-[#3F3F46] appearance-none cursor-pointer accent-[#DFE104]"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2 normal-case">
              <span>1 km</span>
              <span>10 km</span>
            </div>
            <div className="mt-4 text-lg normal-case">
              Estimated reach: <span className="text-[#DFE104] font-bold">{(radius * 1243).toLocaleString()}</span> civilians
            </div>
          </div>

          {/* Time Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-wide mb-4">Date Last Seen *</label>
              <input 
                type="date" 
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-xl focus:border-[#DFE104] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide mb-4">Time Last Seen *</label>
              <input 
                type="time" 
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-xl focus:border-[#DFE104] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Physical Description *</label>
            <textarea 
              required
              rows={3}
              className="w-full bg-transparent border-2 border-[#3F3F46] px-4 py-4 text-lg focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted normal-case"
              placeholder="Height, build, complexion, distinctive features..."
            ></textarea>
          </div>

          {/* Clothing */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Clothing Description *</label>
            <textarea 
              required
              rows={2}
              className="w-full bg-transparent border-2 border-[#3F3F46] px-4 py-4 text-lg focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted normal-case"
              placeholder="What were they wearing..."
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Contact Number *</label>
            <input 
              type="tel" 
              required
              className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-2xl focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          {/* Submit */}
          <button 
            type="submit"
            disabled={uploading}
            className="w-full bg-[#DFE104] text-black px-8 py-8 h-20 text-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            <AlertCircle className="w-8 h-8" />
            {uploading ? "BROADCASTING..." : "BROADCAST ALERT"}
          </button>

          <p className="text-sm text-muted-foreground text-center normal-case">
            By submitting, you authorize emergency broadcast to all civilians in selected area
          </p>
        </form>
      </div>
    </div>
  );
}
