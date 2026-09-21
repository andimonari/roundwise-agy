import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  Volume2, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Shield,
  BookOpen
} from 'lucide-react';
import { MOCK_INTERVIEW_QUESTIONS } from '../data/mockData';

export default function QuestionReviewView({ setCurrentScreen, candidateSessionResponses = {} }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const q = MOCK_INTERVIEW_QUESTIONS[selectedIdx];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const candidateRecord = candidateSessionResponses[selectedIdx];

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('results')}
            className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-800 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results Overview</span>
          </button>

          {/* Question Stepper */}
          <div className="flex items-center gap-2">
            {MOCK_INTERVIEW_QUESTIONS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedIdx(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                  selectedIdx === idx
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.number}
              </button>
            ))}
          </div>
        </div>

        {/* Station Title Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded">
                  Station {q.number} of 3
                </span>
                <span className="text-xs font-semibold text-teal-700">{q.domain}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 mt-2">
                {q.type}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Assessor: <strong>{q.speakerName}</strong> ({q.speakerRole})
              </p>
            </div>

            {/* Score pill */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-right shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Station Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-teal-700">{q.scoreAwarded}</span>
                <span className="text-xs text-slate-400 font-semibold">/ {q.maxScore}</span>
              </div>
              <span className="text-[11px] font-semibold text-teal-800">{q.rubricAlignment}</span>
            </div>
          </div>

          {/* Scenario Text */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Station Question Prompt</span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-serif">
              “{q.scenarioText}”
            </p>
          </div>
        </div>

        {/* Candidate Audio & Transcript with Verbatim Evidence Quotes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-sm text-slate-900">Your Spoken Response & Transcript Evidence</h3>
            </div>
            
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAudio ? 'Pause Playback' : 'Listen to Recording (Consented)'}</span>
            </button>
          </div>

          <div className="bg-slate-900 text-slate-200 p-4 sm:p-5 rounded-xl text-xs sm:text-sm leading-relaxed font-mono space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                {candidateRecord?.candidateSpokenAnswer ? "Recorded Candidate Transcript (Live Spoken Session):" : "Sample Candidate Response (Benchmark Demonstration):"}
              </span>
              <p>{candidateRecord?.candidateSpokenAnswer || q.sampleCandidateAnswer}</p>
            </div>

            {candidateRecord?.candidateFollowUpAnswer && (
              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                  Candidate Follow-up Response:
                </span>
                <p className="text-slate-300">{candidateRecord.candidateFollowUpAnswer}</p>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Audio playback retained under candidate’s selected 30-day retention setting. Can be permanently erased at any time in settings.
          </div>
        </div>

        {/* Concrete Transcript Evidence Cited */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Positive Evidence Present */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Evidence Cited Supporting Score</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {q.evidencePresent.map((ev, i) => (
                <li key={i} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Evidence / Omissions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              <span>Missing Evidence / Growth Areas</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {q.missingEvidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scoring Rubric Alignment & Level Descriptor */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
            Relevant Royal College Scoring Anchor (Published Standard)
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/30">
              <span className="font-bold text-teal-900 block mb-1">
                Outstanding (Level 5 Anchor):
              </span>
              <p className="text-slate-700 leading-relaxed">{q.scoringAnchor.outstanding}</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-700 block mb-1">
                Satisfactory (Pass Threshold Anchor):
              </span>
              <p className="text-slate-600 leading-relaxed">{q.scoringAnchor.satisfactory}</p>
            </div>
          </div>
        </div>

        {/* Stronger Answer Structure (Clearly labeled illustrative structure) */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-teal-400">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-bold text-sm">Illustrative Answer Structure (Framework Template)</h3>
          </div>

          <div className="p-3 bg-slate-800 text-xs text-slate-300 rounded-xl border border-slate-700">
            <strong>Important Educational Disclaimer:</strong> This structure is provided purely as an illustrative rhetorical and clinical template. It does not fabricate clinical achievements or make claims about candidate experience.
          </div>

          <div className="space-y-3 text-xs text-slate-200">
            <div className="border-l-2 border-teal-500 pl-3">
              <strong className="text-teal-300 block">1. Immediate Triage & Ownership:</strong>
              <span>Acknowledge dual life-threats explicitly; verbalise inability to be in two places at once; initiate immediate delegation.</span>
            </div>
            <div className="border-l-2 border-teal-500 pl-3">
              <strong className="text-teal-300 block">2. Structured Resuscitation (ABCDE):</strong>
              <span>State physical actions: 14G cannulae, fluid bolus, crossmatch 6 units, empirical terlipressin & prophylactic antibiotics.</span>
            </div>
            <div className="border-l-2 border-teal-500 pl-3">
              <strong className="text-teal-300 block">3. Multidisciplinary Escalation:</strong>
              <span>Escalate simultaneously to medical registrar, ICU/anaesthetics, and on-call endoscopy team.</span>
            </div>
          </div>
        </div>

        {/* Stepper Footer */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setSelectedIdx(Math.max(0, selectedIdx - 1))}
            disabled={selectedIdx === 0}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-30 text-xs font-semibold text-slate-700 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Station</span>
          </button>

          <button
            onClick={() => setSelectedIdx(Math.min(MOCK_INTERVIEW_QUESTIONS.length - 1, selectedIdx + 1))}
            disabled={selectedIdx === MOCK_INTERVIEW_QUESTIONS.length - 1}
            className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:opacity-30 text-xs font-semibold text-white flex items-center gap-1"
          >
            <span>Next Station</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
