import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, PieChart as PieIcon, ShieldAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

interface AmlStepProps {
  onComplete: () => void;
}

// Mock txn data
const TXN_DATA = [
  { day: 'M', risk: 10 },
  { day: 'T', risk: 15 },
  { day: 'W', risk: 8 },
  { day: 'T', risk: 45 }, // Spike
  { day: 'F', risk: 12 },
  { day: 'S', risk: 5 },
  { day: 'S', risk: 8 },
];

export const AmlStep: React.FC<AmlStepProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  useEffect(() => {
    let startTime = Date.now();
    const duration = 5000; // Increased to 5 seconds for better pacing

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        setScore(12);
        setIsFinished(true);
        clearInterval(interval);
        setTimeout(onComplete, 1500);
      } else {
        // Dynamic Animation Curve:
        // 1. Ramp up quickly to simulate finding potential risks (0-40%)
        // 2. Hover at high risk while "analyzing" (40-70%)
        // 3. Resolve down to low risk as checks pass (70-100%)
        
        if (progress < 0.4) {
          // Ramp up to ~75
          const p = progress / 0.4;
          setScore(Math.floor(p * 75));
        } else if (progress < 0.7) {
          // Hover / Jitter around 75-85
          const noise = Math.sin(elapsed * 0.01) * 5;
          setScore(Math.floor(75 + noise + (Math.random() * 5)));
        } else {
          // Drop down to 12
          const p = (progress - 0.7) / 0.3;
          // Lerp from ~75 down to 12
          const currentStart = 75; 
          setScore(Math.floor(currentStart - (p * (currentStart - 12))));
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        
        {/* Left: The Score Gauge */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
            <h3 className="text-sm font-mono text-slate-400 mb-4 w-full flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> RISK PROBABILITY
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
                     <Cell fill={score > 50 ? "#f43f5e" : "#10b981"} /> {/* Changes color based on risk level */}
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
                 <Bar dataKey="risk" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {TXN_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.risk > 40 ? '#f43f5e' : '#3b82f6'} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-slate-400 font-mono space-y-1">
            <p className="flex justify-between">
              <span>Structuring Checks:</span> 
              <span className={isFinished ? "text-emerald-400" : "text-slate-500"}>
                {isFinished ? "PASSED" : "ANALYZING..."}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Velocity Rules:</span> 
              <span className={isFinished ? "text-emerald-400" : "text-slate-500"}>
                 {isFinished ? "PASSED" : "PENDING"}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Jurisdiction Risk:</span> 
              <span className={isFinished ? "text-emerald-400" : "text-slate-500"}>
                 {isFinished ? "TIER 1 (SAFE)" : "CALCULATING..."}
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
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono tracking-tighter">
              AML RISK: LOW
            </h1>
            <p className="text-slate-500 text-sm mt-2">Automated Scorecard Generated</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};