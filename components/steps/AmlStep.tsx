import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, PieChart as PieIcon, ShieldAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

interface AmlStepProps {
  onComplete: () => void;
}

// Mock txn data
const TXN_DATA = [
  { day: 'M', risk: 25 },
  { day: 'T', risk: 45 },
  { day: 'W', risk: 30 },
  { day: 'T', risk: 85 }, // Major Spike
  { day: 'F', risk: 65 },
  { day: 'S', risk: 40 },
  { day: 'S', risk: 90 }, // Critical Spike
];

export const AmlStep: React.FC<AmlStepProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  useEffect(() => {
    let startTime = Date.now();
    // Reduced duration: 1.5s scan + 1s wait = 2.5s total
    const duration = 1500; 

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        setScore(88); // Set to High Risk
        setIsFinished(true);
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      } else {
        // Curve for High Risk
        // Ramp up quickly then stabilize at high numbers
        if (progress < 0.6) {
           // 0 to 80 fast
           const p = progress / 0.6;
           setScore(Math.floor(p * 80));
        } else {
           // 80 to 88 with noise/jitter
           const base = 80;
           const remaining = (progress - 0.6) / 0.4; // 0 to 1
           const val = base + (remaining * 8);
           const noise = Math.random() * 4;
           setScore(Math.min(99, Math.floor(val + noise)));
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        
        {/* Left: The Score Gauge */}
        <div className={`bg-slate-900/50 border ${isFinished ? 'border-rose-500/50' : 'border-slate-700'} rounded-xl p-6 flex flex-col items-center relative overflow-hidden transition-colors duration-500`}>
            <h3 className="text-sm font-mono text-slate-400 mb-4 w-full flex items-center gap-2">
              <ShieldAlert className={`w-4 h-4 ${isFinished ? 'text-rose-500' : 'text-slate-400'}`} /> RISK PROBABILITY
            </h3>
            
            <div className="w-48 h-48 relative">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={[{ value: score }, { value: 100 - score }]}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     startAngle={180}
                     endAngle={0}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     <Cell fill={score > 50 ? "#f43f5e" : "#10b981"} />
                     <Cell fill="#334155" />
                   </Pie>
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                 <span className={`text-4xl font-bold font-mono ${score > 50 ? "text-rose-400" : "text-white"}`}>
                   {score}
                 </span>
                 <span className="text-xs text-slate-500 font-mono">/ 100</span>
               </div>
            </div>

            <div className="w-full mt-2">
              <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                <span>LOW</span>
                <span>MED</span>
                <span>HIGH</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full flex">
                 <div className="w-1/3 h-full bg-emerald-500/50 rounded-l-full"></div>
                 <div className="w-1/3 h-full bg-yellow-500/50"></div>
                 <div className="w-1/3 h-full bg-rose-500/50 rounded-r-full"></div>
              </div>
              <motion.div 
                className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white mx-auto mt-1"
                animate={{ x: (score / 100) * 200 - 100 }} 
              />
            </div>
            
            {!isFinished && (
              <div className="absolute bottom-2 right-2">
                 <Activity className="w-4 h-4 text-slate-600 animate-pulse" />
              </div>
            )}
        </div>

        {/* Right: Transaction Analysis */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 flex flex-col">
          <h3 className="text-sm font-mono text-slate-400 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> TRANSACTION BEHAVIOR
          </h3>
          <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={TXN_DATA}>
                 <XAxis dataKey="day" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                    itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                 />
                 <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
                    {TXN_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.risk > 60 ? '#f43f5e' : '#3b82f6'} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-slate-400 font-mono space-y-1">
            <p className="flex justify-between">
              <span>Structuring Checks:</span> 
              <span className={isFinished ? "text-rose-400 font-bold" : "text-slate-500"}>
                {isFinished ? "DETECTED" : "ANALYZING..."}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Velocity Rules:</span> 
              <span className={isFinished ? "text-orange-400" : "text-slate-500"}>
                 {isFinished ? "FLAGGED" : "PENDING"}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Jurisdiction Risk:</span> 
              <span className={isFinished ? "text-rose-400 font-bold" : "text-slate-500"}>
                 {isFinished ? "TIER 3 (HIGH)" : "CALCULATING..."}
              </span>
            </p>
          </div>
        </div>

      </div>

      {isFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 font-mono tracking-tighter">
              AML RISK: CRITICAL
            </h1>
            <p className="text-rose-400/70 text-sm mt-2 font-bold animate-pulse">EDD PROTOCOL TRIGGERED</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};