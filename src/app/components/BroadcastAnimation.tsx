import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Radio, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function BroadcastAnimation() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= 1243) {
          clearInterval(timer);
          setComplete(true);
          return 1243;
        }
        return prev + 87;
      });
    }, 100);

    const navTimer = setTimeout(() => {
      navigate("/dashboard");
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            {complete ? (
              <CheckCircle className="w-16 h-16 text-[#DFE104]" />
            ) : (
              <Radio className="w-16 h-16 text-destructive animate-pulse" />
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-8">
            {complete ? "BROADCAST COMPLETE" : "BROADCASTING..."}
          </h1>

          <div className="relative mb-8">
            <div className="text-[10rem] md:text-[15rem] font-bold leading-none text-[#DFE104]">
              {count.toLocaleString()}
            </div>
            <div className="text-2xl md:text-3xl text-muted-foreground uppercase tracking-wide">
              Civilians Notified
            </div>
          </div>

          {complete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl md:text-2xl text-muted-foreground normal-case"
            >
              Alert sent to 1,243 civilians in 4 seconds
            </motion.div>
          )}
        </motion.div>

        {/* Visual Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="border-2 border-[#3F3F46] bg-background p-12"
        >
          <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="text-[12rem] font-bold text-muted-foreground/10 absolute">MAP</div>
            
            {/* Center Point */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Ripple Effects */}
              <motion.div 
                className="absolute border-2 border-destructive"
                initial={{ width: 80, height: 80, opacity: 1 }}
                animate={{ width: 400, height: 400, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute border-2 border-destructive"
                initial={{ width: 80, height: 80, opacity: 1 }}
                animate={{ width: 400, height: 400, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "linear" }}
              />
              <motion.div 
                className="absolute border-2 border-destructive"
                initial={{ width: 80, height: 80, opacity: 1 }}
                animate={{ width: 400, height: 400, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "linear" }}
              />
            </div>

            {/* Notification Pings */}
            {[
              { x: "20%", y: "30%", delay: 0.5 },
              { x: "70%", y: "25%", delay: 1 },
              { x: "15%", y: "70%", delay: 1.5 },
              { x: "80%", y: "65%", delay: 2 },
              { x: "50%", y: "80%", delay: 2.5 },
              { x: "60%", y: "40%", delay: 3 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: pos.delay }}
                className="absolute w-3 h-3 bg-[#DFE104]"
                style={{ left: pos.x, top: pos.y }}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px bg-[#3F3F46] mt-8">
            <div className="bg-background p-6 text-center">
              <div className="text-4xl font-bold mb-2">1,243</div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Civilians</div>
            </div>
            <div className="bg-background p-6 text-center">
              <div className="text-4xl font-bold mb-2">5 KM</div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Radius</div>
            </div>
            <div className="bg-background p-6 text-center">
              <div className="text-4xl font-bold mb-2">4 SEC</div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Time</div>
            </div>
          </div>
        </motion.div>

        {complete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-muted-foreground normal-case"
          >
            Redirecting to dashboard...
          </motion.div>
        )}
      </div>
    </div>
  );
}
