import React, { useEffect, useState } from 'react';

export default function AudioWave({ 
  isActive = false, 
  color = 'teal', 
  height = 36, 
  barCount = 28,
  volume = null
}) {
  const [bars, setBars] = useState(() => Array(barCount).fill(15));

  useEffect(() => {
    if (!isActive) {
      setBars(Array(barCount).fill(10));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map((_, i) => {
        // Natural speech wave rhythm
        const wave = Math.sin(Date.now() / 180 + i * 0.45);
        let baseLevel = 25;
        let spikeRange = 40;

        if (volume !== null && volume !== undefined) {
          baseLevel = Math.max(8, Math.min(85, volume * 0.8));
          spikeRange = Math.max(10, volume * 0.5);
        }

        const randomSpike = Math.random() * spikeRange;
        const val = Math.max(8, Math.min(100, Math.abs(wave) * baseLevel + randomSpike));
        return Math.round(val);
      }));
    }, 80);

    return () => clearInterval(interval);
  }, [isActive, barCount, volume]);

  const colorClasses = {
    teal: 'bg-teal-500',
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    slate: 'bg-slate-400'
  };

  const selectedColor = colorClasses[color] || 'bg-teal-500';

  return (
    <div 
      className="flex items-center justify-center gap-1 overflow-hidden px-2"
      style={{ height: `${height}px` }}
      aria-label={isActive ? "Audio active waveform" : "Audio idle"}
    >
      {bars.map((h, idx) => (
        <span
          key={idx}
          className={`w-1 rounded-full transition-all duration-100 ease-out ${selectedColor} ${
            isActive ? 'opacity-90' : 'opacity-30'
          }`}
          style={{
            height: `${h}%`,
            minHeight: '4px'
          }}
        />
      ))}
    </div>
  );
}
