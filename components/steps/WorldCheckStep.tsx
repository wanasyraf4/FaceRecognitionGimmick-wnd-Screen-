import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Search, AlertTriangle, Check } from 'lucide-react';

interface WorldCheckStepProps {
  onComplete: () => void;
}

const MOCK_DATABASES = [
  "OFAC Sanctions List",
  "UN Security Council Consolidated List",
  "EU Financial Sanctions",
  "Interpol Red Notices",
  "HM Treasury List",
  "FBI Most Wanted",
  "PEP Global Database",
  "Adverse Media - Global",
  "Regulatory Enforcement List",
  "Terrorism Exclusion List"
];

export const WorldCheckStep: React.FC<WorldCheckStepProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentDb, setCurrentDb] = useState(MOCK_DATABASES[0]);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let interval: number;
    let logInterval: number;
    
    const startTime = Date.now();
    const duration = 6000; // Increased duration to 6 seconds

    interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      const dbIndex = Math.floor((newProgress / 100) * MOCK_DATABASES.length);
      if (MOCK_DATABASES[dbIndex]) {
        setCurrentDb(MOCK_DATABASES[dbIndex]);
      }

      if (newProgress >= 100) {
        clearInterval(interval);
        clearInterval(logInterval);
        setTimeout(onComplete, 1500);
      }
    }, 16);

    logInterval = window.setInterval(() => {
      const id = Math.random().toString(36).substring(7).toUpperCase();
      setLogs(prev => [`Scanning record #${id}... OK`, ...prev].slice(0, 6));
    }, 150);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  const isFinished = progress >= 100;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="w-full flex justify-between items-end mb-2 border-b border-slate-700 pb-2">
        <div className="flex items-center gap-2 text-violet-400">
          <Globe2 className="w-6 h-6" />
          <h2 className="text-lg font-bold font-mono tracking-wide">WORLD-CHECK SCREENING</h2>
        </div>
        <span className="font-mono text-xs text-slate-500">DB_VER: 2024.05.12</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-8">
        <motion.div 
          className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Scan Area */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 h-40 flex flex-col justify-between relative overflow-hidden">
          <div className="z-10">
             <p className="text-xs text-slate-400 uppercase font-mono mb-1">Current Database</p>
             <p className="text-violet-300 font-mono font-bold truncate">{currentDb}</p>
          </div>
          
          <div className="z-10">
            <div className="flex justify-between items-end">
              <span className="text-xs text-slate-500 font-mono">STATUS</span>
              <span className={`text-sm font-mono font-bold ${isFinished ? 'text-emerald-400' : 'text-violet-400'}`}>
                {isFinished ? 'CLEARED' : 'SCANNING'}
              </span>
            </div>
          </div>

          {/* Moving background lines */}
          <motion.div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #8b5cf6 2px, #8b5cf6 4px)'
            }}
            animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Log Terminal */}
        <div className="bg-black/40 border border-slate-800 rounded-lg p-3 font-mono text-xs h-40 overflow-hidden relative">
          <div className="absolute top-2 right-2">
             <Search className="w-4 h-4 text-slate-600" />
          </div>
          <div className="flex flex-col gap-1">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1 - (i * 0.15), x: 0 }}
                className="text-emerald-500/80 truncate"
              >
                {`> ${log}`}
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Final Badge */}
      {isFinished && (
         <motion.div
           initial={{ opacity: 0, y: 20, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           className="mt-8 flex items-center gap-3 bg-emerald-950/40 border border-emerald-500/30 px-6 py-3 rounded-full"
         >
           <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
           </div>
           <div>
             <p className="text-emerald-300 font-bold font-mono text-sm">NO CRITICAL MATCHES FOUND</p>
             <p className="text-emerald-600 text-[10px] font-mono uppercase tracking-widest">Global Sanctions • PEP • Adverse Media</p>
           </div>
         </motion.div>
      )}

    </div>
  );
};