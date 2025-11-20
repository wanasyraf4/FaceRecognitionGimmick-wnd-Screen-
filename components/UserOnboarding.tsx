import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Sparkles, Shield, Fingerprint, Zap } from 'lucide-react';

export const UserOnboarding: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-8">
      {/* Background Energetic Burst */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 2.5], opacity: [0.8, 0.4, 0] }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-full w-[500px] h-[500px] blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Central Icon Composition */}
        <div className="relative mb-10">
           <motion.div 
             initial={{ scale: 0, rotate: -90 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: "spring", stiffness: 200, damping: 15 }}
             className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(52,211,153,0.6)] border-2 border-white/20 relative z-10"
           >
             <UserCheck className="w-16 h-16 text-white drop-shadow-md" />
           </motion.div>
           
           {/* Floating Satellites */}
           <motion.div 
             initial={{ opacity: 0, x: -60 }}
             animate={{ opacity: 1, x: 50, y: -40 }}
             transition={{ delay: 0.4, type: "spring" }}
             className="absolute top-0 right-0 bg-slate-900 border border-emerald-400/50 p-2 rounded-xl shadow-lg z-20"
           >
             <Shield className="w-6 h-6 text-emerald-400" />
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, x: 60 }}
             animate={{ opacity: 1, x: -50, y: 40 }}
             transition={{ delay: 0.6, type: "spring" }}
             className="absolute bottom-0 left-0 bg-slate-900 border border-cyan-400/50 p-2 rounded-xl shadow-lg z-20"
           >
             <Fingerprint className="w-6 h-6 text-cyan-400" />
           </motion.div>

           {/* Particle Explosion */}
           {[...Array(6)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
               animate={{ 
                 opacity: 0, 
                 x: (Math.random() - 0.5) * 200, 
                 y: (Math.random() - 0.5) * 200,
                 scale: 0
               }}
               transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
               className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
             />
           ))}
        </div>

        {/* Text Animation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-6xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            USER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400 animate-gradient bg-[length:200%_auto]">
              SUCCESSFULLY
            </span>
            <br />
            ONBOARDED
          </h1>
        </motion.div>
        
        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 overflow-hidden whitespace-nowrap border-r-2 border-emerald-500 pr-2"
        >
          <p className="text-emerald-400/80 font-mono text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-3 bg-emerald-950/30 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 fill-current" />
            Identity Verified // Access Granted
          </p>
        </motion.div>
      </div>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};