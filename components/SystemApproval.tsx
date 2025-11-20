
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, UserCheck, Wallet, Newspaper, Activity, ShieldCheck } from 'lucide-react';

const ITEMS = [
  { id: 1, label: "Senior Management Approved", icon: UserCheck, status: "GRANTED", color: "text-emerald-400" },
  { id: 2, label: "Source of Wealth", icon: Wallet, status: "VERIFIED", color: "text-emerald-400" },
  { id: 3, label: "Adverse Media", icon: Newspaper, status: "CLEARED", color: "text-emerald-400" },
  { id: 4, label: "Transaction Monitoring", icon: Activity, status: "ENABLED", color: "text-cyan-400" }
];

export const SystemApproval: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev < ITEMS.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200); // Increased from 800 to 1200 to match 7s total duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/80 border border-slate-700 rounded-xl backdrop-blur-md shadow-[0_0_50px_rgba(15,23,42,0.5)] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/50">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-mono text-white tracking-wider uppercase">Final Approval Protocol</h2>
            <p className="text-[10px] text-slate-500 font-mono">SYSTEM CHECKLIST // V.9.02</p>
          </div>
        </div>

        {/* Checklist */}
        <div className="p-6 space-y-4">
          {ITEMS.map((item, index) => {
            const isVisible = index < visibleCount;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  x: isVisible ? 0 : -20 
                }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full bg-slate-800 ${isVisible ? 'text-slate-200' : 'text-slate-600'}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className={`font-mono text-sm ${isVisible ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                   {isVisible && (
                     <>
                       <span className={`text-[10px] font-bold font-mono tracking-wider ${item.color}`}>
                         {item.status}
                       </span>
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                         item.status === "ENABLED" ? "bg-cyan-500/20" : "bg-emerald-500/20"
                       }`}>
                         <Check className={`w-3 h-3 ${item.status === "ENABLED" ? "text-cyan-400" : "text-emerald-400"}`} />
                       </div>
                     </>
                   )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-800 w-full">
          <motion.div 
            className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
            initial={{ width: "0%" }}
            animate={{ width: `${(visibleCount / ITEMS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};
