import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  Plus, 
  ShieldAlert, 
  ArrowRight,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  FolderGit2,
  Users,
  Presentation,
  Clock,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { INITIAL_CV_FACTS } from '../data/mockData';

export default function CvFactReviewView({ setCurrentScreen }) {
  const [facts, setFacts] = useState(INITIAL_CV_FACTS);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const toggleVerify = (id) => {
    setFacts(prev => prev.map(f => f.id === id ? { ...f, verified: !f.verified } : f));
  };

  const deleteFact = (id) => {
    setFacts(prev => prev.filter(f => f.id !== id));
  };

  const startEdit = (fact) => {
    setEditingId(fact.id);
    setEditFormData({ ...fact });
  };

  const saveEdit = () => {
    setFacts(prev => prev.map(f => f.id === editingId ? { ...editFormData, verified: true } : f));
    setEditingId(null);
  };

  const addManualFact = () => {
    const newFact = {
      id: `custom-${Date.now()}`,
      category: 'Audit and quality improvement',
      title: 'New Clinical Fact (Click Edit to customise)',
      institution: 'NHS Trust',
      period: '2025 – 2026',
      verified: true,
      summary: 'Custom entry added by candidate to test specific portfolio questioning.'
    };
    setFacts([newFact, ...facts]);
    startEdit(newFact);
  };

  const categories = [
    'Employment and clinical experience',
    'Qualifications',
    'Teaching',
    'Research',
    'Audit and quality improvement',
    'Leadership and management',
    'Presentations and publications',
    'Awards',
    'Career breaks or gaps',
    'Other relevant experience'
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">CV Fact Verification</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Review & Confirm Portfolio Facts</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              The AI interviewer will ONLY draw context from verified facts below. Extraction is an aid, not infallible.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 font-medium">Step 3 of 4</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
              <div className="w-3/4 h-full bg-teal-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Fact Infallibility Notice */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold">Human Verification Required</h4>
            <p className="leading-relaxed mt-0.5">
              Automated parsing may misclassify dates or hospital trusts. Please verify each card below. Any unverified or removed card will <strong>never</strong> be brought up by the panel members.
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Showing <strong className="text-slate-900">{facts.length}</strong> extracted items (
            <strong className="text-teal-700">{facts.filter(f => f.verified).length} verified</strong>)
          </div>
          <button
            onClick={addManualFact}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Portfolio Fact</span>
          </button>
        </div>

        {/* Category Fact List */}
        <div className="space-y-6">
          {categories.map(cat => {
            const catFacts = facts.filter(f => f.category === cat);
            if (catFacts.length === 0) return null;

            return (
              <div key={cat} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    {cat}
                  </h3>
                  <span className="text-[11px] text-slate-400">{catFacts.length} item(s)</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {catFacts.map(fact => {
                    const isEditing = editingId === fact.id;

                    if (isEditing) {
                      return (
                        <div key={fact.id} className="bg-white p-5 rounded-xl border-2 border-teal-500 shadow-sm space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">Title / Role</label>
                              <input
                                type="text"
                                value={editFormData.title}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                className="w-full text-xs p-2 border border-slate-300 rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">Institution / Trust</label>
                              <input
                                type="text"
                                value={editFormData.institution}
                                onChange={(e) => setEditFormData({ ...editFormData, institution: e.target.value })}
                                className="w-full text-xs p-2 border border-slate-300 rounded"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">Period / Dates</label>
                              <input
                                type="text"
                                value={editFormData.period}
                                onChange={(e) => setEditFormData({ ...editFormData, period: e.target.value })}
                                className="w-full text-xs p-2 border border-slate-300 rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
                              <select
                                value={editFormData.category}
                                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                className="w-full text-xs p-2 border border-slate-300 rounded bg-white"
                              >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Verified Clinical Summary</label>
                            <textarea
                              rows={2}
                              value={editFormData.summary}
                              onChange={(e) => setEditFormData({ ...editFormData, summary: e.target.value })}
                              className="w-full text-xs p-2 border border-slate-300 rounded"
                            />
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveEdit}
                              className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded"
                            >
                              Save Fact
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div 
                        key={fact.id}
                        className={`p-4 rounded-xl border transition bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          fact.verified 
                            ? 'border-slate-200 hover:border-slate-300' 
                            : 'border-amber-300 bg-amber-50/20'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">{fact.title}</h4>
                            <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.2 rounded">
                              {fact.period}
                            </span>
                            {fact.verified ? (
                              <span className="inline-flex items-center gap-1 text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold border border-teal-200">
                                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                                Confirmed for Mock
                              </span>
                            ) : (
                              <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold">
                                Unconfirmed (Ignored)
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-600 font-medium">{fact.institution}</div>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{fact.summary}</p>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => toggleVerify(fact.id)}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                              fact.verified
                                ? 'text-slate-600 hover:text-slate-900 bg-slate-100'
                                : 'bg-teal-700 text-white font-semibold'
                            }`}
                          >
                            {fact.verified ? 'Unverify' : 'Verify Fact'}
                          </button>
                          <button
                            onClick={() => startEdit(fact)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                            title="Edit fact details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteFact(fact.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                            title="Delete fact"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setCurrentScreen('cv-upload')}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium"
          >
            Back to CV Upload
          </button>

          <button
            onClick={() => setCurrentScreen('device-check')}
            className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-sm inline-flex items-center gap-2"
          >
            <span>Confirm Facts & Test Audio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
