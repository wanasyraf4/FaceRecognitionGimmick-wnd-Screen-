
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepIndicator } from './components/StepIndicator';
import { EKycStep } from './components/steps/EKycStep';
import { WorldCheckStep } from './components/steps/WorldCheckStep';
import { AmlStep } from './components/steps/AmlStep';
import { EddStep } from './components/steps/EddStep';
import { InterimResultStep } from './components/steps/InterimResultStep';
import { SystemApproval } from './components/SystemApproval';
import { ReportGeneration } from './components/ReportGeneration';
import { UserOnboarding } from './components/UserOnboarding';
import { AnalysisStatus, StepStatus } from './types';
import { Play, Sparkles, RotateCcw, Loader2, Cpu } from 'lucide-react';

function App() {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { id: 'ekyc', title: 'Identity Verification' },
    { id: 'world-check', title: 'Global Screening' },
    { id: 'aml', title: 'AML Risk Scoring' },
    { id: 'interim', title: 'Preliminary Analysis' },
    { id: 'edd', title: 'Enhanced Due Diligence' }
  ];

  // 1. SYSTEM ANALYSING (3s) -> APPROVAL
  useEffect(() => {
    if (status === AnalysisStatus.FINALIZING) {
      const timer = setTimeout(() => {
        setStatus(AnalysisStatus.APPROVAL);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // 2. APPROVAL (7s) -> GENERATING
  useEffect(() => {
    if (status === AnalysisStatus.APPROVAL) {
      const timer = setTimeout(() => {
        setStatus(AnalysisStatus.GENERATING);
      }, 7000); // Increased from 5000 to 7000
      return () => clearTimeout(timer);
    }
  }, [status]);

  // 3. GENERATING (5s) -> ONBOARDING
  useEffect(() => {
    if (status === AnalysisStatus.GENERATING) {
      const timer = setTimeout(() => {
        setStatus(AnalysisStatus.ONBOARDING);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // 4. ONBOARDING (3s) -> COMPLETE
  useEffect(() => {
    if (status === AnalysisStatus.ONBOARDING) {
      const timer = setTimeout(() => {
        setStatus(AnalysisStatus.COMPLETE);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const startAnalysis = () => {
    setStatus(AnalysisStatus.RUNNING);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Transition to FINALIZING
      setStatus(AnalysisStatus.FINALIZING);
    }
  };

  const reset = () => {
    setStatus(AnalysisStatus.IDLE);
    setCurrentStepIndex(0);
  }

  const getStepStatus = (index: number) => {
    if (status === AnalysisStatus.IDLE) return StepStatus.PENDING;
    if (status === AnalysisStatus.COMPLETE || 
        status === AnalysisStatus.FINALIZING || 
        status === AnalysisStatus.APPROVAL || 
        status === AnalysisStatus.GENERATING || 
        status === AnalysisStatus.ONBOARDING) return StepStatus.COMPLETE;
    if (index < currentStepIndex) return StepStatus.COMPLETE;
    if (index === currentStepIndex) return StepStatus.ACTIVE;
    return StepStatus.PENDING;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-white/5 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
             <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wider font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Project<span className="text-cyan-400">Chimera</span>
          </h1>
        </div>
        <div className="flex gap-2">
           {steps.map((step, idx) => (
             <div key={step.id} className="hidden md:block">
               <StepIndicator 
                 index={idx} 
                 title={step.title} 
                 status={getStepStatus(idx)} 
               />
             </div>
           ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">
        
        <AnimatePresence mode="wait">
          {status === AnalysisStatus.IDLE && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="mb-8 opacity-50">
                <Sparkles className="w-16 h-16 text-cyan-500 animate-pulse" />
              </div>
              <button 
                onClick={startAnalysis}
                className="group relative px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all duration-200 flex items-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Play className="w-6 h-6 fill-current" />
                <span className="tracking-widest text-lg">INITIALIZE SYSTEM</span>
              </button>
            </motion.div>
          )}

          {status === AnalysisStatus.RUNNING && (
            <motion.div 
              key="running"
              className="w-full max-w-4xl h-[60vh] border border-slate-800 bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
            >
               {/* Scan Line Overlay */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-50 animate-scanline opacity-30 pointer-events-none"></div>

               <AnimatePresence mode="wait">
                 {currentStepIndex === 0 && (
                   <motion.div key="step1" className="h-full" exit={{opacity:0}}>
                     <EKycStep onComplete={nextStep} />
                   </motion.div>
                 )}
                 {currentStepIndex === 1 && (
                   <motion.div key="step2" className="h-full" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                     <WorldCheckStep onComplete={nextStep} />
                   </motion.div>
                 )}
                 {currentStepIndex === 2 && (
                   <motion.div key="step3" className="h-full" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                     <AmlStep onComplete={nextStep} />
                   </motion.div>
                 )}
                 {currentStepIndex === 3 && (
                   <motion.div key="step-interim" className="h-full" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                     <InterimResultStep onComplete={nextStep} />
                   </motion.div>
                 )}
                 {currentStepIndex === 4 && (
                   <motion.div key="step4" className="h-full" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                     <EddStep onComplete={nextStep} />
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
          )}

          {status === AnalysisStatus.FINALIZING && (
             <motion.div 
               key="finalizing"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               className="flex flex-col items-center justify-center z-50"
             >
               <div className="relative mb-8">
                 <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                 <div className="relative z-10 w-24 h-24 rounded-full border border-slate-700 bg-slate-900/80 flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-cyan-400 animate-pulse" />
                 </div>
                 {/* Spinning Ring */}
                 <div className="absolute inset-[-10px] border-2 border-transparent border-t-cyan-500/50 border-l-cyan-500/50 rounded-full animate-spin"></div>
               </div>
               <h2 className="text-2xl font-bold font-mono text-white tracking-widest animate-pulse">SYSTEM ANALYSING</h2>
               <p className="text-cyan-500/70 font-mono text-sm mt-2">Aggregating 428 Data Points...</p>
               <div className="mt-4 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                 <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                 <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
               </div>
             </motion.div>
          )}

          {status === AnalysisStatus.APPROVAL && (
             <motion.div 
               key="approval"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="z-50 w-full flex items-center justify-center"
             >
               <SystemApproval />
             </motion.div>
          )}

          {status === AnalysisStatus.GENERATING && (
             <motion.div 
               key="generating"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               className="w-full max-w-4xl h-[50vh] border border-slate-800 bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
             >
               <ReportGeneration />
             </motion.div>
          )}

          {status === AnalysisStatus.ONBOARDING && (
             <motion.div 
               key="onboarding"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
               className="flex-1 w-full flex items-center justify-center z-50"
             >
                <UserOnboarding />
             </motion.div>
          )}

          {status === AnalysisStatus.COMPLETE && (
            <motion.div 
               key="complete"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full h-full flex flex-col items-center justify-center z-50 text-center p-8"
            >
               <motion.h1 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-emerald-200 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] leading-tight max-w-7xl mx-auto"
               >
                 Welcome to Labuan International Compliance Conference 2025
               </motion.h1>

               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 2.5, duration: 1 }}
                 className="mt-20"
               >
                 <button 
                    onClick={reset}
                    className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-[0.3em] hover:scale-105 transform duration-300"
                 >
                   <RotateCcw className="w-4 h-4" />
                   System Reset
                 </button>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-600 font-mono z-10">
        Project Chimera // SYSTEM V2.7 // SECURED CONNECTION
      </footer>

      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
