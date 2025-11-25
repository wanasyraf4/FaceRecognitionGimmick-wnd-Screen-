import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, ShieldCheck, User } from 'lucide-react';

interface EKycStepProps {
  onComplete: () => void;
}

export const EKycStep: React.FC<EKycStepProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.log("Camera access denied or unavailable, using placeholder.");
      }
    };

    startCamera();

    // Sequence timer
    // Reduced duration: 1.5s scan + 1s wait = 2.5s total
    const timer = setTimeout(() => {
      setScanComplete(true);
      setTimeout(onComplete, 1000); 
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 grid grid-cols-[1fr,300px,1fr] gap-4 pointer-events-none opacity-20">
        <div className="border-r border-cyan-900/50 h-full"></div>
        <div className="border-r border-cyan-900/50 h-full"></div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-64 h-80 rounded-xl overflow-hidden border-2 border-cyan-500/30 bg-slate-900 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
      >
        {/* Video Feed or Fallback */}
        {streamActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-80 grayscale contrast-125"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <User className="w-24 h-24 text-slate-600" />
          </div>
        )}

        {/* Face Frame Markers */}
        <div className="absolute inset-4 border-2 border-cyan-400/30 rounded-lg border-dashed"></div>
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

        {/* Scanning Laser */}
        {!scanComplete && (
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Biometric Mesh Overlay (Decoration) */}
        <svg className="absolute inset-0 w-full h-full opacity-30 z-0 pointer-events-none">
           <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
             <circle cx="1" cy="1" r="1" fill="currentColor" className="text-cyan-300" />
           </pattern>
           <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Success State */}
        {scanComplete && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-950/60"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <ShieldCheck className="w-16 h-16 text-emerald-400 drop-shadow-lg" />
            </motion.div>
            <motion.h3 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-emerald-300 font-bold tracking-widest uppercase font-mono text-lg"
            >
              Identity Verified
            </motion.h3>
            <p className="text-emerald-400/70 text-xs font-mono mt-1">Match Confidence: 99.8%</p>
          </motion.div>
        )}
      </motion.div>

      {/* Status Text */}
      <div className="mt-6 font-mono text-cyan-400/80 text-sm flex items-center gap-2">
        {!scanComplete ? (
          <>
            <Scan className="w-4 h-4 animate-pulse" />
            <span>ANALYZING BIOMETRIC VECTORS...</span>
          </>
        ) : (
           <span>BIOMETRIC AUTHENTICATION SUCCESSFUL</span>
        )}
      </div>
    </div>
  );
};