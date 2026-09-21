import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  Calendar,
  Lock,
  Clock
} from 'lucide-react';
import { ADMIN_QUESTIONS, SPECIALTIES } from '../data/mockData';

export default function AdminDashboardView({ setCurrentScreen }) {
  const [activeTab, setActiveTab] = useState('question-bank'); // 'question-bank', 'rubrics', 'audits', 'analytics'
  const [questions, setQuestions] = useState(ADMIN_QUESTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState('all');

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialtyFilter === 'all' || q.specialty.includes(selectedSpecialtyFilter);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-2 py-0.5 rounded">
                Admin Console
              </span>
              <span className="text-xs text-slate-500 font-medium">Content & Rubric Governance</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Curriculum & Question Bank Management
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Control specialties, question versions, scoring anchors, and panel behavioral constraints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Creating new version-controlled interview scenario...")}
              className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Question</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 text-xs sm:text-sm font-semibold gap-6 text-slate-500">
          <button
            onClick={() => setActiveTab('question-bank')}
            className={`pb-3 transition ${activeTab === 'question-bank' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            Question Banks ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('rubrics')}
            className={`pb-3 transition ${activeTab === 'rubrics' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            Scoring Anchors & Models
          </button>
          <button
            onClick={() => setActiveTab('audits')}
            className={`pb-3 transition ${activeTab === 'audits' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            Flagged Interviews & QA Audits (2)
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 transition ${activeTab === 'analytics' ? 'text-teal-700 border-b-2 border-teal-700 font-bold' : 'hover:text-slate-900'}`}
          >
            Fair-Use & Subscription Controls
          </button>
        </div>

        {/* TAB 1: QUESTION BANK */}
        {activeTab === 'question-bank' && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search title, ID, or domain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-slate-500 shrink-0">Filter Specialty:</span>
                <select
                  value={selectedSpecialtyFilter}
                  onChange={(e) => setSelectedSpecialtyFilter(e.target.value)}
                  className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs bg-white text-slate-700 focus:outline-none"
                >
                  <option value="all">All Specialties</option>
                  <option value="Internal Medicine">Internal Medicine (IMT)</option>
                  <option value="Surgical">Core Surgical (CST)</option>
                  <option value="General Practice">General Practice (GPST)</option>
                </select>
              </div>
            </div>

            {/* Questions Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">ID / Ver</th>
                      <th className="p-3.5">Scenario Title</th>
                      <th className="p-3.5">Specialty & Pathway</th>
                      <th className="p-3.5">Domain</th>
                      <th className="p-3.5">Weight / Time</th>
                      <th className="p-3.5">Assigned Role</th>
                      <th className="p-3.5">Provenance & Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuestions.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-mono font-bold text-slate-900">
                          <div>{q.id}</div>
                          <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-1 py-0.2 rounded border border-teal-200">
                            {q.version}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{q.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{q.type}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800">{q.specialty}</div>
                          <span className="text-[10px] text-slate-500 font-mono">{q.pathway}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                            {q.domain}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div>{(q.weight * 100)}% Weight</div>
                          <span className="text-slate-400 text-[11px]">{q.timeLimitSeconds / 60} mins</span>
                        </td>
                        <td className="p-3.5 text-slate-600 max-w-[140px] truncate" title={q.assignedPanelRole}>
                          {q.assignedPanelRole.split('&')[0]}
                        </td>
                        <td className="p-3.5">
                          <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 block w-max">
                            {q.status}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Rev: {q.reviewDate}</span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button className="p-1 text-slate-400 hover:text-teal-700 mr-1" title="Edit Question">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-rose-600" title="Retire Question">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RUBRIC MODELS */}
        {activeTab === 'rubrics' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 text-xs">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Rubric Scoring Anchors (Level 1 to 5)</h3>
              <p className="text-slate-500">Criteria definitions enforcing non-hallucinatory AI scoring.</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-teal-900">Level 5 (Distinction / Benchmark)</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Points: 5.0</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Systematic crisis resource management; immediate prioritization; flawless ABCDE structure; statutory Duty of Candour and Just Culture incident reporting; explicitly delegates competing emergencies safely.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-900">Level 3 (Satisfactory / Pass Standard)</span>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Points: 3.0</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Safe baseline clinician. Follows ABCDE resuscitation; recognises need to escalate to registrar; identifies error and informs senior; some minor disorganisation in drug dosing or delegation timing.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-rose-900">Level 1 (Unsatisfactory / Critical Failure)</span>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Points: 1.0</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Patient safety compromised. Fails to recognise decompensated shock; attempts to manage alone without escalation; conceals clinical error or colludes with colleague.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUDITS */}
        {activeTab === 'audits' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Flagged Scoring Audits (QA Pipeline)</h3>
              <p className="text-slate-500">Transcripts flagged by automated quality monitors for clinical human review.</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">Audit #QA-901: Low Audio Transcript Confidence</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Pending Review</span>
                </div>
                <p className="text-slate-600">Candidate audio contained heavy background hiss; transcription confidence dropped below 0.82 on Question 2.</p>
              </div>

              <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-teal-900">Audit #QA-894: Score Divergence Check</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Resolved (GMC standard verified)</span>
                </div>
                <p className="text-slate-600">Automated check confirmed Level 5 rating was correctly anchored to transcript quotes.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAIR USE */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Fair-Use Thresholds & Voice Model Latency</h3>
              <p className="text-slate-500">Manage infrastructure costs and audio processing concurrency limits.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block uppercase font-bold text-[10px]">1-Month Plan Cap</span>
                <span className="text-xl font-bold text-slate-900">8 Full Mocks</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">TBC fair-use rule</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block uppercase font-bold text-[10px]">2-Month Plan Cap</span>
                <span className="text-xl font-bold text-slate-900">20 Full Mocks</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">TBC fair-use rule</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Avg Voice Latency</span>
                <span className="text-xl font-bold text-emerald-700">180 ms</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">Sub-second response</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
