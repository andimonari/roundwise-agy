import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  ArrowRight,
  Lock,
  RefreshCw,
  Info
} from 'lucide-react';

export default function CvUploadView({ setCurrentScreen }) {
  const [file, setFile] = useState({
    name: 'Dr_Alexander_Moore_Clinical_CV_2026.pdf',
    size: '1.8 MB',
    type: 'application/pdf'
  });
  const [uploadStatus, setUploadStatus] = useState('uploaded'); // 'empty', 'uploading', 'uploaded', 'error'
  const [dataRetentionChoice, setDataRetentionChoice] = useState('30-days'); // 'session-only', '30-days', '1-year'
  const [consentPersonalisation, setConsentPersonalisation] = useState(true);
  const [confirmedNoPatientData, setConfirmedNoPatientData] = useState(true);

  const simulateUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('uploaded');
    }, 1200);
  };

  const handleRemove = () => {
    setFile(null);
    setUploadStatus('empty');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Candidate Experience</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Upload Your Medical CV</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              We extract verified portfolio facts to personalize interview questions. You retain 100% editing control.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 font-medium">Step 2 of 4</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
              <div className="w-2/4 h-full bg-teal-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Upload Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
          {uploadStatus === 'empty' && (
            <div 
              onClick={simulateUpload}
              className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-8 text-center cursor-pointer transition bg-slate-50/50 hover:bg-teal-50/20"
            >
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">
                Click to browse or drag & drop your medical CV
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Accepted formats: PDF or DOCX (max 15MB). Text-searchable documents recommended.
              </p>
              <button 
                type="button" 
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Select File from Device
              </button>
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div className="border border-slate-200 rounded-2xl p-8 text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
              <h3 className="font-bold text-sm text-slate-800">Parsing and extracting clinical portfolio facts...</h3>
              <div className="w-64 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
                <div className="w-3/4 h-full bg-teal-600 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-slate-400">Classifying employment, QIPs, teaching, and research publications...</p>
            </div>
          )}

          {uploadStatus === 'uploaded' && file && (
            <div className="border border-teal-200 bg-teal-50/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{file.name}</h4>
                    <span className="text-[11px] text-slate-500">{file.size} · Uploaded & Ready for Extraction</span>
                  </div>
                </div>
                <button
                  onClick={handleRemove}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition"
                  title="Remove CV"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-100/60 p-2.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>12 Candidate Portfolio Facts extracted across 10 UK medical categories.</span>
              </div>
            </div>
          )}

          {/* CRITICAL PRIVACY & CLINICAL GOVERNANCE NOTICE */}
          <div className="p-4 bg-slate-900 text-slate-300 rounded-xl space-y-3 text-xs">
            <div className="flex items-center gap-2 text-teal-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Strict NHS Clinical Governance & GDPR Data Minimisation</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              <strong>DO NOT INCLUDE PATIENT-IDENTIFIABLE INFORMATION (PID/PII):</strong> Ensure case reports or audit logs in your CV do not contain NHS numbers, patient names, dates of birth, or hospital identification numbers.
            </p>
            <div className="pt-1 flex flex-col sm:flex-row gap-4 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                Encrypted in transit & at rest
              </span>
              <span>Never used to train public LLM models</span>
              <span>Fully deletable at any time</span>
            </div>
          </div>

          {/* Retention Period Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Data Retention Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label 
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  dataRetentionChoice === 'session-only' 
                    ? 'border-teal-600 bg-teal-50/40 text-teal-900 font-semibold' 
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="retention"
                  value="session-only"
                  checked={dataRetentionChoice === 'session-only'}
                  onChange={() => setDataRetentionChoice('session-only')}
                  className="sr-only"
                />
                <div className="font-bold">Immediate Session Only</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Delete raw CV file immediately post-extraction</div>
              </label>

              <label 
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  dataRetentionChoice === '30-days' 
                    ? 'border-teal-600 bg-teal-50/40 text-teal-900 font-semibold' 
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="retention"
                  value="30-days"
                  checked={dataRetentionChoice === '30-days'}
                  onChange={() => setDataRetentionChoice('30-days')}
                  className="sr-only"
                />
                <div className="font-bold">30 Days (Recommended)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Retain for revision during your access period</div>
              </label>

              <label 
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  dataRetentionChoice === '1-year' 
                    ? 'border-teal-600 bg-teal-50/40 text-teal-900 font-semibold' 
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="retention"
                  value="1-year"
                  checked={dataRetentionChoice === '1-year'}
                  onChange={() => setDataRetentionChoice('1-year')}
                  className="sr-only"
                />
                <div className="font-bold">1 Full Recruitment Cycle</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Retain for subsequent recruitment rounds</div>
              </label>
            </div>
          </div>

          {/* Mandatory Checkboxes */}
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmedNoPatientData}
                onChange={(e) => setConfirmedNoPatientData(e.target.checked)}
                className="mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span>
                I confirm this document contains <strong>no confidential patient-identifiable data</strong> and complies with Caldicott Guardian principles.
              </span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consentPersonalisation}
                onChange={(e) => setConsentPersonalisation(e.target.checked)}
                className="mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span>
                I consent to the system referencing extracted facts to personalise scenario follow-ups after I review them.
              </span>
            </label>
          </div>

          {/* Action */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentScreen('setup')}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              Back to Setup
            </button>

            <button
              onClick={() => setCurrentScreen('cv-review')}
              disabled={uploadStatus !== 'uploaded' || !confirmedNoPatientData || !consentPersonalisation}
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Review Extracted Facts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
