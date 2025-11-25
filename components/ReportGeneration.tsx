import React from 'react';
import { motion } from 'framer-motion';
import { FileJson, Binary, Lock, HardDrive, CheckCircle2 } from 'lucide-react';

export const ReportGeneration: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div className="relative mb-10">
        {/* Central Icon Assembly */}
        <div className="relative w-32 h-32 flex items-center justify-center">
           {/* Background Rings */}
           <motion.div 
             className="absolute inset-0 border border-slate-700 rounded-full"
             animate={{ rotate: 360, scale: [1, 1.05, 1] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           />
           <motion.div 
             className="absolute inset-2 border border-cyan-900/50 rounded-full border-dashed"
             animate={{ rotate: -360 }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
           />
           
           {/* Central File Icon */}
           <motion.div
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ type: "spring", stiffness: 200 }}
             className="bg-slate-900 p-6 rounded-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] relative z-10"
           >
             <FileJson className="w-10 h-10 text-cyan-400" />
           </motion.div>

           {/* Orbiting Particles */}
           <motion.div 
             className="absolute w-full h-full"
             animate={{ rotate: 360 }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
           </motion.div>
        </div>
        
        {/* Floating Code Snippets */}
        <div className="absolute -right-24 top-0 text-[8px] font-mono text-slate-600 opacity-50 hidden md:block">
            <p>0x4F3A...</p>
            <p>AES-256</p>
        </div>
        <div className="absolute -left-24 bottom-0 text-[8px] font-mono text-slate-600 opacity-50 hidden md:block">
            <p>JSON_LD</p>
            <p>VERIFIED</p>
        </div>
      </div>

      {/* Status Text */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-mono font-bold text-white tracking-wider">
          SYNTHESIZING FINAL REPORT
        </h3>
        <div className="flex items-center gap-2 text-xs text-cyan-500/70 font-mono">
          <Binary className="w-3 h-3 animate-pulse" />
          <span>ENCRYPTING SENSITIVE METADATA...</span>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-3 gap-8 text-center opacity-60">
         <div className="flex flex-col items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-400">ENCRYPTED</span>
         </div>
         <div className="flex flex-col items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-400">STORED</span>
         </div>
         <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-400">VERIFIED</span>
         </div>
      </div>

    </div>
  );
};