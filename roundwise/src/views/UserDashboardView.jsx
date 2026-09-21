import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  Calendar, 
  Award, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  Download, 
  Plus, 
  ArrowRight,
  RotateCcw,
  BarChart2,
  CheckCircle2,
  Sliders,
  Settings
} from 'lucide-react';
import { INITIAL_CV_FACTS, MOCK_SCORING_SUMMARY } from '../data/mockData';

export default function UserDashboardView({ setCurrentScreen }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'simulations', 'cv-data', 'privacy'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [redactionTriggered, setRedactionTriggered] = useState(false);

  const previousAttempts = [
    {
      id: 'att-1',
      date: '21 Sep 2026',
      specialty: 'Internal Medicine Training (IMT)',
      pathway: 'ST1 Round 1',
      stations: 3,
      score: '14.3 / 15.0',
      percentage: '95.3%',
      status: 'Completed',
      tier: 'Well Above Threshold'
    },
    {
      id: 'att-2',
      date: '14 Sep 2026',
      specialty: 'Internal Medicine Training (IMT)',
      pathway: 'ST1 Baseline',
      stations: 3,
      score: '11.8 / 15.0',
      percentage: '78.6%',
      status: 'Completed',
      tier: 'Above Appointability'
    },
    {
      id: 'att-3',
      date: '08 Sep 2026',
      specialty: 'Core Surgical Training (CST)',
      pathway: 'CT1 Diagnostic Drill',
      stations: 1,
      score: '4.0 / 5.0',
      percentage: '80.0%',
      status: 'Completed',
      tier: 'Satisfactory Pass'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Candidate Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Dr. Alexander Moore MBBS</h1>
                <span className="text-[10px] font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                  GMC: 7849201
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Target Pathway: <strong>Internal Medicine Training (IMT-ST1)</strong> · Foundation Year 2 (St Thomas’)
              </p>
            </div>
          </div>

          {/* Subscription Status Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5 min-w-[220px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Plan:</span>
              <span className="font-bold text-teal-800">2 Months Access (£40)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Days Remaining:</span>
              <span className="font-bold text-slate-900">42 Days Left</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Completed Mocks:</span>
              <span className="font-bold text-slate-900">3 of 20 (Fair-Use)</span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-200 text-xs sm:text-sm font-semibold gap-6 text-slate-500">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition ${activeTab === 'overview' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            Overview & Score Trends
          </button>
          <button
            onClick={() => setActiveTab('simulations')}
            className={`pb-3 transition ${activeTab === 'simulations' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            Simulation History ({previousAttempts.length})
          </button>
          <button
            onClick={() => setActiveTab('cv-data')}
            className={`pb-3 transition ${activeTab === 'cv-data' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            CV Facts & Profile ({INITIAL_CV_FACTS.length})
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 transition ${activeTab === 'privacy' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            Privacy, Redaction & Data Controls
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-teal-300">Ready for your next mock?</span>
                <h3 className="text-xl font-bold text-white">Start a timed IMT Station 1 Simulation</h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Simulate high-acuity clinical prioritisation, medical emergencies, and difficult communication with the 3-member consultant panel.
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen('setup')}
                className="px-6 py-3 bg-white text-teal-900 hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-bold shadow-md transition transform-gpu active:scale-95 shrink-0"
              >
                Launch Mock Session
              </button>
            </div>

            {/* Score Progress Trends */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-teal-600" />
                <span>Domain Progression (Last 3 Attempts)</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-700 font-semibold mb-1">
                    <span>Clinical Judgement & Prioritisation</span>
                    <span className="text-teal-700">88% → 90% (Distinction Trajectory)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[90%] h-full bg-teal-600 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 font-semibold mb-1">
                    <span>GMC Professionalism & Duty of Candour</span>
                    <span className="text-emerald-700">82% → 100% (Benchmark Standard)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[100%] h-full bg-emerald-600 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 font-semibold mb-1">
                    <span>Quality Improvement & Reflective Portfolio</span>
                    <span className="text-teal-700">76% → 96% (Significant Improvement)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[96%] h-full bg-teal-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIMULATIONS */}
        {activeTab === 'simulations' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center text-xs text-slate-600">
              <span className="font-bold text-slate-900">Recorded Simulation Circuits</span>
              <span>Showing 3 completed sessions</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {previousAttempts.map((att, i) => (
                <div key={i} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{att.specialty}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                        {att.pathway}
                      </span>
                    </div>
                    <p className="text-slate-500">Date: {att.date} · {att.stations} Stations Completed</p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <span className="font-bold text-sm text-teal-800">{att.score}</span>
                      <span className="text-[10px] text-slate-400 block font-medium">{att.tier}</span>
                    </div>

                    <button
                      onClick={() => setCurrentScreen('results')}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 rounded-lg font-semibold text-xs transition"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CV FACTS & PROFILE */}
        {activeTab === 'cv-data' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Verified Candidate Portfolio Profile</h3>
                <p className="text-xs text-slate-500">Extracted from Dr_Alexander_Moore_Clinical_CV_2026.pdf</p>
              </div>
              <button
                onClick={() => setCurrentScreen('cv-review')}
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold"
              >
                Edit / Verify Facts
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {INITIAL_CV_FACTS.slice(0, 6).map((f, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-teal-800 uppercase block">{f.category}</span>
                  <div className="font-bold text-slate-800">{f.title}</div>
                  <div className="text-slate-500">{f.institution}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRIVACY & DATA CONTROLS */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            {/* Redaction Workflow */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Accidental Patient Identifiable Data (PID) Redaction Workflow</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                If you accidentally spoke a patient name, hospital number, or identifiable clinical detail during your voice simulation, trigger our immediate cryptographic redaction tool below to purge it from all transcripts and cache buffers.
              </p>
              
              {redactionTriggered ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Redaction workflow executed: Transcripts re-indexed and PII scrubbed.</span>
                </div>
              ) : (
                <button
                  onClick={() => setRedactionTriggered(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition"
                >
                  Trigger Instant Speech Redaction Scan
                </button>
              )}
            </div>

            {/* Subject Access Export */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Download className="w-4 h-4 text-teal-600" />
                <span>GDPR Subject Access Data Export</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Download a machine-readable JSON archive of all your account data, verified CV facts, simulation transcripts, and rubric ratings.
              </p>
              <button
                onClick={() => alert("Downloading encrypted JSON data package...")}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All Personal Data (JSON)</span>
              </button>
            </div>

            {/* Irreversible Account & Data Deletion */}
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Permanent Account & Data Erasure</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Permanently delete your candidate profile, uploaded CV, extracted facts, transcripts, and audio recordings. This action cannot be reversed.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg transition"
              >
                Delete Account and All Data
              </button>
            </div>
          </div>
        )}

        {/* Modal: Delete Confirmation */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Permanently delete your account?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This will immediately purge all verified CV facts, interview recordings, scoring reports, and subscription records. You will immediately lose remaining access days.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCurrentScreen('landing');
                  }}
                  className="flex-1 py-2.5 bg-rose-700 text-white text-xs font-bold rounded-xl"
                >
                  Confirm Full Erasure
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
