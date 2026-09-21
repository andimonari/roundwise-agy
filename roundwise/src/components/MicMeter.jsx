import React, { useEffect, useState } from 'react';

export default function MicMeter({ isListening = true, sensitivity = 1 }) {
  const [level, setLevel] = useState(25);

  useEffect(() => {
    if (!isListening) {
      setLevel(0);
      return;
    }

    const timer = setInterval(() => {
      // simulate realistic mic input noise + speech spikes
      const base = 20 + Math.random() * 35;
      const spike = Math.random() > 0.65 ? Math.random() * 35 * sensitivity : 0;
      setLevel(Math.min(100, Math.round(base + spike)));
    }, 120);

    return () => clearInterval(timer);
  }, [isListening, sensitivity]);

  const segments = 16;
  const activeSegments = Math.round((level / 100) * segments);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5 text-xs text-slate-600 font-medium">
        <span>Input level</span>
        <span className={level > 15 ? 'text-teal-600 font-semibold' : 'text-slate-400'}>
          {level > 15 ? 'Signal Detected (Good)' : 'Low Signal'}
        </span>
      </div>
      <div className="flex gap-1 h-3.5 bg-slate-100 p-0.5 rounded border border-slate-200">
        {Array.from({ length: segments }).map((_, idx) => {
          const isActive = idx < activeSegments;
          let color = 'bg-slate-200';
          if (isActive) {
            if (idx < 10) color = 'bg-emerald-500';
            else if (idx < 13) color = 'bg-amber-500';
            else color = 'bg-rose-500';
          }
          return (
            <div
              key={idx}
              className={`flex-1 rounded-sm transition-all duration-75 ${color}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>-60 dB</span>
        <span>-24 dB (Recommended)</span>
        <span>0 dB (Clipping)</span>
      </div>
    </div>
  );
}
