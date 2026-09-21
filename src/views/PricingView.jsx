import React from 'react';
import { CheckCircle2, Shield, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { COMMERCIAL_PRICING, FAQS } from '../data/mockData';

export default function PricingView({ setCurrentScreen }) {
  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple, honest pricing for doctors preparing for interview
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Gain full access to realistic UK specialty panel interviews. Fixed access periods with no unexpected recurring subscription charges.
          </p>
        </div>

        {/* Commercial Comparison Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {COMMERCIAL_PRICING.map(plan => (
            <div 
              key={plan.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border bg-white shadow-sm transition ${
                plan.popular 
                  ? 'border-teal-600 ring-2 ring-teal-600/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-slate-900">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-[11px] font-bold uppercase bg-teal-700 text-white px-2.5 py-0.5 rounded-full">
                      {plan.savingBadge || 'Best Value'}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-5xl font-black text-slate-900 tracking-tight">{plan.priceGbp}</span>
                  <span className="text-xs text-slate-500 font-medium">/ {plan.period}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 mb-6">
                  {plan.id === 'plan-1month' 
                    ? 'Recommended for focused interview preparation 3–4 weeks prior to panel date.' 
                    : 'Recommended for comprehensive practice, portfolio revisions, and multiple specialty pathways.'}
                </div>

                {/* Feature breakdown with explicit TBC labels */}
                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Included in this plan:
                  </div>

                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 text-xs py-1 border-b border-slate-50">
                      <div className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feature.text.split('(')[0]}</span>
                      </div>
                      {feature.tbc && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                          To be confirmed
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Granular commercial placeholders as specified */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-[11px] space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Supported specialties:</span>
                    <span className="font-semibold text-slate-700">All available pathways</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">CV profiles:</span>
                    <span className="font-semibold text-slate-700">1 Active profile</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Feedback reports:</span>
                    <span className="font-semibold text-slate-700">Full domain transcripts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fair-use limits:</span>
                    <span className="text-amber-800 font-medium">To be confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Renewal behaviour:</span>
                    <span className="text-slate-700">Non-recurring (Expires cleanly)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cancellation terms:</span>
                    <span className="text-amber-800 font-medium">To be confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">VAT status:</span>
                    <span className="text-amber-800 font-medium">To be confirmed</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('checkout')}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-md'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>Select {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Commercial Clarification Notice */}
        <div className="max-w-4xl mx-auto p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">Transparent Commercial Transparency Note</h4>
            <p className="leading-relaxed">
              Items marked <span className="font-semibold text-amber-800 bg-amber-100 px-1 py-0.2 rounded">To be confirmed</span> reflect platform operational boundaries currently being finalized with our clinical advisory group, including exact server audio-retention caps and statutory consumer rights cooling-off clauses. No hidden subscription fees will ever be applied without explicit candidate consent.
            </p>
          </div>
        </div>

        {/* Independent service disclaimer callout */}
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Platform Independence & No Selection Guarantee</span>
          </div>
          <p className="leading-relaxed">
            Panelwise Speciality operates strictly as an independent practice simulation. Payment provides temporary access to AI voice simulation and structured rubric analysis. It does not constitute or imply registration with any royal college, medical body, or NHS recruitment office.
          </p>
        </div>
      </div>
    </div>
  );
}
