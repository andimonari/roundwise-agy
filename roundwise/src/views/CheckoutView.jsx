import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  RefreshCw,
  Mail,
  UserCheck
} from 'lucide-react';

export default function CheckoutView({ setCurrentScreen }) {
  const [selectedPlan, setSelectedPlan] = useState('plan-2months'); // 'plan-1month' or 'plan-2months'
  const [step, setStep] = useState('checkout'); // 'checkout', 'verifying-email', 'success', 'failed', 'expired'
  const [email, setEmail] = useState('alexander.moore@example.nhs.net');
  const [name, setName] = useState('Dr. Alexander Moore');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  const handleSimulateFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('failed');
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Interactive State Bar for Reviewing All Checkout UX States */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-slate-600">Simulate Checkout States:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setStep('checkout')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${step === 'checkout' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              1. Registration & Payment
            </button>
            <button
              onClick={() => setStep('verifying-email')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${step === 'verifying-email' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              2. Email Verification
            </button>
            <button
              onClick={() => setStep('success')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${step === 'success' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              3. Payment Success
            </button>
            <button
              onClick={() => setStep('failed')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${step === 'failed' ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              4. Payment Failed
            </button>
            <button
              onClick={() => setStep('expired')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${step === 'expired' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              5. Expired Access
            </button>
          </div>
        </div>

        {/* STATE 1: CHECKOUT FORM */}
        {step === 'checkout' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Account Setup & Checkout</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Create your candidate account</h2>
              <p className="text-xs text-slate-500 mt-1">
                Your account stores your verified CV facts and simulation score history.
              </p>
            </div>

            <form onSubmit={handlePay} className="space-y-6">
              {/* Plan Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Access Plan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setSelectedPlan('plan-1month')}
                    className={`cursor-pointer p-4 rounded-xl border text-left transition ${
                      selectedPlan === 'plan-1month' 
                        ? 'border-teal-600 bg-teal-50/30 ring-2 ring-teal-600/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-slate-900">1 Month Access</span>
                      <span className="font-extrabold text-base text-slate-900">£25</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">30 days access · One-off payment</p>
                  </div>

                  <div 
                    onClick={() => setSelectedPlan('plan-2months')}
                    className={`cursor-pointer p-4 rounded-xl border text-left transition relative ${
                      selectedPlan === 'plan-2months' 
                        ? 'border-teal-600 bg-teal-50/30 ring-2 ring-teal-600/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 bg-teal-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Recommended
                    </span>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-slate-900">2 Months Access</span>
                      <span className="font-extrabold text-base text-slate-900">£40</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">60 days access · Save 20%</p>
                  </div>
                </div>
              </div>

              {/* Candidate Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Candidate Full Name (with title)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="e.g. Dr. Alexander Moore"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address (NHS or personal)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="doctor@example.nhs.net"
                  />
                </div>
              </div>

              {/* Simulated Card Payment */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-teal-700" />
                    Payment Details (UK Debit / Credit Card)
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Lock className="w-3 h-3 text-slate-400" />
                    256-bit Encrypted
                  </span>
                </div>

                <div>
                  <input
                    type="text"
                    readOnly
                    value="•••• •••• •••• 4242 (Simulated Test Card)"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    readOnly
                    value="MM/YY: 12/28"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono text-slate-600"
                  />
                  <input
                    type="text"
                    readOnly
                    value="CVC: 123"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono text-slate-600"
                  />
                </div>
              </div>

              {/* Mandatory Consents & Policies */}
              <div className="space-y-2 text-xs text-slate-600">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                  />
                  <span>
                    I confirm that I have read and agree to the <strong>Terms of Service</strong> and acknowledge this is an independent simulation tool not affiliated with the NHS.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    className="mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                  />
                  <span>
                    I agree to the <strong>Privacy Notice</strong> and consent to processing my CV facts solely for interview personalisation.
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={!acceptedTerms || !acceptedPrivacy || isProcessing}
                  className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay {selectedPlan === 'plan-1month' ? '£25.00' : '£40.00'} & Begin Setup</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSimulateFailure}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition"
                >
                  Test Failed Payment State
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STATE 2: EMAIL VERIFICATION */}
        {step === 'verifying-email' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Verify your candidate email address</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              We have dispatched a secure login code to <strong>{email}</strong>. Please enter the 6-digit verification code below.
            </p>
            <div className="flex justify-center gap-2 my-4">
              {['7', '4', '9', '2', '0', '1'].map((c, i) => (
                <input
                  key={i}
                  type="text"
                  readOnly
                  value={c}
                  className="w-10 h-12 text-center text-lg font-bold border border-slate-300 rounded-lg bg-slate-50 text-slate-800"
                />
              ))}
            </div>
            <button
              onClick={() => setStep('setup')}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition"
            >
              Confirm Code & Proceed
            </button>
          </div>
        )}

        {/* STATE 3: PAYMENT SUCCESS */}
        {step === 'success' && (
          <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Payment Successful</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Access Activated: {selectedPlan === 'plan-1month' ? '1 Month (30 Days)' : '2 Months (60 Days)'}
              </h2>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                Receipt #SP-2026-8819 sent to {email}. You can now proceed to select your target medical specialty and upload your CV.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-sm mx-auto text-xs text-slate-700 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Plan:</span>
                <span className="font-semibold">{selectedPlan === 'plan-1month' ? '1 Month Access' : '2 Months Access'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-semibold">{selectedPlan === 'plan-1month' ? '£25.00' : '£40.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Access Expiry:</span>
                <span className="font-semibold">21 November 2026</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('setup')}
              className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm rounded-xl transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Continue to Specialty Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STATE 4: PAYMENT FAILED */}
        {step === 'failed' && (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Payment Declined</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Transaction could not be completed</h2>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                Your bank did not approve the transaction (code: <em>card_declined_insufficient_funds</em>). No funds were deducted.
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setStep('checkout')}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition"
              >
                Try Another Payment Method
              </button>
              <button
                onClick={() => setStep('checkout')}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-xl hover:bg-slate-200 transition"
              >
                Return to Plans
              </button>
            </div>
          </div>
        )}

        {/* STATE 5: EXPIRED ACCESS */}
        {step === 'expired' && (
          <div className="bg-white rounded-2xl border border-slate-300 p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Access Period Concluded</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Your 30-day preparation access has ended</h2>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                Your past interview transcripts and verified CV facts remain securely saved. Renew your access to complete further simulation reps.
              </p>
            </div>

            <button
              onClick={() => setStep('checkout')}
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition inline-flex items-center gap-2"
            >
              <span>Renew Access for £25 (1 Month)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
