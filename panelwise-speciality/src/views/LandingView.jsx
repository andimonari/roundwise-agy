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
  ChevronDown,
  Palette
} from 'lucide-react';
import { SPECIALTIES, COMMERCIAL_PRICING, FAQS } from '../data/mockData';

export default function LandingView({ setCurrentScreen, isMobileMode = false, designMode = 'healthcare' }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedSpecialtyPreview, setSelectedSpecialtyPreview] = useState(SPECIALTIES[0]);
  const [viewMode, setViewMode] = useState(isMobileMode ? 'mobile' : 'desktop');

  const isIndustry = designMode === 'industry';

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const industryFeatures = [
    { kicker: "Voice", title: "Spoken, timed answers", body: "Answer out loud against a question timer, the way a real panel runs." },
    { kicker: "Rubric", title: "Structured scoring", body: "Domains, anchors and weightings set by the administrator — not generic AI opinion." },
    { kicker: "CV-aware", title: "Personalised wording", body: "Questions may be worded around facts you confirmed. The competency tested never changes." },
    { kicker: "Evidence", title: "Transcript-cited feedback", body: "Every score points at what you actually said. Inaudible content is marked, never guessed." },
    { kicker: "Panel", title: "Multi-member panels", body: "Distinct seats with assigned roles and domains, following the pathway template." },
    { kicker: "Access", title: "Accessibility built in", body: "Captions, displayed questions, adjustable text, reduced motion and full keyboard operation." }
  ];

  const industryFlowSteps = [
    { n: "01", label: "Landing" },
    { n: "02", label: "Register" },
    { n: "03", label: "Purchase" },
    { n: "04", label: "Setup" },
    { n: "05", label: "CV upload" },
    { n: "06", label: "Fact review" },
    { n: "07", label: "Device check" },
    { n: "08", label: "Waiting room" },
    { n: "09", label: "Interview" },
    { n: "10", label: "Results" }
  ];

  return (
    <div className={`w-full min-h-screen ${
      isIndustry ? 'bg-[#f2f2f3] text-[#1d1f20]' : 'bg-slate-50 text-slate-800'
    } ${viewMode === 'mobile' ? 'max-w-md mx-auto border-x border-slate-300 shadow-2xl bg-white my-4 rounded-2xl overflow-hidden' : ''}`}>
      
      {/* Top Controls & Viewport Mode Bar */}
      <div className={`px-4 py-2 flex flex-wrap items-center justify-between text-xs border-b ${
        isIndustry ? 'bg-[#e9e9ea] border-slate-300 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Landing Page Viewport:</span>
          <span className={`text-[11px] px-2 py-0.5 border ${
            isIndustry ? 'border-slate-400 bg-white text-slate-800' : 'bg-slate-200 text-slate-700 rounded'
          }`}>
            {viewMode === 'mobile' ? 'Mobile Phone (390px)' : 'Full Desktop (1360px Frame)'}
          </span>
          {isIndustry && (
            <span className="tag-industry text-[10px] hidden sm:inline">
              Industry Blueprint Design System Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white p-0.5 border border-slate-300 rounded">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs transition ${
                viewMode === 'desktop' ? (isIndustry ? 'bg-[#5980a6] text-white font-medium' : 'bg-teal-700 text-white font-medium rounded') : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs transition ${
                viewMode === 'mobile' ? (isIndustry ? 'bg-[#5980a6] text-white font-medium' : 'bg-teal-700 text-white font-medium rounded') : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          <button
            onClick={() => setCurrentScreen('design-comparison')}
            className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold underline hidden md:inline"
          >
            Compare Designs
          </button>
        </div>
      </div>

      {/* ─── HERO SECTION ─── */}
      {isIndustry ? (
        /* DESIGN B: INDUSTRY TECHNICAL BLUEPRINT HERO (DIRECT FROM HANDOFF) */
        <section className="relative px-6 py-12 lg:py-16 border-b border-[#1d1f20]/15">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#5980a6] text-[#416180] text-xs uppercase tracking-wider font-semibold">
                Independent Preparation Service
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1f20] leading-none" style={{ fontFamily: 'var(--font-industry-heading)' }}>
                Practise the interview,<br />
                <span className="text-[#5980a6]">not just the questions.</span>
              </h1>

              <p className="text-lg text-slate-700 max-w-xl leading-relaxed">
                Complete realistic, timed medical interview simulations tailored to your experience and scored against structured specialty-specific criteria.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setCurrentScreen('setup')}
                  className="relative px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-none"
                  style={{
                    background: '#5980a6',
                    fontFamily: 'var(--font-industry-heading)',
                    borderRadius: 0
                  }}
                >
                  <i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i>
                  <i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i>
                  <span>Start practising</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('results')}
                  className="px-5 py-3 text-sm font-bold text-slate-800 border bg-transparent"
                  style={{
                    borderColor: 'color-mix(in srgb, #1d1f20 25%, transparent)',
                    fontFamily: 'var(--font-industry-heading)',
                    borderRadius: 0
                  }}
                >
                  See how it works
                </button>
              </div>

              <p className="text-xs text-slate-500 italic max-w-lg pt-1">
                Panel members are AI-generated. Scoring follows a rubric configured by the platform administrator and is not an official recruitment result.
              </p>
            </div>

            {/* Right Hero Column: Spec Board Simulation Preview Plate */}
            <div className="lg:col-span-5">
              <figure className="relative blueprint-obj p-0 text-[#f2f2f3]" style={{ background: '#1d2d3d', borderRadius: 0, borderColor: 'rgba(242,242,243,0.3)' }}>
                <i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i>
                <i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i>

                <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 text-xs tracking-wider uppercase font-bold" style={{ fontFamily: 'var(--font-industry-heading)' }}>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#e0a370] animate-ping" />
                    <span>Simulation Preview</span>
                  </span>
                  <span className="font-mono text-slate-300">18:42 / 30:00</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 p-4">
                  {/* Seat 1 */}
                  <div className="border border-white/40 p-3 flex flex-col gap-1.5" style={{ borderRadius: 0 }}>
                    <div className="h-10 border border-dashed border-white/30 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                      SEAT 01
                    </div>
                    <div className="font-bold text-xs" style={{ fontFamily: 'var(--font-industry-heading)' }}>Dr. Vance</div>
                    <div className="text-[10px] text-slate-400">Chair</div>
                  </div>

                  {/* Seat 2 (Speaking now) */}
                  <div className="border border-[#e0a370] p-3 flex flex-col gap-1.5" style={{ background: 'rgba(224,163,112,0.12)', borderRadius: 0 }}>
                    <div className="h-10 border border-dashed border-[#e0a370]/50 flex items-end justify-center gap-1 p-1">
                      {[35, 75, 100, 60, 85].map((h, i) => (
                        <span key={i} className="w-1 bg-[#e0a370] rounded-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="font-bold text-xs text-[#e0a370]" style={{ fontFamily: 'var(--font-industry-heading)' }}>Dr. Jenkins</div>
                    <div className="text-[10px] text-[#e0a370]">Speaking now</div>
                  </div>

                  {/* Seat 3 */}
                  <div className="border border-white/40 p-3 flex flex-col gap-1.5" style={{ borderRadius: 0 }}>
                    <div className="h-10 border border-dashed border-white/30 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                      SEAT 03
                    </div>
                    <div className="font-bold text-xs" style={{ fontFamily: 'var(--font-industry-heading)' }}>Mr. Thorne</div>
                    <div className="text-[10px] text-slate-400">Governance</div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="border border-white/25 p-3.5 text-xs leading-relaxed text-slate-200" style={{ fontFamily: 'var(--font-industry-body)' }}>
                    “You are the IMT1 on duty. A 68-year-old with cirrhosis has active haematemesis while ED bleeps regarding an acute asthmatic. How do you assess, manage, and prioritise?”
                  </div>
                  <div className="flex justify-between items-center mt-2.5 text-[10px] uppercase font-bold tracking-wider text-slate-400" style={{ fontFamily: 'var(--font-industry-heading)' }}>
                    <span>Domain: Clinical Prioritisation</span>
                    <span>Answer time: 03:00</span>
                  </div>
                </div>
              </figure>
            </div>
          </div>

          {/* Primary Flow Stepper Bar (From Handoff Spec Board) */}
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1d1f20]/15">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#416180] mb-3" style={{ fontFamily: 'var(--font-industry-heading)' }}>
              Primary Candidate Flow
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {industryFlowSteps.map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className="relative border border-[#1d1f20]/20 bg-white px-3 py-2 text-xs min-w-[100px]" style={{ borderRadius: 0 }}>
                    <i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i>
                    <i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i>
                    <div className="text-[10px] font-mono text-[#5980a6]">{s.n}</div>
                    <div className="font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-industry-heading)' }}>{s.label}</div>
                  </div>
                  {i < industryFlowSteps.length - 1 && (
                    <span className="w-3 h-px bg-slate-400 mx-1"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* DESIGN A: HEALTHCARE CLASSIC HERO */
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-850 text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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

                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs text-slate-400 flex items-start gap-2.5 text-left">
                  <Shield className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Independent preparation service:</strong> Designed for UK doctors applying to ST1, CT1 and ST3 training. Not affiliated with NHS England or the Royal Colleges.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
                  <button
                    onClick={() => setCurrentScreen('setup')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2 transition"
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
              </div>

              {/* Right Demo Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-slate-800/90 border border-slate-700 shadow-2xl p-5 overflow-hidden backdrop-blur-md">
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

                  <div className="bg-slate-900/90 rounded-xl p-4 border border-teal-500/40 relative mb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-sm">
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

                    <div className="mt-3 flex items-center gap-1 h-6">
                      {[35, 60, 85, 45, 95, 70, 40, 65, 80, 50, 90, 75, 40, 55, 70, 85, 60, 40, 65, 90, 45, 80, 55].map((h, i) => (
                        <span key={i} className="flex-1 bg-teal-400 rounded-full" style={{ height: `${h}%` }} />
                      ))}
                    </div>

                    <p className="mt-2 text-xs text-slate-300 italic bg-slate-950/60 p-2.5 rounded border border-slate-800/60">
                      “You have an unstable haematemesis on AMU and a silent chest in ED. How do you assess, manage, and prioritise this situation?”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 3-STEP PROCESS SECTION ─── */}
      <section className={`py-16 ${isIndustry ? 'bg-[#f2f2f3] border-b border-[#1d1f20]/15' : 'bg-white border-b border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 border ${
              isIndustry 
                ? 'border-[#5980a6] text-[#416180] bg-transparent' 
                : 'rounded-full text-teal-700 bg-teal-50 border-teal-200'
            }`}>
              The 3-Step Simulation Cycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
              How Panelwise Speciality prepares you for panel day
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              From your clinical portfolio to rigorous voice simulation and objective rubric-anchored feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className={`p-6 transition ${
              isIndustry 
                ? 'relative blueprint-obj bg-white' 
                : 'bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md'
            }`}>
              {isIndustry && <><i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i><i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i></>}
              <div className={`w-12 h-12 flex items-center justify-center font-bold text-xl mb-4 ${
                isIndustry 
                  ? 'border border-[#5980a6] text-[#5980a6] font-mono' 
                  : 'rounded-xl bg-teal-700 text-white shadow-xs'
              }`}>
                01
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
                Upload & Verify CV Facts
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Our secure parser extracts your audits, teaching, clinical posts, and publications. You review and verify every fact before it can influence your interview questions.
              </p>
              <div className={`text-xs p-2.5 flex items-center gap-1.5 ${
                isIndustry 
                  ? 'border border-[#5980a6]/30 text-[#416180]' 
                  : 'rounded-lg bg-teal-50 text-teal-800 border border-teal-100'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Zero guesswork; candidate maintains full control</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-6 transition ${
              isIndustry 
                ? 'relative blueprint-obj bg-white' 
                : 'bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md'
            }`}>
              {isIndustry && <><i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i><i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i></>}
              <div className={`w-12 h-12 flex items-center justify-center font-bold text-xl mb-4 ${
                isIndustry 
                  ? 'border border-[#5980a6] text-[#5980a6] font-mono' 
                  : 'rounded-xl bg-slate-900 text-white shadow-xs'
              }`}>
                02
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
                Voice-Based Timed Mock
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Enter the virtual panel. Different AI panel members question you according to assigned roles (Chair, Clinical Lead, Lay Assessor). Strict timers and silence handling.
              </p>
              <div className={`text-xs p-2.5 flex items-center gap-1.5 ${
                isIndustry 
                  ? 'border border-slate-300 text-slate-700' 
                  : 'rounded-lg bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                <span>No live coaching during scored simulation</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`p-6 transition ${
              isIndustry 
                ? 'relative blueprint-obj bg-white' 
                : 'bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md'
            }`}>
              {isIndustry && <><i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i><i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i></>}
              <div className={`w-12 h-12 flex items-center justify-center font-bold text-xl mb-4 ${
                isIndustry 
                  ? 'border border-[#5980a6] text-[#5980a6] font-mono' 
                  : 'rounded-xl bg-emerald-700 text-white shadow-xs'
              }`}>
                03
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
                Detailed Rubric Feedback
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Receive domain scores citing exact transcript evidence. See what was done well, missing clinical points, and illustrative structure models for every station.
              </p>
              <div className={`text-xs p-2.5 flex items-center gap-1.5 ${
                isIndustry 
                  ? 'border border-[#5980a6]/30 text-[#416180]' 
                  : 'rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100'
              }`}>
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Scored against administrator rubrics, not generic advice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS INCLUDED (FEATURE CARDS) ─── */}
      <section className={`py-16 ${isIndustry ? 'bg-[#e9e9ea]/60 border-b border-[#1d1f20]/15' : 'bg-slate-50 border-b border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
              What is included
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Unlike generic AI chat tools, Panelwise Speciality adheres to the rigorous structure of UK specialty recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industryFeatures.map((feat, i) => (
              <div 
                key={i} 
                className={`p-5 transition ${
                  isIndustry 
                    ? 'relative blueprint-obj bg-white' 
                    : 'bg-white rounded-xl border border-slate-200 shadow-xs'
                }`}
              >
                {isIndustry && <><i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i><i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i></>}
                
                <div className={`text-[10px] uppercase font-bold tracking-wider mb-2 ${
                  isIndustry ? 'text-[#416180] font-mono' : 'text-teal-700'
                }`}>
                  {feat.kicker}
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
                  {feat.title}
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {feat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING TEASER ─── */}
      <section className={`py-16 ${isIndustry ? 'bg-[#f2f2f3] border-b border-[#1d1f20]/15' : 'bg-white border-b border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
              Simple pricing for your recruitment round
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Fixed access plans. No hidden subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {COMMERCIAL_PRICING.map(plan => (
              <div 
                key={plan.id}
                className={`p-6 flex flex-col justify-between ${
                  isIndustry 
                    ? 'relative blueprint-obj bg-white' 
                    : `rounded-2xl border bg-white ${plan.popular ? 'border-teal-600 ring-2 ring-teal-600/20' : 'border-slate-200'}`
                }`}
              >
                {isIndustry && <><i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i><i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i></>}
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-slate-900" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${
                        isIndustry ? 'border border-[#5980a6] text-[#416180]' : 'bg-teal-700 text-white rounded-full'
                      }`}>
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.priceGbp}</span>
                    <span className="text-xs text-slate-500 font-medium">/{plan.period.split(' ')[0]}</span>
                  </div>

                  <div className="space-y-2 mb-6 text-xs text-slate-600">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5980a6]" />
                        <span>{f.text.split('(')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('checkout')}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider transition ${
                    isIndustry 
                      ? 'bg-[#5980a6] hover:bg-[#416180] text-white' 
                      : 'bg-teal-700 hover:bg-teal-800 text-white rounded-xl'
                  }`}
                  style={isIndustry ? { borderRadius: 0, fontFamily: 'var(--font-industry-heading)' } : {}}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={`py-14 ${isIndustry ? 'bg-[#e9e9ea]/40' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
            Frequently asked questions
          </h2>
          <div className="space-y-2">
            {FAQS.slice(0, 4).map((faq, i) => (
              <div 
                key={i} 
                className={`p-4 bg-white border ${
                  isIndustry ? 'border-[#1d1f20]/15' : 'border-slate-200 rounded-xl'
                }`}
                style={isIndustry ? { borderRadius: 0 } : {}}
              >
                <div className="font-bold text-xs sm:text-sm text-slate-900 mb-1" style={isIndustry ? { fontFamily: 'var(--font-industry-heading)' } : {}}>
                  {faq.q}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
