import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Volume2, 
  Eye, 
  Type, 
  HelpCircle, 
  ChevronDown, 
  Menu, 
  X, 
  User, 
  Sparkles,
  Sliders,
  ExternalLink,
  Laptop,
  Smartphone
} from 'lucide-react';

export const ALL_SCREENS = [
  { id: 'landing', label: '1. Landing Page (Desktop)', category: 'Public' },
  { id: 'landing-mobile', label: '1b. Landing Page (Mobile Mode)', category: 'Public' },
  { id: 'pricing', label: '2. Pricing Plans (£25 / £40)', category: 'Public' },
  { id: 'checkout', label: '3. Account & Checkout', category: 'Onboarding' },
  { id: 'setup', label: '4. Specialty & Interview Setup', category: 'Onboarding' },
  { id: 'cv-upload', label: '5. CV Upload & Privacy Notice', category: 'CV Flow' },
  { id: 'cv-review', label: '6. CV Fact Verification (10 Cats)', category: 'CV Flow' },
  { id: 'device-check', label: '7. Device & Audio Check', category: 'Pre-Interview' },
  { id: 'waiting-room', label: '8. Virtual Waiting Room', category: 'Pre-Interview' },
  { id: 'live-interview', label: '9. Live Voice Panel Interview', category: 'Simulation' },
  { id: 'results', label: '10. Results Overview Dashboard', category: 'Feedback' },
  { id: 'question-review', label: '11. Detailed Question Review', category: 'Feedback' },
  { id: 'user-dashboard', label: '12. Candidate Dashboard', category: 'User Area' },
  { id: 'admin', label: '13. Admin CMS & Rubric Bank', category: 'Admin' },
  { id: 'design-system', label: '14. Design System & Microcopy', category: 'Reference' }
];

