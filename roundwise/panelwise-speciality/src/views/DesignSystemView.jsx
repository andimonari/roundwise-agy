import React from 'react';
import { 
  Palette, 
  Type, 
  Layers, 
  ShieldCheck, 
  Volume2, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  Mic
} from 'lucide-react';
import AudioWave from '../components/AudioWave';
import MicMeter from '../components/MicMeter';

export default function DesignSystemView() {
  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded border border-teal-200">
              Deliverable 15, 16 & 17
            </span>
            <span className="text-xs text-slate-500 font-medium">Design Tokens, States & Microcopy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Panelwise Speciality Design System Reference
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Clinical credibility guidelines, color tokens, accessible component states, and regulatory microcopy.
          </p>
        </div>

        {/* 1. Brand Color System (Restrained Blue, Teal, Slate & Warm Accents) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Palette className="w-5 h-5 text-teal-600" />
            <span>1. Restrained Healthcare Color Palette (Non-NHS Blue)</span>
          </h2>
          <p className="text-xs text-slate-600">
            Carefully selected to provide clinical authority and reassurance without copying NHS Blue (#005EB8) or confusing endorsement.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
            <div className="space-y-1">
              <div className="h-16 rounded-xl bg-teal-700 shadow-xs flex items-end p-2 text-white font-mono text-[10px]">#0F766E</div>
              <span className="font-bold text-slate-800 block">Teal Primary</span>
              <span className="text-[10px] text-slate-500">CTA & Focus</span>
            </div>
            <div className="space-y-1">
              <div className="h-16 rounded-xl bg-slate-900 shadow-xs flex items-end p-2 text-white font-mono text-[10px]">#0F172A</div>
              <span className="font-bold text-slate-800 block">Slate Navy</span>
              <span className="text-[10px] text-slate-500">Header & Panel BG</span>
            </div>
            <div className="space-y-1">
              <div className="h-16 rounded-xl bg-slate-800 shadow-xs flex items-end p-2 text-white font-mono text-[10px]">#1E293B</div>
              <span className="font-bold text-slate-800 block">Deep Surface</span>
              <span className="text-[10px] text-slate-500">Simulation Tiles</span>
            </div>
            <div className="space-y-1">
              <div className="h-16 rounded-xl bg-emerald-600 shadow-xs flex items-end p-2 text-white font-mono text-[10px]">#059669</div>
              <span className="font-bold text-slate-800 block">Emerald Accent</span>
              <span className="text-[10px] text-slate-500">Distinction Rubric</span>
            </div>
            <div className="space-y-1">
              <div className="h-16 rounded-xl bg-amber-500 shadow-xs flex items-end p-2 text-white font-mono text-[10px]">#D97706</div>
              <span className="font-bold text-slate-800 block">Warm Amber</span>
              <span className="text-[10px] text-slate-500">Time Warning (60s)</span>
            </div>
            <div className="space-y-1">
              <div className="h-16 rounded-xl bg-rose-600 shadow-xs flex items-end p-2 text-white font-mono text-[10px]">#E11D48</div>
              <span className="font-bold text-slate-800 block">Rose Accent</span>
              <span className="text-[10px] text-slate-500">Critical Omission</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Audio Visualizers & Meters */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-teal-600" />
            <span>2. Audio Waveforms & VU Meters</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase block">Panel Speaking Waveform</span>
              <AudioWave isActive={true} color="teal" height={36} barCount={26} />
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs text-slate-600 font-semibold uppercase block">Candidate Mic Sensitivity Meter</span>
              <MicMeter isListening={true} sensitivity={1.1} />
            </div>
          </div>
        </div>

        {/* 3. Component States & Error States Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-600" />
            <span>3. Component States & Error States Catalog</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                State: Verified / Confirmed
              </span>
              <p className="text-slate-600">Applied when candidate confirms CV fact or payment transaction clears successfully.</p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
              <span className="font-bold text-amber-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                State: Time Warning (60s Remaining)
              </span>
              <p className="text-slate-600">Soft non-intrusive warning indicating concluding 60 seconds of station time.</p>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <span className="font-bold text-rose-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                State: Device / Stream Error
              </span>
              <p className="text-slate-600">Triggered if mic permission is revoked or network audio packets drop.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-300 bg-slate-100 space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                State: Expired Preparation Access
              </span>
              <p className="text-slate-600">Graceful read-only state allowing access to past transcripts with renewal options.</p>
            </div>
          </div>
        </div>

        {/* 4. Suggested Microcopy Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Type className="w-5 h-5 text-teal-600" />
            <span>4. Suggested Regulatory & Clinical Microcopy Catalog</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-800 block">Independence & Non-Affiliation Disclaimer (Hero & Footer):</strong>
              <span className="text-slate-600 italic">
                “Panelwise Speciality is an independent simulation service. Not affiliated with, endorsed by, or operated by NHS England, Health Education England, the GMC, or any Royal Medical College.”
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-800 block">Patient Identifiable Data (PID) Warning (CV Upload):</strong>
              <span className="text-slate-600 italic">
                “Do not disclose identifiable patient information. Ensure your CV and spoken clinical answers exclude NHS numbers, patient names, and hospital identifiers in accordance with Caldicott principles.”
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-800 block">No Infallibility of Extraction (CV Review):</strong>
              <span className="text-slate-600 italic">
                “Automated extraction is an aid, not infallible. Please verify or correct dates and hospital trusts before entering your mock.”
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-800 block">Model Answer Framing (Question Feedback):</strong>
              <span className="text-slate-600 italic">
                “Illustrative Answer Structure: Provided as a clinical communication framework only. Does not fabricate candidate achievements.”
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
