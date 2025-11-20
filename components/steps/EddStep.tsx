import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Building2, Fingerprint, BrainCircuit, CheckCircle2, Search } from 'lucide-react';

interface EddStepProps {
  onComplete: () => void;
}

const EDD_MODULES = [
  { 
    id: 'financial',
    icon: Network, 
    title: 'FINANCIAL LINKAGES',
    details: ['Tracing beneficial ownership', 'Cross-border transaction mapping', 'Hidden asset detection'] 
  },
  { 
    id: 'corporate',
    icon: Building2, 
    title: 'CORPORATE STRUCTURE',
    details: ['Shell company analysis', 'Offshore registry lookup', 'Director association graph'] 
  },
  { 
    id: 'digital',
    icon: Fingerprint, 
    title: 'DIGITAL FOOTPRINT',
    details: ['Dark web credential check', 'Social graph analysis', 'Device fingerprinting'] 
  },
  { 
    id: 'predictive',
    icon: BrainCircuit, 
    title: 'PREDICTIVE MODELING',
    details: ['Behavioral anomaly detection', 'Future risk projection', 'Synthetic identity scoring'] 
  }
];

export const EddStep: React.FC<EddStepProps> = ({ onComplete }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [scanLinePos, setScanLinePos] = useState(0);

  useEffect(() => {
    const TOTAL_DURATION = 10000; // 10 seconds
    const STEP_DURATION = TOTAL_DURATION / EDD_MODULES.length;
    
    const timer = setInterval(() => {
      setActiveModuleIndex(prev => {
        const next = prev + 1;
        setCompletedModules(old => [...old, prev]);
        
        if (next >= EDD_MODULES.length) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return next;
      });
    }, STEP_DURATION);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/50">
            <Search className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-mono text-indigo-100 tracking-wide">ENHANCED DUE DILIGENCE</h2>
            <p className="text-xs text-indigo-400 font-mono">DEEP DIVE ANALYSIS IN PROGRESS...</p>
          </div>
        </div>
        <div className="font-mono text-xl font-bold text-indigo-500">
          {Math.min(((completedModules.length + (activeModuleIndex < EDD_MODULES.length ? 0.5 : 0)) / EDD_MODULES.length) * 100, 100).toFixed(0)}%
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {EDD_MODULES.map((module, idx) => {
          const isActive = idx === activeModuleIndex;
          const isComplete = completedModules.includes(idx);
          const isPending = !isActive && !isComplete;

          return (
            <div 
              key={module.id}
              className={`relative overflow-hidden rounded-xl border transition-all duration-500 p-5 flex flex-col justify-between
                ${isActive 
                  ? 'bg-indigo-950/30 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
                  : isComplete 
                    ? 'bg-slate-900/50 border-emerald-500/30' 
                    : 'bg-slate-900/30 border-slate-800 opacity-50'
                }
              `}
            >
              {/* Background Animation for Active */}
              {isActive && (
                <motion.div 
                  className="absolute inset-0 bg-indigo-500/5 z-0"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className={`flex items-center gap-3 ${isActive ? 'text-indigo-300' : isComplete ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <module.icon className="w-6 h-6" />
                  <span className="font-bold font-mono tracking-wider text-sm">{module.title}</span>
                </div>
                {isComplete && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isActive && <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />}
              </div>

              {/* Details Feed */}
              <div className="relative z-10 space-y-2">
                {module.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 overflow-hidden">
                    <div className={`w-1 h-1 rounded-full flex-shrink-0 ${
                      isActive 
                        ? 'bg-indigo-500 animate-pulse' 
                        : isComplete ? 'bg-emerald-500' : 'bg-slate-700'
                    }`} />
                    <span className={`text-xs font-mono truncate transition-colors duration-300 ${
                      isActive ? 'text-indigo-200/80' : isComplete ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {isActive && dIdx === 0 ? `> SCANNING: ${detail}` : detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Line for Active Item */}
              {isActive && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Console */}
      <div className="mt-6 bg-black/40 rounded-lg p-3 font-mono text-[10px] text-slate-500 border border-slate-800 flex justify-between items-center">
         <span>EDD_PROTOCOL_V4.2 // INITIATED BY: SYSTEM</span>
         <span className="animate-pulse text-indigo-400">
           {activeModuleIndex < EDD_MODULES.length ? 'PROCESSING DATA STREAMS...' : 'COMPILATION COMPLETE'}
         </span>
      </div>
    </div>
  );
};
