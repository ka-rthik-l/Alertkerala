import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Upload, MapPin, AlertCircle, ArrowLeft } from "lucide-react";
import { useAlerts } from "../context/AlertContext.js";
import { LocationPickerMap } from "./LocationPickerMap.js";

export function ReportMissing() {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const [radius, setRadius] = useState(5);
  const [uploading, setUploading] = useState(false);
  
  // Default coordinate set to Kochi
  const [coordinates, setCoordinates] = useState<[number, number]>([9.9796, 76.2796]);
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    date: "",
    time: "",
    physicalDesc: "",
    clothingDesc: "",
    contact: ""
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    addAlert({
      name: formData.name.toUpperCase(),
      age: parseInt(formData.age) || 0,
      location: formData.location,
      time: `Today ${formData.time}`,
      image: imagePreview || "https://images.unsplash.com/photo-1741805190461-eeda3ba59bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGQlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc3MzQ1ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: `${formData.physicalDesc}. Wearing: ${formData.clothingDesc}`,
      coordinates: coordinates,
      sightings: []
    });

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
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#3F3F46] p-20 text-center hover:border-[#DFE104] transition-colors cursor-pointer relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              ) : (
                <>
                  <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                  <div className="text-xl mb-2 normal-case">Click to upload</div>
                  <div className="text-sm text-muted-foreground normal-case">PNG, JPG up to 10MB</div>
                </>
              )}
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-wide mb-4">Full Name *</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-2xl focus:border-[#DFE104] outline-none transition-colors placeholder:text-muted"
                placeholder="ENTER NAME"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide mb-4">Age *</label>
              <input 
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleChange}
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
                name="location"
                value={formData.location}
                onChange={handleChange}
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
            <div className="relative aspect-video bg-muted flex items-center justify-center border-2 border-[#3F3F46] hover:border-[#DFE104] transition-colors overflow-hidden">
              <LocationPickerMap 
                initialCenter={coordinates} 
                radiusKm={radius} 
                onChange={(newCoords: [number, number]) => setCoordinates(newCoords)} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">
              Click or drag the pin to set the exact coordinates ({coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)})
            </p>
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
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-xl focus:border-[#DFE104] outline-none transition-colors"
                style={{ colorScheme: "dark" }}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide mb-4">Time Last Seen *</label>
              <input 
                type="time" 
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b-2 border-[#3F3F46] px-0 py-4 text-xl focus:border-[#DFE104] outline-none transition-colors"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase tracking-wide mb-4">Physical Description *</label>
            <textarea 
              name="physicalDesc"
              value={formData.physicalDesc}
              onChange={handleChange}
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
              name="clothingDesc"
              value={formData.clothingDesc}
              onChange={handleChange}
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
              name="contact"
              value={formData.contact}
              onChange={handleChange}
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
