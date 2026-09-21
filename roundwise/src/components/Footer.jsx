import React from 'react';
import { Shield, FileText, CheckCircle2, Lock, AlertCircle, HeartHandshake } from 'lucide-react';

export default function Footer({ setCurrentScreen }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      {/* Top Banner: Independent Legal Disclosure */}
      <div className="border-b border-slate-800/80 bg-slate-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Independent Service Disclaimer & Non-Affiliation Notice
                </h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-4xl">
                  Roundwise is an independent simulation technology and preparation platform operated by Roundwise Technologies Ltd. 
                  This service is <strong>NOT affiliated with, endorsed by, approved by, or operated by the National Health Service (NHS)</strong>, 
                  NHS England, NHS Education England (Workforce, Training and Education), the General Medical Council (GMC), any Royal Medical College 
                  (including RCP, RCS, RCGP, RCoA, RCR, RCPath, RCPCH), or any official national specialty recruitment office (including Oriel, PSRO, ANRO, or GPNRO).
                  Use of this platform does not guarantee selection, interview invitation, or appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-700 flex items-center justify-center text-white font-bold text-sm">
                RW
              </div>
              <span className="text-white font-bold text-base tracking-tight">Roundwise</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Realistic, timed UK medical specialty interview simulations tailored to your verified CV facts and scored against administrator-controlled rubrics.
            </p>
            <div className="flex items-center gap-4 text-slate-400 text-xs pt-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                UK GDPR & Article 9 Compliant
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                WCAG 2.2 AA Accessible
              </span>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Specialty Pathways
            </h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentScreen('setup')} className="hover:text-teal-300 transition">Internal Medicine Training (IMT)</button></li>
              <li><button onClick={() => setCurrentScreen('setup')} className="hover:text-teal-300 transition">Core Surgical Training (CST)</button></li>
              <li><button onClick={() => setCurrentScreen('setup')} className="hover:text-teal-300 transition">General Practice (GPST)</button></li>
              <li><button onClick={() => setCurrentScreen('setup')} className="hover:text-teal-300 transition">ACCS Anaesthetics / Core</button></li>
              <li><button onClick={() => setCurrentScreen('setup')} className="hover:text-teal-300 transition">Paediatrics & Radiology</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Platform & Features
            </h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentScreen('pricing')} className="hover:text-teal-300 transition">Pricing (£25 / £40)</button></li>
              <li><button onClick={() => setCurrentScreen('cv-review')} className="hover:text-teal-300 transition">CV Fact Extraction</button></li>
              <li><button onClick={() => setCurrentScreen('device-check')} className="hover:text-teal-300 transition">Audio & Device Check</button></li>
              <li><button onClick={() => setCurrentScreen('results')} className="hover:text-teal-300 transition">Structured Rubric Scoring</button></li>
              <li><button onClick={() => setCurrentScreen('admin')} className="hover:text-teal-300 transition">Admin CMS Question Bank</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Data, Privacy & Governance
            </h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentScreen('user-dashboard')} className="hover:text-teal-300 transition">Privacy & Data Minimisation</button></li>
              <li><button onClick={() => setCurrentScreen('user-dashboard')} className="hover:text-teal-300 transition">No Patient Identifiable Data Policy</button></li>
              <li><button onClick={() => setCurrentScreen('user-dashboard')} className="hover:text-teal-300 transition">Audio Retention Controls</button></li>
              <li><button onClick={() => setCurrentScreen('design-system')} className="hover:text-teal-300 transition">Design System & Microcopy</button></li>
              <li><a href="#contact" className="hover:text-teal-300 transition">Contact Governance Team</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Roundwise Technologies Ltd. All rights reserved. Registered in England & Wales.
          </div>
          <div className="flex gap-4">
            <span className="text-slate-400">Strictly no endorsement implied.</span>
            <span>Terms of Service</span>
            <span>Privacy Notice</span>
            <span>Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