export default function Header({ 
  currentScreen, 
  setCurrentScreen,
  accessibilitySettings,
  setAccessibilitySettings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [screenDropdownOpen, setScreenDropdownOpen] = useState(false);

  const toggleHighContrast = () => {
    setAccessibilitySettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const cycleTextSize = () => {
    const sizes = ['normal', 'large', 'xl'];
    const nextIdx = (sizes.indexOf(accessibilitySettings.textSize) + 1) % sizes.length;
    setAccessibilitySettings(prev => ({ ...prev, textSize: sizes[nextIdx] }));
  };

  const toggleReducedMotion = () => {
    setAccessibilitySettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleCaptions = () => {
    setAccessibilitySettings(prev => ({ ...prev, captions: !prev.captions }));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Compliance & Disclaimer Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-teal-300 border border-slate-700">
            INDEPENDENT PREPARATION SERVICE
          </span>
          <span className="hidden sm:inline text-slate-400">
            Not affiliated with, endorsed by, or operated by NHS England, Health Education England, GMC, or any Royal Medical College.
          </span>
        </div>
        
        {/* Prototype Navigation Fast Jump */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <button 
              onClick={() => setScreenDropdownOpen(!screenDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-medium bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700 transition"
              aria-label="Switch prototype screen"
            >
              <span>Jump to Screen: <strong className="text-white">{ALL_SCREENS.find(s => s.id === currentScreen)?.label.split('.')[1] || currentScreen}</strong></span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {screenDropdownOpen && (
              <div 
                className="absolute right-0 mt-1 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-1 text-slate-800 text-xs z-50 max-h-96 overflow-y-auto"
                onClick={() => setScreenDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 font-bold text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Prototype Screen Switcher (14 Views)
                </div>
                {ALL_SCREENS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition ${
                      currentScreen === item.id ? 'bg-teal-50 text-teal-800 font-semibold border-l-4 border-teal-600' : 'text-slate-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{item.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility Drawer Toggle */}
          <button
            onClick={() => setA11yOpen(!a11yOpen)}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition"
            title="Accessibility Controls"
            aria-label="Accessibility options"
          >
            <Sliders className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Accessibility</span>
          </button>
        </div>
      </div>

      {/* Accessibility Popover Panel */}
      {a11yOpen && (
        <div className="bg-slate-800 text-white border-b border-slate-700 px-4 py-3 text-xs animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-slate-200">Reasonable Adjustments & Accessibility (WCAG 2.2 AA)</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={cycleTextSize}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-200"
              >
                <Type className="w-3.5 h-3.5" />
                <span>Text Size: <strong className="text-teal-300 uppercase">{accessibilitySettings.textSize}</strong></span>
              </button>

              <button
                onClick={toggleHighContrast}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition ${
                  accessibilitySettings.highContrast 
                    ? 'bg-amber-400 text-slate-900 border-amber-300 font-semibold' 
                    : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200'
                }`}
              >
                <span>High Contrast: {accessibilitySettings.highContrast ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={toggleReducedMotion}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition ${
                  accessibilitySettings.reducedMotion 
                    ? 'bg-teal-500 text-white border-teal-400 font-semibold' 
                    : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200'
                }`}
              >
                <span>Reduce Motion: {accessibilitySettings.reducedMotion ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={toggleCaptions}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition ${
                  accessibilitySettings.captions 
                    ? 'bg-teal-500 text-white border-teal-400 font-semibold' 
                    : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Spoken Captions: {accessibilitySettings.captions ? 'ALWAYS VISIBLE' : 'OPTIONAL'}</span>
              </button>

              <button
                onClick={() => setA11yOpen(false)}
                className="text-slate-400 hover:text-white ml-2 p-1"
                aria-label="Close accessibility controls"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentScreen('landing')}
              className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 to-slate-900 flex items-center justify-center text-white shadow-sm border border-teal-600/30 group-hover:scale-105 transition-transform">
                {/* Clean medical cross / soundwave icon */}
                <svg className="w-6 h-6 text-teal-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M7 8v8M17 8v8" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-teal-800 transition">
                    Panelwise <span className="text-teal-600 font-semibold">Speciality</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    UK Medical Roles
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Realistic AI Voice Panel Interviews for Specialty Training
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-600">
            <button 
              onClick={() => setCurrentScreen('landing')}
              className={`px-3 py-2 rounded-md transition ${currentScreen === 'landing' ? 'text-teal-700 bg-teal-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
            >
              How It Works
            </button>
            <button 
              onClick={() => setCurrentScreen('pricing')}
              className={`px-3 py-2 rounded-md transition ${currentScreen === 'pricing' ? 'text-teal-700 bg-teal-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
            >
              Pricing (£25 / £40)
            </button>
            <button 
              onClick={() => setCurrentScreen('setup')}
              className={`px-3 py-2 rounded-md transition ${currentScreen === 'setup' ? 'text-teal-700 bg-teal-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
            >
              Specialties
            </button>
            <button 
              onClick={() => setCurrentScreen('cv-review')}
              className={`px-3 py-2 rounded-md transition ${currentScreen === 'cv-review' ? 'text-teal-700 bg-teal-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
            >
              CV Fact Review
            </button>
            <button 
              onClick={() => setCurrentScreen('results')}
              className={`px-3 py-2 rounded-md transition ${currentScreen === 'results' ? 'text-teal-700 bg-teal-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
            >
              Sample Feedback
            </button>
            <button 
              onClick={() => setCurrentScreen('admin')}
              className={`px-3 py-2 rounded-md transition text-slate-500 hover:text-slate-900 ${currentScreen === 'admin' ? 'text-teal-700 bg-teal-50/70 font-semibold' : ''}`}
            >
              Admin CMS
            </button>
          </nav>

          {/* Action CTAs & Profile */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('user-dashboard')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
              title="View Candidate Dashboard"
            >
              <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">
                AM
              </div>
              <span className="hidden xl:inline">Dr. Moore (IMT)</span>
            </button>

            <button
              onClick={() => setCurrentScreen('setup')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition transform-gpu active:scale-95 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <span>Start Simulation</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 text-sm font-medium">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Navigate Journey
          </div>
          <button
            onClick={() => { setCurrentScreen('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Landing Page
          </button>
          <button
            onClick={() => { setCurrentScreen('pricing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Pricing (£25 / £40)
          </button>
          <button
            onClick={() => { setCurrentScreen('setup'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Specialty & Interview Setup
          </button>
          <button
            onClick={() => { setCurrentScreen('cv-upload'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Upload CV
          </button>
          <button
            onClick={() => { setCurrentScreen('cv-review'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            CV Fact Verification
          </button>
          <button
            onClick={() => { setCurrentScreen('device-check'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Device & Audio Check
          </button>
          <button
            onClick={() => { setCurrentScreen('live-interview'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md font-semibold text-teal-700 bg-teal-50"
          >
            Live Voice Panel Interview
          </button>
          <button
            onClick={() => { setCurrentScreen('results'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Scoring & Rubric Feedback
          </button>
          <button
            onClick={() => { setCurrentScreen('user-dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Candidate Dashboard
          </button>
          <button
            onClick={() => { setCurrentScreen('admin'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Admin CMS & Question Bank
          </button>
          <button
            onClick={() => { setCurrentScreen('design-system'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Design System & Microcopy
          </button>
        </div>
      )}
    </header>
  );
}
