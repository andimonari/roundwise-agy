import React, { useState } from 'react';
import { 
  Award, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Download, 
  Share2, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { MOCK_SCORING_SUMMARY, MOCK_INTERVIEW_QUESTIONS } from '../data/mockData';

export default function ResultsOverviewView({ setCurrentScreen, candidateSessionResponses = {} }) {
  const summary = MOCK_SCORING_SUMMARY;
  const [downloadNotice, setDownloadNotice] = useState(false);
  const completedStationsCount = Object.keys(candidateSessionResponses).length;

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Legal non-affiliation & AI limitation alert */}
        <div className="p-4 bg-slate-900 text-slate-300 rounded-2xl flex items-start gap-3 border border-slate-800 text-xs">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-white font-bold">Independent Formative Practice Assessment</h4>
            <p className="text-slate-400 leading-relaxed">
              This report represents an automated educational evaluation anchored to published Royal College rubrics. 
              <strong>It is not an official NHS recruitment outcome</strong> and does not guarantee appointment or ranking in any national selection process.
            </p>
          </div>
        </div>

        {/* Candidate & Session Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded border border-teal-200">
                {summary.pathway}
              </span>
              <span className="text-xs text-slate-500 font-medium">Completed: {summary.dateCompleted}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {summary.candidateName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Specialty: <strong>{summary.specialtyName}</strong> · Candidate GMC Ref: {summary.gmcRef}
            </p>
          </div>

          {/* Overall Score Badge */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center sm:text-right shrink-0">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Configured Aggregate Score
            </span>
            <div className="flex items-baseline justify-center sm:justify-end gap-1 my-0.5">
              <span className="text-4xl font-black text-teal-700">{summary.totalScore}</span>
              <span className="text-sm font-semibold text-slate-400">/ {summary.maxTotalScore}</span>
            </div>
            <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              {summary.rubricTier}
            </span>
          </div>
        </div>

        {/* Reliability Note & Rubric Context Banner */}
        <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Rubric-Anchored Assessment:</strong> {summary.confidenceRating}. 
            All domain scores are calculated strictly against administrator-configured behavioral criteria, not compared with unverified candidate cohorts.
          </p>
        </div>

        {/* Domain-Level Scores Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Assessed Competency Domains & Weightings
            </h2>
            <span className="text-xs text-slate-500">Based on GMC & College Frameworks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {summary.domains.map((dom, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-slate-400">Weight: {dom.weight}%</span>
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      {dom.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-2">{dom.name}</h3>

                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl font-extrabold text-slate-900">{dom.score}</span>
                    <span className="text-xs text-slate-400 font-semibold">/ {dom.maxScore}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="text-slate-700">
                      <strong className="text-emerald-700 block mb-0.5">Strengths Identified:</strong>
                      <span className="text-slate-600 leading-snug">{dom.strengths}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <strong className="text-amber-800 block text-[11px] mb-0.5">Priority Growth Point:</strong>
                  <span className="text-[11px] text-slate-600 leading-snug">{dom.improvements}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speech Delivery & Cadence Analysis (Confetto Feature Adapted for UK Doctors) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Verbal Delivery & Clinical Cadence Metrics</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Speaking Pace</span>
              <span className="text-lg font-bold text-slate-900">{summary.speechMetrics.wordsPerMinute} wpm</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Ideal ({summary.speechMetrics.idealWpmRange})</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Pacing Assessment</span>
              <span className="text-sm font-bold text-teal-800">{summary.speechMetrics.paceAssessment}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Reassuring under pressure</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Hesitation & Fillers</span>
              <span className="text-sm font-bold text-slate-900">{summary.speechMetrics.fillerWordFrequency}</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Excellent control</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Audio Clarity</span>
              <span className="text-sm font-bold text-slate-900">{summary.speechMetrics.clarityScore}</span>
              <span className="text-[10px] text-teal-700 block mt-0.5">100% transcript confidence</span>
            </div>
          </div>
        </div>

        {/* Station Links to Detailed Question Review */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            Station Questions & Scoring Evidence Breakdown
          </h3>
          
          <div className="space-y-3">
            {MOCK_INTERVIEW_QUESTIONS.map((q, idx) => (
              <div 
                key={q.id}
                onClick={() => setCurrentScreen('question-review')}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      Station {q.number}
                    </span>
                    <span className="text-xs text-teal-700 font-semibold">{q.domain}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {q.scenarioText.slice(0, 110)}...
                  </h4>
                  <div className="text-xs text-slate-500">
                    Interviewer: {q.speakerName} ({q.speakerRole.split('&')[0]})
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900">{q.scoreAwarded}</span>
                    <span className="text-xs text-slate-400 font-semibold"> / {q.maxScore}</span>
                    <div className="text-[10px] text-teal-700 font-medium">{q.rubricAlignment}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls & Export */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            onClick={() => setCurrentScreen('setup')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another Simulation</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownload}
              className="px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export PDF Report</span>
            </button>

            <button
              onClick={() => setCurrentScreen('question-review')}
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center gap-2"
            >
              <span>Detailed Question Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {downloadNotice && (
          <div className="p-3 bg-teal-800 text-white rounded-xl text-xs text-center animate-in fade-in">
            Exporting anonymized clinical feedback report (PDF)... Download initiated.
          </div>
        )}
      </div>
    </div>
  );
}
