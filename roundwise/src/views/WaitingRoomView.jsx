import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  LogOut,
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';

export default function WaitingRoomView({ setCurrentScreen }) {
  const [secondsRemaining, setSecondsRemaining] = useState(25);
  const specialty = SPECIALTIES[0]; // IMT

  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Waiting Room Card */}
        <div className="bg-slate-850 rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl">
          {/* Top Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 text-teal-300 text-xs font-semibold border border-teal-800">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                <span>Virtual Waiting Room · Candidate Checked In</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Dr. Alexander Moore MBBS
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Candidate GMC Reference: 7849201 · Pathway: <strong>Internal Medicine Training (IMT-ST1)</strong>
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="text-center sm:text-right bg-slate-900/80 p-3 rounded-2xl border border-slate-700 shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Estimated Panel Admission
              </span>
              <span className="text-2xl font-mono font-bold text-teal-300">
                00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
              </span>
              <span className="text-[10px] text-slate-500 block">3 Stations · 30 Mins Total</span>
            </div>
          </div>

          {/* Panel Members Presentation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-400" />
              <span>Assigned Interview Panel Members (Simulated)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {specialty.panelists.map((panelist, idx) => (
                <div key={panelist.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-teal-900 text-teal-200 flex items-center justify-center font-bold text-xs border border-teal-700">
                      {panelist.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">{panelist.name}</div>
                      <div className="text-[10px] text-teal-400">{panelist.role.split('&')[0]}</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {idx === 0 && 'Assessing Clinical Scenario & Acute Prioritisation (ABCDE).'}
                    {idx === 1 && 'Assessing Professionalism, GMC Ethics & Incident Reporting.'}
                    {idx === 2 && 'Assessing Verified Portfolio, Leadership & Quality Improvement.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines & Rules */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 space-y-2 text-xs text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-400" />
              <span>Panel Interview Rules & Instructions</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
              <li>Speak clearly and audibly when answering. The panel will listen without interruption.</li>
              <li>You may request <strong>one question repeat</strong> per station using the repeat control.</li>
              <li>Visible time warnings will appear at 1 minute remaining. No live coaching is permitted during the scored run.</li>
              <li>Do NOT reveal patient identifiable details during clinical reflections.</li>
            </ul>
          </div>

          {/* AI Simulation Disclosure */}
          <div className="p-3.5 bg-teal-950/40 rounded-xl border border-teal-800/60 text-xs text-teal-200/90 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Simulated Educational Tool:</strong> The panel members are AI persona simulations operating under administrator scoring rubrics. This session is an independent practice tool and has no bearing on actual NHS recruitment outcomes.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={() => setCurrentScreen('user-dashboard')}
              className="w-full sm:w-auto px-4 py-2.5 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-2 rounded-xl hover:bg-slate-800 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Leave Waiting Room & Return to Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentScreen('live-interview')}
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2"
            >
              <span>Enter Interview Panel Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
