import React, { useState } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  Users, 
  Sliders, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  HelpCircle
} from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';

export default function SpecialtySetupView({ setCurrentScreen, setupData, setSetupData }) {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(setupData?.specialtyId || 'imt');
  const [recruitmentStage, setRecruitmentStage] = useState(setupData?.pathway || 'ST1 / CT1 Round 1 (National)');
  const [interviewDate, setInterviewDate] = useState(setupData?.interviewDate || '2026-11-15');
  const [experienceLevel, setExperienceLevel] = useState(setupData?.experienceLevel || 'Foundation Doctor FY2');
  const [interviewType, setInterviewType] = useState(setupData?.interviewType || 'full-circuit');
  const [simulationLength, setSimulationLength] = useState(setupData?.length || 'standard');
  const [panelConfig, setPanelConfig] = useState(setupData?.panelConfig || 'three-member');
  const [extraThinkingTime, setExtraThinkingTime] = useState(false);

  const selectedSpecialty = SPECIALTIES.find(s => s.id === selectedSpecialtyId) || SPECIALTIES[0];

  const handleContinue = (e) => {
    e.preventDefault();
    if (setSetupData) {
      setSetupData({
        specialtyId: selectedSpecialtyId,
        specialtyName: selectedSpecialty.name,
        pathway: recruitmentStage,
        interviewDate,
        experienceLevel,
        interviewType,
        length: simulationLength,
        panelConfig,
        extraThinkingTime
      });
    }
    setCurrentScreen('cv-upload');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Simulation Setup</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Specialty & Interview Pathway</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your specialty and configure your panel parameters. All options are controlled by platform administrator rules.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 font-medium">Step 1 of 4</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
              <div className="w-1/4 h-full bg-teal-600 rounded-full" />
            </div>
          </div>
        </div>

        <form onSubmit={handleContinue} className="space-y-6">
          {/* Target Specialty Selection */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Target Specialty Pathway
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SPECIALTIES.map(s => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSelectedSpecialtyId(s.id)}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    selectedSpecialtyId === s.id
                      ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                      {s.code}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-2">{s.name}</h4>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2">Level: {s.level}</span>
                </button>
              ))}
            </div>

            {/* Specialty Details Pill */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row justify-between gap-2">
              <div>
                <strong className="text-slate-800">Recruitment body standard:</strong> {selectedSpecialty.recruitmentLead}
              </div>
              <div className="text-teal-700 font-medium">
                {selectedSpecialty.stations.length} Active Stations Configured
              </div>
            </div>
          </div>

          {/* Recruitment Stage & Candidate Background */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Recruitment Details & Candidate Background
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Recruitment Round / Stage
                </label>
                <select
                  value={recruitmentStage}
                  onChange={(e) => setRecruitmentStage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="ST1 / CT1 Round 1 (National)">ST1 / CT1 Round 1 (National)</option>
                  <option value="ST1 / CT1 Round 2 (Re-advert)">ST1 / CT1 Round 2 (Re-advert)</option>
                  <option value="ST3 / ST4 Higher Specialty Entry">ST3 / ST4 Higher Specialty Entry</option>
                  <option value="Locum Appointment for Training (LAT) / Trust Grade">LAT / Locally Employed Doctor (LED)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Current Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="Foundation Doctor FY2">Foundation Doctor FY2</option>
                  <option value="Core Trainee CT1/CT2">Core Trainee CT1/CT2</option>
                  <option value="Junior Clinical Fellow / Trust SHO">Junior Clinical Fellow / Trust SHO</option>
                  <option value="Senior Clinical Fellow / Registrar">Senior Clinical Fellow / Registrar</option>
                  <option value="International Medical Graduate (CREST verified)">International Medical Graduate (IMG)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Target Interview Date (Optional)
                </label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                />
              </div>
            </div>
          </div>

          {/* Simulation Structure & Panel Configuration */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. Panel Configuration & Interview Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Interview Mode
                </label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="full-circuit">Full Simulation Circuit (All Stations Timed)</option>
                  <option value="clinical-drill">Clinical Scenario Drill (Focused on Prioritisation)</option>
                  <option value="governance-drill">Governance & Ethics Drill (GMC Guidelines)</option>
                  <option value="portfolio-drill">Portfolio & QIP Presentation Drill</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Panel Configuration
                </label>
                <select
                  value={panelConfig}
                  onChange={(e) => setPanelConfig(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="three-member">Standard 3-Member Panel (Chair, Consultant, Lay Assessor)</option>
                  <option value="two-member">2-Member Specialty Panel (Dual Consultant Assessors)</option>
                  <option value="single-examiner">Single Examiner Station (Rapid Probing)</option>
                </select>
              </div>
            </div>

            {/* Reasonable Adjustments */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extraThinkingTime}
                  onChange={(e) => setExtraThinkingTime(e.target.checked)}
                  className="text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                />
                <span className="text-slate-700 font-medium">
                  Request Reasonable Adjustment: +25% Reading/Thinking Time (does not alter scoring rubric criteria)
                </span>
              </label>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              Cancel & Back to Home
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Save & Continue to CV Upload</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
