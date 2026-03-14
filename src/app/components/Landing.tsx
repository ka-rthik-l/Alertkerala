import { Link } from "react-router";
import { AlertCircle, MapPin, Users, Zap, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Marquee from "react-fast-marquee";

export function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ scale, opacity }}
        className="relative min-h-screen flex items-center justify-center px-4 border-b-2 border-[#3F3F46]"
      >
        <div className="max-w-[95vw] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[clamp(3rem,12vw,14rem)] font-bold leading-[0.8] mb-8 tracking-tighter">
              ALERT<br/>KERALA
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-4 text-muted-foreground font-medium normal-case tracking-tight">
              Every second matters in emergency response
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-muted-foreground normal-case">
              Geo-targeted missing person alerts reaching thousands of civilians instantly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/report" 
                className="group bg-[#DFE104] text-black px-8 py-4 h-14 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <AlertCircle className="w-5 h-5" />
                REPORT MISSING
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                to="/alert/demo" 
                className="border-2 border-[#3F3F46] bg-transparent text-foreground px-8 py-4 h-14 flex items-center gap-3 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                JOIN NETWORK
              </Link>
              <Link 
                to="/dashboard" 
                className="border-2 border-[#3F3F46] bg-transparent text-foreground px-8 py-4 h-14 flex items-center gap-3 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                <Zap className="w-5 h-5" />
                DASHBOARD
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Background Number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[12rem] md:text-[20rem] font-bold text-muted opacity-5 select-none">
            108
          </span>
        </div>
      </motion.section>

      {/* Stats Marquee */}
      <section className="bg-[#DFE104] text-black py-8 border-b-2 border-black">
        <Marquee speed={80} gradient={false} className="py-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-16">
              <div className="flex items-center gap-4">
                <span className="text-[6rem] md:text-[8rem] font-bold leading-none">2,847</span>
                <span className="text-xl md:text-2xl uppercase tracking-wide">ALERTS SENT</span>
              </div>
              <span className="text-4xl">●</span>
              <div className="flex items-center gap-4">
                <span className="text-[6rem] md:text-[8rem] font-bold leading-none">142K</span>
                <span className="text-xl md:text-2xl uppercase tracking-wide">CIVILIANS</span>
              </div>
              <span className="text-4xl">●</span>
              <div className="flex items-center gap-4">
                <span className="text-[6rem] md:text-[8rem] font-bold leading-none">4.2s</span>
                <span className="text-xl md:text-2xl uppercase tracking-wide">AVG RESPONSE</span>
              </div>
              <span className="text-4xl">●</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl lg:text-8xl mb-20 text-center">
            HOW IT WORKS
          </h2>
          
          <div className="grid md:grid-cols-3 gap-px bg-[#3F3F46]">
            {/* Step 1 */}
            <div className="bg-background p-12 group hover:bg-[#DFE104] transition-all duration-300">
              <div className="text-[8rem] md:text-[10rem] font-bold leading-none mb-6 text-muted group-hover:text-black transition-colors">
                01
              </div>
              <h3 className="text-3xl md:text-4xl mb-4 group-hover:text-black transition-colors">
                REPORT
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground normal-case leading-tight group-hover:text-black/80 transition-colors">
                Authorities report missing person with photo, details, and last known location
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-background p-12 group hover:bg-[#DFE104] transition-all duration-300">
              <div className="text-[8rem] md:text-[10rem] font-bold leading-none mb-6 text-muted group-hover:text-black transition-colors">
                02
              </div>
              <h3 className="text-3xl md:text-4xl mb-4 group-hover:text-black transition-colors">
                BROADCAST
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground normal-case leading-tight group-hover:text-black/80 transition-colors">
                Real-time alerts sent to all civilians within radius in under 5 seconds
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-background p-12 group hover:bg-[#DFE104] transition-all duration-300">
              <div className="text-[8rem] md:text-[10rem] font-bold leading-none mb-6 text-muted group-hover:text-black transition-colors">
                03
              </div>
              <h3 className="text-3xl md:text-4xl mb-4 group-hover:text-black transition-colors">
                LOCATE
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground normal-case leading-tight group-hover:text-black/80 transition-colors">
                Civilians report sightings with GPS data creating real-time rescue trail
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Sticky Cards */}
      <section className="py-32 px-4 border-t-2 border-[#3F3F46]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="sticky top-32 border-2 border-[#3F3F46] bg-background p-12 group hover:bg-[#DFE104] hover:border-[#DFE104] transition-all duration-300">
            <AlertCircle className="w-16 h-16 mb-6 group-hover:text-black transition-colors" />
            <h3 className="text-4xl md:text-5xl mb-6 group-hover:text-black transition-colors">
              INSTANT ALERTS
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground normal-case leading-tight group-hover:text-black/80 transition-colors">
              Push notifications reach thousands in under 5 seconds through geo-targeted broadcast system
            </p>
            <div className="text-[8rem] absolute top-8 right-8 font-bold text-muted opacity-20 group-hover:text-black/20 transition-colors">
              01
            </div>
          </div>

          <div className="sticky top-32 border-2 border-[#3F3F46] bg-background p-12 group hover:bg-[#DFE104] hover:border-[#DFE104] transition-all duration-300">
            <MapPin className="w-16 h-16 mb-6 group-hover:text-black transition-colors" />
            <h3 className="text-4xl md:text-5xl mb-6 group-hover:text-black transition-colors">
              GEO-PRECISION
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground normal-case leading-tight group-hover:text-black/80 transition-colors">
              Smart radius-based broadcasting ensures only relevant civilians receive alerts
            </p>
            <div className="text-[8rem] absolute top-8 right-8 font-bold text-muted opacity-20 group-hover:text-black/20 transition-colors">
              02
            </div>
          </div>

          <div className="sticky top-32 border-2 border-[#3F3F46] bg-background p-12 group hover:bg-[#DFE104] hover:border-[#DFE104] transition-all duration-300">
            <Zap className="w-16 h-16 mb-6 group-hover:text-black transition-colors" />
            <h3 className="text-4xl md:text-5xl mb-6 group-hover:text-black transition-colors">
              LIVE TRACKING
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground normal-case leading-tight group-hover:text-black/80 transition-colors">
              Real-time sighting reports create dynamic search trails for emergency responders
            </p>
            <div className="text-[8rem] absolute top-8 right-8 font-bold text-muted opacity-20 group-hover:text-black/20 transition-colors">
              03
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 border-t-2 border-[#3F3F46] bg-muted">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl lg:text-9xl mb-12 leading-[0.8]">
            SAVE<br/>LIVES
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground normal-case max-w-2xl mx-auto">
            Join the civilian network and become part of Kerala's emergency response system
          </p>
          <Link 
            to="/alert/demo" 
            className="inline-flex items-center gap-3 bg-[#DFE104] text-black px-12 py-6 h-20 text-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            GET STARTED
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#3F3F46] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-2xl mb-6">ALERTKERALA</h4>
              <p className="text-muted-foreground normal-case text-sm">
                Government of Kerala emergency response initiative
              </p>
            </div>
            <div>
              <h5 className="text-lg mb-4">QUICK LINKS</h5>
              <ul className="space-y-2 text-muted-foreground text-sm normal-case">
                <li><a href="#" className="hover:text-[#DFE104] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#DFE104] transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-[#DFE104] transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg mb-4">AUTHORITIES</h5>
              <ul className="space-y-2 text-muted-foreground text-sm normal-case">
                <li><Link to="/dashboard" className="hover:text-[#DFE104] transition-colors">Dashboard</Link></li>
                <li><a href="#" className="hover:text-[#DFE104] transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-[#DFE104] transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg mb-4">EMERGENCY</h5>
              <ul className="space-y-2 text-muted-foreground text-sm normal-case">
                <li>24/7: 1800-425-0000</li>
                <li>alert@kerala.gov.in</li>
                <li>+91-484-2366100</li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-[#3F3F46] pt-8 text-center text-muted-foreground text-sm normal-case">
            © 2026 Government of Kerala. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
