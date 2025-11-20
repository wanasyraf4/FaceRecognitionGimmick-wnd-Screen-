import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Globe, Activity, Lock } from 'lucide-react';

interface InterimResultStepProps {
  onComplete: () => void;
}

export const InterimResultStep: React.FC<InterimResultStepProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex justify-between items-end mb-8 border-b border-slate-800 pb-4"
      >
        <div>
          <h2 className="text-2xl font-bold font-mono text-white tracking-tight">PRELIMINARY RESULTS</h2>
          <p className="text-slate-500 font-mono text-sm">PHASE 1 ANALYSIS COMPLETE</p>
        </div>
        <div className="text-emerald-400 bg-emerald-950/30 py-1 px-3 rounded border border-emerald-500/30 text-xs font-mono">
           STATUS: CLEARED
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12"
      >
        {/* Result 1: Identity */}
        <motion.div variants={item} className="bg-slate-900/40 border border-slate-700 p-6 rounded-xl flex flex-col relative overflow-hidden group backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-slate-800 rounded-lg text-cyan-400 group-hover:text-emerald-400 transition-colors">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-sm font-mono text-slate-400 uppercase mb-1">Identity Verification</h3>
          <p className="text-white font-bold text-lg">AUTHENTICATED</p>
          <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 w-full" />
          </div>
        </motion.div>

        {/* Result 2: World Check */}
        <motion.div variants={item} className="bg-slate-900/40 border border-slate-700 p-6 rounded-xl flex flex-col relative overflow-hidden group backdrop-blur-sm">
           <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-slate-800 rounded-lg text-violet-400 group-hover:text-emerald-400 transition-colors">
               <Globe className="w-6 h-6" />
             </div>
             <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-sm font-mono text-slate-400 uppercase mb-1">Global Screening</h3>
          <p className="text-white font-bold text-lg">NO MATCHES</p>
          <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 w-full" />
          </div>
        </motion.div>

        {/* Result 3: AML Score */}
        <motion.div variants={item} className="bg-slate-900/40 border border-slate-700 p-6 rounded-xl flex flex-col relative overflow-hidden group backdrop-blur-sm">
           <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-slate-800 rounded-lg text-rose-400 group-hover:text-emerald-400 transition-colors">
               <Activity className="w-6 h-6" />
             </div>
             <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-sm font-mono text-slate-400 uppercase mb-1">Risk Profile</h3>
          <p className="text-white font-bold text-lg">HIGH RISK (12)</p>
          <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 w-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Transition Component */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5 }}
         className="w-full bg-gradient-to-r from-slate-900/80 to-slate-900/40 border border-slate-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6"
      >
         <div className="flex items-center gap-4">
           <div className="relative flex-shrink-0">
             <div className="w-12 h-12 rounded-full border-2 border-orange-500/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-orange-400" />
             </div>
             <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500 transition-all duration-1000 ease-linear" 
                strokeDasharray="150" 
                strokeDashoffset={150 - (150 * ((15 - countdown) / 15))} 
                />
             </svg>
           </div>
           <div>
             <div className="text-xs text-orange-400 font-mono font-bold mb-1">SECURITY CLEARANCE UPGRADE REQUIRED</div>
             <h3 className="text-white font-bold tracking-wide">Initiating Enhanced Due Diligence</h3>
             <p className="text-slate-500 text-xs mt-1 max-w-md">
               System requires deep-dive analysis of corporate structures and digital footprint to finalize risk assessment.
             </p>
           </div>
         </div>

         <div className="flex flex-col items-end">
           <span className="text-3xl font-mono font-bold text-white tabular-nums">00:{String(countdown).padStart(2, '0')}</span>
           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Auto-start in</span>
         </div>
      </motion.div>

    </div>
  );
};