import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Mic, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  Play, 
  AlertCircle, 
  HelpCircle, 
  Layers, 
  UserCheck, 
  BarChart3, 
  Volume2, 
  Smartphone, 
  Laptop,
  GraduationCap,
  Stethoscope,
  ChevronDown
} from 'lucide-react';
import { SPECIALTIES, COMMERCIAL_PRICING, FAQS } from '../data/mockData';

export default function LandingView({ setCurrentScreen, isMobileMode = false }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedSpecialtyPreview, setSelectedSpecialtyPreview] = useState(SPECIALTIES[0]);
  const [viewMode, setViewMode] = useState(isMobileMode ? 'mobile' : 'desktop');

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className={`w-full min-h-screen ${viewMode === 'mobile' ? 'max-w-md mx-auto border-x border-slate-300 shadow-2xl bg-white my-4 rounded-2xl overflow-hidden' : ''}`}>
      {/* Responsive Viewport Mode Bar (for demoing desktop vs mobile) */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Landing Page Viewport Preview:</span>
          <span className="text-[11px] bg-slate-200 px-2 py-0.5 rounded text-slate-700">
            {viewMode === 'mobile' ? 'Mobile Phone (390px)' : 'Full Desktop (Responsive)'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition ${
              viewMode === 'desktop' ? 'bg-teal-700 text-white font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition ${
              viewMode === 'mobile' ? 'bg-teal-700 text-white font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-850 text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Independent AI Specialty Panel Simulation</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Practise the interview, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300">
                  not just the questions.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Complete realistic, timed medical interview simulations tailored to your experience and scored against structured specialty-specific criteria.
              </p>

              {/* Legal Notice Callout */}
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs text-slate-400 flex items-start gap-2.5 text-left">
                <Shield className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Independent preparation service:</strong> Designed for UK doctors applying to ST1, CT1 and ST3 training. Not affiliated with NHS England or the Royal Colleges. No false promises; just authentic, rubric-governed clinical practice.
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
                <button
                  onClick={() => setCurrentScreen('setup')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2 transition transform-gpu active:scale-95"
                >
                  <span>Start Practising</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentScreen('results')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition"
                >
                  <span>See How It Works</span>
                  <Play className="w-3.5 h-3.5 text-teal-400" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Your CV verified before simulation
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Strict time warnings & no coaching during mocks
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  GMC & Royal College rubric anchors
                </span>
              </div>
            </div>

            {/* Right Column: High-Fidelity Product Demonstration Card (Live Simulation Sneak Peek) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-800/90 border border-slate-700 shadow-2xl p-5 overflow-hidden backdrop-blur-md">
                {/* Header of mock card */}
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                    </span>
                    <span className="text-xs font-semibold uppercase text-slate-300">Live Voice Panel Demo</span>
                  </div>
                  <span className="text-[11px] font-mono bg-slate-900 px-2 py-0.5 rounded text-amber-300 border border-slate-700">
                    Remaining: 04:18
                  </span>
                </div>

                {/* Panel Member Active Tile */}
                <div className="bg-slate-900/90 rounded-xl p-4 border border-teal-500/40 relative mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-800/80 text-teal-200 flex items-center justify-center font-bold text-sm border border-teal-600/50">
                        AV
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-xs sm:text-sm">Dr. Alistair Vance</span>
                          <span className="bg-teal-950 text-teal-300 text-[10px] font-medium px-1.5 py-0.2 rounded border border-teal-800">
                            Speaking
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">Chair · Acute Medical Consultant</p>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-teal-400 animate-pulse" />
                  </div>

                  {/* Speech waveform snippet */}
                  <div className="mt-3 flex items-center gap-1 h-6">
                    {[35, 60, 85, 45, 95, 70, 40, 65, 80, 50, 90, 75, 40, 55, 70, 85, 60, 40, 65, 90, 45, 80, 55].map((h, i) => (
                      <span key={i} className="flex-1 bg-teal-400 rounded-full" style={{ height: `${h}%` }} />
                    ))}
                  </div>

                  <p className="mt-2 text-xs text-slate-300 italic bg-slate-950/60 p-2.5 rounded border border-slate-800/60">
                    “You have an unstable haematemesis on AMU and a silent chest in ED. How do you assess, manage, and prioritise this situation?”
                  </p>
                </div>

                {/* Candidate Self View Tile */}
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                      YOU
                    </div>
                    <div>
                      <span className="text-white text-xs font-medium">Candidate Audio Active</span>
                      <p className="text-[10px] text-slate-400">Microphone connected · 44.1 kHz</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Ready to speak
                  </span>
                </div>

                {/* Interactive trigger into full mock */}
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Try interactive simulation:</span>
                  <button
                    onClick={() => setCurrentScreen('live-interview')}
                    className="text-xs text-teal-300 hover:text-teal-200 font-semibold inline-flex items-center gap-1"
                  >
                    Open Full Mock Console
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Value Process Section (Confetto-Inspired, Medical Precision) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              The 3-Step Simulation Cycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              How Roundwise prepares you for panel day
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From your clinical portfolio to rigorous voice simulation and objective rubric-anchored feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Upload & Verify CV Facts</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Our secure parser extracts your audits, teaching, clinical posts, and publications. You review and verify every fact before it can influence your interview questions.
              </p>
              <div className="text-xs text-teal-800 font-medium bg-teal-50 p-2.5 rounded-lg border border-teal-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Zero guesswork; candidate maintains full control</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Voice-Based Timed Mock</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Enter the virtual panel. Different AI panel members question you according to assigned roles (Chair, Clinical Lead, Lay Assessor). Strict timers and silence handling.
              </p>
              <div className="text-xs text-slate-700 font-medium bg-slate-100 p-2.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                <span>No live coaching during scored simulation</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-xs">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Detailed Rubric Feedback</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Receive domain scores citing exact transcript evidence. See what was done well, missing clinical points, and illustrative structure models for every station.
              </p>
              <div className="text-xs text-emerald-800 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Scored against administrator rubrics, not generic advice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built specifically for UK Medical Specialty Training
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Unlike generic AI chat tools, Roundwise adheres to the rigorous structure of UK specialty recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Realistic Multi-Member Panels</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Consultant interviewers, academic tutors, and lay assessors ask distinct questions aligned with their specific station responsibilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">CV-Tailored Questioning</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Probe your actual Quality Improvement Projects, clinical audits, research publications, and clinical leadership without inventing facts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Strict Time Management</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Master delivering concise, structured ABCDE, SPIKES, or CAMP responses under the exact 3 to 6-minute constraints of national interviews.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Transcript Evidence Scoring</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Feedback cites word-for-word quotes from your answers to substantiate why you scored satisfactory, good, or outstanding against the rubric.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Privacy & PII Protection</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Strict warnings against disclosing patient identifiable data. Optional audio retention and immediate data deletion controls at your fingertips.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Illustrative Answer Structures</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Study benchmark response architectures (e.g. Duty of Candour, Just Culture) clearly labeled as structural frameworks, not fabricated claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Selection Preview Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Preview Supported Specialty Pathways
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select a specialty below to view its simulated panel composition, typical stations, and time allocations.
            </p>
          </div>

          {/* Specialty Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {SPECIALTIES.map(spec => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialtyPreview(spec)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                  selectedSpecialtyPreview.id === spec.id
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {spec.name.split('(')[0]}
              </button>
            ))}
          </div>

          {/* Detailed Preview Card */}
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded">
                    {selectedSpecialtyPreview.code}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Level: {selectedSpecialtyPreview.level}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedSpecialtyPreview.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Recruitment standard reference: {selectedSpecialtyPreview.recruitmentLead}
                </p>
              </div>

              <button
                onClick={() => setCurrentScreen('setup')}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold self-start sm:self-auto transition"
              >
                Set up this specialty
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stations */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Simulated Stations & Focus Areas
                </h4>
                <div className="space-y-2.5">
                  {selectedSpecialtyPreview.stations.map((st, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-800">
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </div>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel Composition */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Default Panel Composition
                </h4>
                <div className="space-y-2.5">
                  {selectedSpecialtyPreview.panelists.map((panelist, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200">
                      <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold">
                        {panelist.name.split(' ')[1]?.[0] || 'D'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{panelist.name}</div>
                        <div className="text-[11px] text-slate-500">{panelist.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Feedback Excerpt Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Sample Feedback Excerpt
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Actionable insights, not generic summaries
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              See how our scoring engine breaks down your exact spoken words against published UK recruitment rubrics.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-850 rounded-2xl border border-slate-700 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4 mb-4">
              <div>
                <span className="text-xs text-teal-400 font-semibold uppercase">Question 2 Excerpt</span>
                <h3 className="text-lg font-bold text-white">FY1 Heparin 10x Overdose Incident (GMC Ethics)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-teal-300">5.0</span>
                <span className="text-xs text-slate-400">/ 5.0 (Distinction Anchor)</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-700/80">
                <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Direct Transcript Evidence Cited:
                </div>
                <p className="text-slate-300 italic">
                  “I would accompany the FY1 immediately to the bedside to assess the patient... contact haematology and pharmacy to discuss protamine reversal... reassure them that concealment transforms a clinical mistake into a fitness-to-practise issue.”
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-700/80">
                <div className="font-semibold text-teal-300 mb-1">
                  Why this scored distinction:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Candidate systematically prioritized immediate patient safety while establishing psychological safety for the junior colleague. Perfectly integrated statutory Duty of Candour and Just Culture incident reporting.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
              <button
                onClick={() => setCurrentScreen('results')}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1.5"
              >
                <span>View Full Results Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Teaser */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Clear Transparent Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Fixed access plans for your interview timeline
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              One-off fee. No hidden recurring subscriptions. Select what matches your recruitment round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {COMMERCIAL_PRICING.map(plan => (
              <div 
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 border transition flex flex-col justify-between ${
                  plan.popular 
                    ? 'border-teal-600 bg-teal-50/20 ring-2 ring-teal-600/30' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-slate-900">{plan.name}</h3>
                    {plan.popular && (
                      <span className="text-[10px] font-bold uppercase bg-teal-700 text-white px-2.5 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.priceGbp}</span>
                    <span className="text-xs text-slate-500 font-medium">/{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">
                    {plan.id === 'plan-1month' ? 'Ideal for final-stage interview readiness.' : 'Full coverage across initial preparation and mock iterations.'}
                  </p>

                  <div className="space-y-3 mb-6">
                    {plan.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('checkout')}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    plan.popular
                      ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentScreen('pricing')}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold underline"
            >
              See complete commercial terms, fair-use limits & TBC details →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Clear answers regarding privacy, independence, and simulation mechanics.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-teal-800 transition"
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-teal-600' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Pre-Footer Call to Action */}
      <section className="py-16 bg-gradient-to-r from-teal-800 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to test yourself under realistic panel conditions?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Choose your UK specialty pathway, verify your extracted CV facts, and experience realistic panel interviews with structured scoring.
          </p>
          <div className="pt-3">
            <button
              onClick={() => setCurrentScreen('setup')}
              className="px-8 py-3.5 rounded-xl bg-white text-teal-900 hover:bg-slate-100 font-bold text-sm shadow-lg transition transform-gpu active:scale-95"
            >
              Start Your Simulation Setup
            </button>
          </div>
          <p className="text-[11px] text-teal-200/80 pt-2">
            No long-term contracts. Strictly independent simulation service.
          </p>
        </div>
      </section>
    </div>
  );
}
