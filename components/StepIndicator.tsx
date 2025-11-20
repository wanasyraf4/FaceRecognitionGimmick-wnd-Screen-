import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { StepStatus } from '../types';

interface StepIndicatorProps {
  status: StepStatus;
  title: string;
  index: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ status, title, index }) => {
  let icon = <Circle className="w-5 h-5 text-slate-600" />;
  let textColor = "text-slate-500";
  let borderColor = "border-slate-800";
  let bgColor = "bg-slate-900";

  if (status === StepStatus.ACTIVE) {
    icon = <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />;
    textColor = "text-cyan-400";
    borderColor = "border-cyan-500/50";
    bgColor = "bg-cyan-950/30";
  } else if (status === StepStatus.COMPLETE) {
    icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    textColor = "text-emerald-400";
    borderColor = "border-emerald-500/50";
    bgColor = "bg-emerald-950/30";
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${borderColor} ${bgColor} transition-all duration-300`}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className={`font-mono text-sm uppercase tracking-wider ${textColor}`}>
        0{index + 1} // {title}
      </span>
    </div>
  );
};