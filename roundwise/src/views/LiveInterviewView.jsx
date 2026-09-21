import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Clock, 
  RotateCcw, 
  AlertTriangle, 
  HelpCircle, 
  LogOut, 
  Eye, 
  EyeOff, 
  Wifi, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  PhoneOff,
  Pause,
  Play,
  ArrowRight,
  Shield,
  MessageSquare
} from 'lucide-react';
import AudioWave from '../components/AudioWave';
import MicMeter from '../components/MicMeter';
import { MOCK_INTERVIEW_QUESTIONS, SPECIALTIES } from '../data/mockData';
import { VoiceSocketClient } from '../services/voiceSocket';
import { api } from '../services/api';

export default function LiveInterviewView({ setCurrentScreen }) {
  // Active Question & Navigation
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const currentQuestion = MOCK_INTERVIEW_QUESTIONS[currentQuestionIdx];
  const specialty = SPECIALTIES[0]; // IMT

  // Timers
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(1280); // ~21 mins
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(currentQuestion.timeAllocatedSeconds);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Candidate Controls & UI Flags
  const [isMuted, setIsMuted] = useState(false);
  const [hideQuestionText, setHideQuestionText] = useState(false);
  const [repeatsRemaining, setRepeatsRemaining] = useState(2);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Backend Realtime Connection
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketClient, setSocketClient] = useState(null);

  // INTERACTION STATES (The 11 Required States)
  // 'panel-speaking', 'candidate-speaking', 'ai-processing', 'silence-detected', 
  // 'candidate-repeated', 'time-warning', 'time-expired', 'network-interrupted', 
  // 'mic-failure', 'paused-technical', 'completed'
  const [interviewState, setInterviewState] = useState('panel-speaking');

  // Candidate Transcript during mock
  const [liveCandidateTranscript, setLiveCandidateTranscript] = useState(
    "I would approach this acute presentation systematically using an ABCDE assessment while exercising rapid triage and delegation..."
  );

  // Connect to live turn engine over WebSocket
  useEffect(() => {
    let client = null;
    try {
      client = new VoiceSocketClient(`session-${Date.now()}`, {
        onOpen: () => setSocketConnected(true),
        onClose: () => setSocketConnected(false),
        onSnapshot: (snapshot) => {
          if (snapshot.state === 'panel') setInterviewState('panel-speaking');
          else if (snapshot.state === 'candidate') setInterviewState('candidate-speaking');
          else if (snapshot.state === 'processing') setInterviewState('ai-processing');
          else if (snapshot.state === 'silence') setInterviewState('silence-detected');
          else if (snapshot.state === 'repeat') setInterviewState('candidate-repeated');
          else if (snapshot.state === 'warn') setInterviewState('time-warning');
          else if (snapshot.state === 'expired') setInterviewState('time-expired');
          else if (snapshot.state === 'network') setInterviewState('network-interrupted');
          else if (snapshot.state === 'mic') setInterviewState('mic-failure');
          else if (snapshot.state === 'paused') setInterviewState('paused-technical');
          else if (snapshot.state === 'completed') setInterviewState('completed');

          if (snapshot.repeatsRemaining !== undefined) setRepeatsRemaining(snapshot.repeatsRemaining);
          if (snapshot.transcript) setLiveCandidateTranscript(snapshot.transcript);
        },
        onTranscriptInterim: (text) => {
          setLiveCandidateTranscript(prev => prev + ' ' + text);
        },
        onTranscriptFinal: (frame) => {
          setLiveCandidateTranscript(prev => prev + ' ' + frame.text);
        },
      });
      setSocketClient(client);
    } catch (err) {
      console.warn('Live WebSocket fallback:', err);
    }

    return () => {
      if (client) client.close();
    };
  }, []);

  // Timer countdown tick
  useEffect(() => {
    if (isTimerPaused || interviewState === 'completed' || interviewState === 'paused-technical') return;

    const timer = setInterval(() => {
      setTotalSecondsLeft(prev => Math.max(0, prev - 1));
      setQuestionSecondsLeft(prev => {
        if (prev <= 1) {
          setInterviewState('time-expired');
          return 0;
        }
        if (prev === 60) {
          setInterviewState('time-warning');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerPaused, interviewState]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleRequestRepeat = () => {
    if (repeatsRemaining > 0) {
      setRepeatsRemaining(prev => prev - 1);
      setInterviewState('candidate-repeated');
      setTimeout(() => {
        setInterviewState('panel-speaking');
      }, 3500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < MOCK_INTERVIEW_QUESTIONS.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      setQuestionSecondsLeft(MOCK_INTERVIEW_QUESTIONS[nextIdx].timeAllocatedSeconds);
      setRepeatsRemaining(1);
      setInterviewState('panel-speaking');
    } else {
      setInterviewState('completed');
    }
  };

  const finishAndGoToResults = () => {
    setCurrentScreen('results');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col justify-between select-none">
      {/* 1. Top Diagnostic & Interaction State Machine Switcher */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">Live Voice Panel Session</span>
          </div>
          {socketConnected ? (
            <span className="bg-emerald-950/80 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-700/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              WebSocket Engine Live (:3001)
            </span>
          ) : (
            <span className="bg-slate-800 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
              Offline Simulation
            </span>
          )}
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-mono">Pathway: {specialty.code}</span>
          <span className="hidden sm:inline text-slate-400 font-mono">Station {currentQuestion.number} of {MOCK_INTERVIEW_QUESTIONS.length}</span>
        </div>

        {/* State Switcher for Reviewing all 11 States */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider hidden lg:inline">
            Test State:
          </span>
          <select
            value={interviewState}
            onChange={(e) => setInterviewState(e.target.value)}
            className="bg-slate-800 text-teal-300 text-[11px] font-medium px-2 py-1 rounded border border-slate-700 focus:outline-none"
            aria-label="Select interview simulation state"
          >
            <option value="panel-speaking">1. Panel Member Speaking</option>
            <option value="candidate-speaking">2. Candidate Speaking (Listening)</option>
            <option value="ai-processing">3. AI Processing & Analyzing</option>
            <option value="silence-detected">4. Silence Detected Warning</option>
            <option value="candidate-repeated">5. Candidate Asks for Repetition</option>
            <option value="time-warning">6. Time Warning (60s Left)</option>
            <option value="time-expired">7. Answer Time Expired</option>
            <option value="network-interrupted">8. Network Interruption Alert</option>
            <option value="mic-failure">9. Microphone Failure Alert</option>
            <option value="paused-technical">10. Interview Paused (Technical)</option>
            <option value="completed">11. Interview Completed</option>
          </select>

          {/* Quick Step Station */}
          <button
            onClick={handleNextQuestion}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-medium border border-slate-700"
            title="Advance to next station question"
          >
            Next Station →
          </button>
        </div>
      </div>

      {/* 2. Top Header Bar: Timers, Connection, Scored Mode Notice */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-slate-850">
        <div className="flex items-center gap-4">
          {/* Total Interview Timer */}
          <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold leading-none">Total Time</span>
              <span className="text-sm font-mono font-bold text-white">{formatTime(totalSecondsLeft)}</span>
            </div>
          </div>

          {/* Question Countdown Timer */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition ${
            questionSecondsLeft <= 60 
              ? 'bg-amber-950/60 border-amber-500 text-amber-200 animate-pulse' 
              : 'bg-slate-900/90 border-slate-800 text-white'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Station Timer:</span>
            <span className="text-base font-mono font-extrabold">{formatTime(questionSecondsLeft)}</span>
          </div>
        </div>

        {/* Status Indicators & Non-Coaching Enforcement Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <Shield className="w-3.5 h-3.5 text-teal-400" />
            <span>Scored Examination Mode · Live Coaching Suppressed</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>22 ms (RTT)</span>
          </div>
        </div>
      </div>

      {/* 3. Main Stage: Virtual Panel Grid + Central Focus */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col justify-center gap-6">
        
        {/* INTERACTION STATE BANNERS (Warnings, Silence, Network, etc.) */}
        {interviewState === 'time-warning' && (
          <div className="p-3 bg-amber-500/20 border border-amber-500/60 text-amber-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-bounce" />
              <span><strong>Time Warning:</strong> 1 minute remaining for this station. Conclude your answer structure.</span>
            </div>
            <button onClick={() => setInterviewState('candidate-speaking')} className="text-amber-300 underline font-semibold">Dismiss</button>
          </div>
        )}

        {interviewState === 'silence-detected' && (
          <div className="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-teal-400" />
              <span><strong>Silence Detected (8 seconds):</strong> Take your time to formulate your clinical answer, or click <em>Repeat Question</em> if you need clarification.</span>
            </div>
            <button onClick={() => setInterviewState('candidate-speaking')} className="text-teal-400 underline font-semibold">Resume Speaking</button>
          </div>
        )}

        {interviewState === 'network-interrupted' && (
          <div className="p-3 bg-rose-950/80 border border-rose-600 text-rose-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
              <span><strong>Connection Interruption:</strong> Audio buffer packet lost. Reconnecting to local media stream... (Mock clock paused).</span>
            </div>
            <button onClick={() => setInterviewState('panel-speaking')} className="px-3 py-1 bg-rose-700 text-white rounded text-xs font-semibold">Reconnect Audio</button>
          </div>
        )}

        {interviewState === 'mic-failure' && (
          <div className="p-3 bg-rose-950/80 border border-rose-600 text-rose-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <MicOff className="w-4 h-4 text-rose-400" />
              <span><strong>Microphone Device Error:</strong> No audio input signal detected. Check your OS permissions or switch to Text Fallback Mode.</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setInterviewState('candidate-speaking')} className="px-2 py-1 bg-slate-800 text-slate-200 rounded text-xs">Switch to Text Mode</button>
              <button onClick={() => setInterviewState('candidate-speaking')} className="px-2 py-1 bg-rose-700 text-white rounded text-xs">Retry Mic</button>
            </div>
          </div>
        )}

        {interviewState === 'paused-technical' && (
          <div className="p-4 bg-slate-900 border border-teal-500 text-white rounded-2xl text-xs text-center space-y-2">
            <h4 className="font-bold text-sm text-teal-300">Simulation Paused for Technical Assistance</h4>
            <p className="text-slate-400">Timers are suspended. Verify your audio or review the interview rubric rules.</p>
            <button onClick={() => setInterviewState('candidate-speaking')} className="px-5 py-2 bg-teal-600 hover:bg-teal-500 font-bold rounded-lg text-white">
              Resume Interview Session
            </button>
          </div>
        )}

        {interviewState === 'completed' && (
          <div className="p-6 bg-slate-900 border border-emerald-500 rounded-2xl text-center space-y-4 max-w-xl mx-auto animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Interview Circuit Completed!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The panel members have submitted their structured assessment marks. All 3 stations have been evaluated against NHS recruitment rubrics with transcript evidence.
            </p>
            <button
              onClick={finishAndGoToResults}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition shadow-lg inline-flex items-center gap-2"
            >
              <span>View Full Scoring & Rubric Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Panel Members Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specialty.panelists.map((panelist, idx) => {
            const isSpeaking = interviewState === 'panel-speaking' && currentQuestion.speakerId === panelist.id;
            const isAssessingThisStation = currentQuestion.speakerId === panelist.id;

            return (
              <div
                key={panelist.id}
                className={`relative rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                  isSpeaking
                    ? 'bg-slate-900 border-teal-400 shadow-xl shadow-teal-950/50 ring-2 ring-teal-500/30'
                    : isAssessingThisStation
                    ? 'bg-slate-900/90 border-slate-700'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm border ${
                        isSpeaking 
                          ? 'bg-teal-700 text-white border-teal-400' 
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {panelist.name.split(' ')[1]?.[0] || 'D'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-white">{panelist.name}</h4>
                          {isSpeaking && (
                            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                          )}
                        </div>
                        <p className="text-[11px] text-teal-400 font-medium">{panelist.role}</p>
                      </div>
                    </div>

                    {isSpeaking && (
                      <span className="text-[10px] font-bold uppercase bg-teal-950 text-teal-300 px-2 py-0.5 rounded-full border border-teal-700">
                        Speaking
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400 mt-2">
                    {idx === 0 && 'Assessing Clinical Judgement & Prioritisation.'}
                    {idx === 1 && 'Assessing GMC Ethics & Team Leadership.'}
                    {idx === 2 && 'Assessing Portfolio Quality Improvement & Teaching.'}
                  </div>
                </div>

                {/* Waveform indicator if this panel member is speaking */}
                {isSpeaking && (
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <AudioWave isActive={true} color="teal" height={28} barCount={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Central Presentation: Question Text & Status */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-800 text-teal-300 px-2.5 py-0.5 rounded border border-slate-700">
                Station {currentQuestion.number}: {currentQuestion.domain}
              </span>
              <span className="text-[11px] text-slate-400">Weight: {(currentQuestion.weight * 100)}%</span>
            </div>

            {/* Exam Realism Toggle: Hide Question Text */}
            <button
              onClick={() => setHideQuestionText(!hideQuestionText)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
              title="Toggle question text visibility"
            >
              {hideQuestionText ? <Eye className="w-3.5 h-3.5 text-teal-400" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{hideQuestionText ? 'Show Question Text' : 'Hide Question (Exam Realism: Audio Only)'}</span>
            </button>
          </div>

          {/* Question Text Box */}
          {hideQuestionText ? (
            <div className="py-6 text-center text-slate-500 italic text-xs bg-slate-950/60 rounded-xl border border-slate-850">
              [Question text hidden for realistic verbal examination simulation. Listen carefully to panel audio.]
            </div>
          ) : (
            <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800/80">
              “{currentQuestion.scenarioText}”
            </div>
          )}

          {/* CV Personalization Callout */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-teal-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentQuestion.cvAdaptationNote}</span>
            </span>
            <span className="text-slate-500">
              Competency standard: Unchanged
            </span>
          </div>
        </div>

        {/* Candidate Audio & Speech Response Console */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white transition ${
                isMuted 
                  ? 'bg-rose-900 border border-rose-700' 
                  : interviewState === 'candidate-speaking'
                  ? 'bg-teal-600 ring-4 ring-teal-500/20 shadow-lg'
                  : 'bg-slate-800 border border-slate-700'
              }`}>
                {isMuted ? <MicOff className="w-6 h-6 text-rose-300" /> : <Mic className="w-6 h-6 text-white" />}
              </div>
              {!isMuted && interviewState === 'candidate-speaking' && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-ping" />
              )}
            </div>

            <div className="flex-1 sm:flex-initial">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Dr. Alexander Moore (Candidate)</span>
                <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full uppercase ${
                  isMuted 
                    ? 'bg-rose-950 text-rose-300' 
                    : interviewState === 'candidate-speaking'
                    ? 'bg-emerald-950 text-emerald-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isMuted ? 'Muted' : interviewState === 'candidate-speaking' ? 'Speaking (Live)' : 'Listening'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isMuted ? 'Microphone muted by candidate' : 'Microphone streaming audio to panel assessor'}
              </p>
            </div>
          </div>

          {/* Candidate Audio Meter or Waveform */}
          <div className="w-full sm:w-72">
            {interviewState === 'candidate-speaking' ? (
              <AudioWave isActive={!isMuted} color="emerald" height={32} barCount={24} />
            ) : (
              <div className="text-xs text-slate-500 text-center py-1">
                Panel member asking question. Prepare your response structure.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Bottom Controls Toolbar: Mute, Repeat, Technical Help, End Mock */}
      <div className="bg-slate-900 border-t border-slate-850 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Mic Mute Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                isMuted 
                  ? 'bg-rose-700 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-teal-400" />}
              <span>{isMuted ? 'Unmute Microphone' : 'Mute Mic'}</span>
            </button>

            {/* Repeat Question Button (governed by rules) */}
            <button
              onClick={handleRequestRepeat}
              disabled={repeatsRemaining <= 0 || interviewState === 'candidate-repeated'}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
              title="Repeat Question (Governed by Interview Rules)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
              <span>Repeat Question ({repeatsRemaining} left)</span>
            </button>
          </div>

          {/* Technical Help & Pause */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsTimerPaused(!isTimerPaused);
                setInterviewState(isTimerPaused ? 'candidate-speaking' : 'paused-technical');
              }}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition"
            >
              {isTimerPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isTimerPaused ? 'Resume Clock' : 'Technical Pause'}</span>
            </button>

            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700"
              title="Technical Assistance"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* End Interview Button */}
            <button
              onClick={() => setShowEndModal(true)}
              className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Conclude Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: End Interview Early */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center mx-auto border border-rose-800">
              <PhoneOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Conclude Mock Panel Interview?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to finish? Your spoken answers up to this station will be scored against the official rubrics, and an evidence feedback report will be generated.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Return to Interview
              </button>
              <button
                onClick={() => {
                  setShowEndModal(false);
                  finishAndGoToResults();
                }}
                className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Yes, Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Technical Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-400" />
              <span>Technical Assistance & Troubleshooting</span>
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="font-bold text-white block">Microphone not registering?</span>
                <span className="text-slate-400">Verify Chrome / Safari permission permissions (look for the lock icon in the browser address bar).</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="font-bold text-white block">Cannot hear panel members?</span>
                <span className="text-slate-400">Ensure output volume is unmuted. Test by toggling the audio output in device check.</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="font-bold text-white block">Accidental Patient Information Disclosed?</span>
                <span className="text-slate-400">You can trigger our instant redaction workflow in the post-interview report to scrub any spoken details.</span>
              </div>
            </div>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
            >
              Close Help
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
