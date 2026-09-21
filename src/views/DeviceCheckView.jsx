import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  Wifi, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  ArrowRight,
  Shield,
  HelpCircle,
  Laptop,
  Check
} from 'lucide-react';
import MicMeter from '../components/MicMeter';

export default function DeviceCheckView({ setCurrentScreen }) {
  const [micActive, setMicActive] = useState(true);
  const [isPlayingTestSound, setIsPlayingTestSound] = useState(false);
  const [audioHeard, setAudioHeard] = useState(true);
  const [quietConfirmed, setQuietConfirmed] = useState(true);
  const [networkLatency, setNetworkLatency] = useState(24); // ms

  const playAudioChime = () => {
    setIsPlayingTestSound(true);
    // Play HTML5 Audio tone or web audio beep
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (err) {
      console.log('Audio test triggered');
    }
    setTimeout(() => {
      setIsPlayingTestSound(false);
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Pre-Interview Diagnostics</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Audio & Environment Check</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify your microphone and headphones so the panel members can hear your clinical answers cleanly.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 font-medium">Step 4 of 4</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
              <div className="w-full h-full bg-teal-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* 1. Microphone Check */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">1. Microphone Sensitivity & Input</h3>
                <p className="text-xs text-slate-500">Default: Built-in Array Microphone (48.0 kHz)</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Permitted
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <p className="text-xs text-slate-600">
              Speak a few words (e.g. <em>"Good morning, my name is Dr. Moore"</em>) to test the green volume bar:
            </p>
            <MicMeter isListening={micActive} sensitivity={1.2} />
          </div>
        </div>

        {/* 2. Speaker / Headphone Test */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">2. Speaker / Headphone Output</h3>
                <p className="text-xs text-slate-500">Ensure you can hear the interviewer panel clearly</p>
              </div>
            </div>
            <button
              onClick={playAudioChime}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                isPlayingTestSound 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isPlayingTestSound ? 'Playing Chime...' : 'Play Test Chime'}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
            <span className="text-slate-600">Did you hear the acoustic chime clearly?</span>
            <div className="flex gap-2">
              <button
                onClick={() => setAudioHeard(true)}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  audioHeard ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                Yes, heard clearly
              </button>
              <button
                onClick={() => setAudioHeard(false)}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  !audioHeard ? 'bg-rose-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                No sound
              </button>
            </div>
          </div>
        </div>

        {/* 3. Network & System Compatibility */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">3. Connection Stability & Browser Compatibility</h3>
              <p className="text-xs text-slate-500">Low audio latency ensures realistic conversational timing</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Latency (RTT)</span>
              <span className="text-sm font-bold text-emerald-700">{networkLatency} ms</span>
              <span className="text-[10px] text-slate-500 block">Excellent</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Packet Loss</span>
              <span className="text-sm font-bold text-emerald-700">0.0%</span>
              <span className="text-[10px] text-slate-500 block">Optimal</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Browser</span>
              <span className="text-sm font-bold text-slate-800">Chrome/WebAudio</span>
              <span className="text-[10px] text-emerald-600 block">Supported</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Audio Buffer</span>
              <span className="text-sm font-bold text-slate-800">40ms</span>
              <span className="text-[10px] text-emerald-600 block">Low Jitter</span>
            </div>
          </div>
        </div>

        {/* 4. Quiet Environment Checklist */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 text-xs">
          <h3 className="font-bold text-sm text-slate-900">4. Interview Readiness Checklist</h3>
          
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={quietConfirmed}
              onChange={(e) => setQuietConfirmed(e.target.checked)}
              className="mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
            <span className="text-slate-700">
              I am in a quiet private room free from ward announcements or background bleeps, and ready to speak aloud.
            </span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('cv-review')}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              Back to CV Facts
            </button>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => setCurrentScreen('live-interview')}
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline"
            >
              Skip checks & enter live interview →
            </button>
          </div>

          <button
            onClick={() => setCurrentScreen('waiting-room')}
            disabled={!audioHeard || !quietConfirmed}
            className="px-8 py-3.5 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white text-sm font-semibold rounded-xl transition shadow-md inline-flex items-center gap-2"
          >
            <span>Proceed to Waiting Room</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
