import React from 'react';
import { 
  Palette, 
  Layers, 
  Type, 
  CheckCircle2, 
  ArrowRight, 
  Laptop, 
  Sparkles, 
  Sliders, 
  Square,
  CircleDot,
  FileCode,
  ExternalLink
} from 'lucide-react';
import AudioWave from '../components/AudioWave';

export default function DesignComparisonView({ designMode, setDesignMode, setCurrentScreen }) {
  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-slate-300 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-0.5 rounded">
                Design System Audit
              </span>
              <span className="text-xs text-slate-500 font-mono">Handoff Comparison</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
              Design Adaptation Comparison
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Comparing <strong>Design A (Modern Healthcare Classic)</strong> with <strong>Design B (Industry Technical Blueprint)</strong> derived from <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">/home/anm/claude_home/panelwise/docs/handoff/design</code>.
            </p>
          </div>

          {/* Quick Switcher Buttons */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-300 shadow-sm shrink-0">
            <button
              onClick={() => setDesignMode('healthcare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                designMode === 'healthcare'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Design A: Healthcare Classic
            </button>
            <button
              onClick={() => setDesignMode('industry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                designMode === 'industry'
                  ? 'bg-slate-800 text-teal-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Design B: Industry Blueprint
            </button>
          </div>
        </div>

        {/* High-Level Comparison Matrix */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="p-5 bg-slate-50 border-b border-slate-200">
            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Core Design Dimension Differences
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase">
                <tr>
                  <th className="p-4 w-1/5">Dimension</th>
                  <th className="p-4 w-2/5 bg-teal-50/40 border-r border-slate-200 text-teal-900">
                    Design A: Modern Healthcare Classic
                  </th>
                  <th className="p-4 w-2/5 bg-slate-100/80 text-slate-900">
                    Design B: Industry Technical Blueprint (Handoff)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-4 font-bold text-slate-800">Visual Metaphor</td>
                  <td className="p-4 bg-teal-50/20 border-r border-slate-200 text-slate-700 leading-relaxed">
                    Contemporary UK healthcare-adjacent web application. Reassuring, accessible, calm medical clinical aesthetic.
                  </td>
                  <td className="p-4 text-slate-700 leading-relaxed">
                    Technical spec-sheet / architectural blueprint. Line drawings on light technical ground (`#f2f2f3`) with registration crosshairs.
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-800">Typography Scale</td>
                  <td className="p-4 bg-teal-50/20 border-r border-slate-200 text-slate-700 leading-relaxed">
                    <strong>Inter</strong> for both headings and body text; <strong>JetBrains Mono</strong> for timers and reference codes. Generous letter spacing and rounded geometry.
                  </td>
                  <td className="p-4 text-slate-700 leading-relaxed font-serif">
                    <strong>Barlow Condensed</strong> (headings: 500/600/700) over <strong>Barlow</strong> (body: 400/500). High information density (0.85× scale).
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-800">Card & Frame Geometry</td>
                  <td className="p-4 bg-teal-50/20 border-r border-slate-200 text-slate-700 leading-relaxed">
                    Soft rounded corners (16px to 24px), subtle drop-shadows (`box-shadow`), white surface tiles with clean borders.
                  </td>
                  <td className="p-4 text-slate-700 leading-relaxed">
                    Strictly square-cornered (0px radius), hairline-bordered (1px divider), featuring <strong>+ corner registration marks</strong> (<code>.blueprint &gt; .corner</code>).
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-800">Color System</td>
                  <td className="p-4 bg-teal-50/20 border-r border-slate-200 text-slate-700 leading-relaxed">
                    Deep Slate Navy (`#0F172A`, `#1E293B`) + Restrained Teal (`#0F766E`, `#14B8A6`) + Emerald (`#059669`) / Amber (`#D97706`).
                  </td>
                  <td className="p-4 text-slate-700 leading-relaxed">
                    Light Technical Ground (`#F2F2F3`) + Steel-Blue Mono Accent (`#5980A6`) + Deep Steel Plate (`#1D2D3D`). OKLCH perceptual lightness ramp.
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-800">Simulation Screen Mood</td>
                  <td className="p-4 bg-teal-50/20 border-r border-slate-200 text-slate-700 leading-relaxed">
                    Immersive dark examination room (`#080D18`), live glowing participant cards, teal audio visualizers, floating control pill.
                  </td>
                  <td className="p-4 text-slate-700 leading-relaxed">
                    Steel-blue blueprint plate (`#1D2D3D`), wireframe seats with dashed avatar frames, technical VU bar blips, structured question frame.
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-800">Button Treatments</td>
                  <td className="p-4 bg-teal-50/20 border-r border-slate-200 text-slate-700 leading-relaxed">
                    Pill & rounded-xl buttons with subtle gradient sheen and soft shadows.
                  </td>
                  <td className="p-4 text-slate-700 leading-relaxed">
                    The primary button is the <em>one solid object</em> with square corners and registration crosshair marks; ghost/secondary buttons are hairline wireframes.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Interactive Specimen Cards Side-by-Side */}
        <div className="space-y-4">
          <h2 className="font-bold text-base text-slate-900 uppercase tracking-wider">
            Live Component Specimen Comparison
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Specimen A: Modern Healthcare */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Design A: Healthcare Classic
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                  Inter · Rounded 20px
                </span>
              </div>

              {/* Panel Member Card */}
              <div className="bg-slate-850 p-4 rounded-2xl border border-teal-500/40 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-xs">
                      AV
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span>Dr. Alistair Vance</span>
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                      </div>
                      <span className="text-xs text-teal-400">Chair · Acute Medical Consultant</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-teal-950 text-teal-300 px-2 py-0.5 rounded-full border border-teal-800">
                    Speaking
                  </span>
                </div>
                <AudioWave isActive={true} color="teal" height={24} barCount={20} />
              </div>

              {/* Question Card */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-300 font-serif">
                “You are the IMT1 on duty. A 68-year-old with cirrhosis has active haematemesis while ED bleeps regarding an acute asthmatic. How do you assess, manage, and prioritise?”
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-xl text-xs font-semibold text-white shadow-md">
                  Start Practising
                </button>
                <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-medium text-slate-300 border border-slate-700">
                  See How It Works
                </button>
              </div>
            </div>

            {/* Specimen B: Industry Blueprint (Handoff Design) */}
            <div className="blueprint-obj p-6 text-slate-900 space-y-5" style={{ background: '#f2f2f3', borderColor: 'color-mix(in srgb, #1d1f20 20%, transparent)' }}>
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'color-mix(in srgb, #1d1f20 16%, transparent)' }}>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-industry-heading)', color: '#416180' }}>
                  Design B: Industry Technical Blueprint
                </span>
                <span className="text-[10px] border px-2 py-0.5 text-slate-700" style={{ borderColor: '#5980a6' }}>
                  Barlow Condensed · Blueprint Wireframe
                </span>
              </div>

              {/* Blueprint Panel Member Card */}
              <div className="relative blueprint-obj p-4 text-white" style={{ background: '#1d2d3d', borderRadius: 0 }}>
                <i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i>
                <i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border border-slate-400 flex items-center justify-center text-xs font-bold font-mono">
                      01
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white" style={{ fontFamily: 'var(--font-industry-heading)' }}>
                        Panel member 1 (Dr. Vance)
                      </div>
                      <span className="text-[11px]" style={{ color: '#94bce3' }}>Chair — Acute Medicine</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5" style={{ background: 'rgba(224,163,112,.2)', color: '#e0a370', border: '1px solid #e0a370' }}>
                    Speaking now
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700 flex items-end gap-1 h-5">
                  {[40, 70, 95, 60, 85, 45, 100, 75, 50, 80, 65, 90, 40, 60, 85, 55, 75, 90].map((h, i) => (
                    <span key={i} className="flex-1" style={{ height: `${h}%`, background: '#e0a370' }} />
                  ))}
                </div>
              </div>

              {/* Blueprint Question Box */}
              <div className="relative blueprint-obj p-4 text-xs leading-relaxed" style={{ background: 'transparent', borderColor: 'color-mix(in srgb, #1d1f20 25%, transparent)', fontFamily: 'var(--font-industry-body)' }}>
                <i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i>
                <i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i>
                “Tell us about a time you identified a risk to patient safety and what you did about it.”
                <div className="flex justify-between mt-2 pt-2 border-t text-[10px] uppercase tracking-wider text-slate-500" style={{ fontFamily: 'var(--font-industry-heading)' }}>
                  <span>Domain: Clinical Governance</span>
                  <span>Answer time: 03:00</span>
                </div>
              </div>

              {/* Blueprint Buttons */}
              <div className="flex gap-3 pt-1">
                <button className="relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-none" style={{ background: '#5980a6', borderRadius: 0, fontFamily: 'var(--font-industry-heading)' }}>
                  <i className="blueprint-corner tl"></i><i className="blueprint-corner tr"></i>
                  <i className="blueprint-corner bl"></i><i className="blueprint-corner br"></i>
                  Start practising
                </button>
                <button className="px-4 py-2.5 text-xs font-bold text-slate-800 border" style={{ borderColor: 'color-mix(in srgb, #1d1f20 25%, transparent)', borderRadius: 0, fontFamily: 'var(--font-industry-heading)' }}>
                  See how it works
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Handoff Documentation Source Card */}
        <div className="p-5 bg-white rounded-2xl border border-slate-300 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <FileCode className="w-4 h-4 text-teal-700" />
            <span>Handoff Design Files Integrated</span>
          </div>
          <p className="leading-relaxed">
            The Industry design system was inspected from <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">/home/anm/claude_home/panelwise/docs/handoff/design/</code> including <code className="bg-slate-100 px-1 py-0.2 rounded">Interview Platform Spec Board.dc.html</code>, <code className="bg-slate-100 px-1 py-0.2 rounded">Panelwise Architecture.dc.html</code>, and <code className="bg-slate-100 px-1 py-0.2 rounded">_ds/industry-.../styles.css</code>.
          </p>
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                setDesignMode('industry');
                setCurrentScreen('landing');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition"
            >
              Apply Industry Blueprint to Whole App
            </button>
            <button
              onClick={() => {
                setDesignMode('healthcare');
                setCurrentScreen('landing');
              }}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs transition"
            >
              Apply Healthcare Classic to Whole App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
