import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Clock, 
  RotateCcw, 
  AlertTriangle, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Wifi, 
  CheckCircle2, 
  Sparkles,
  PhoneOff,
  Pause,
  Play,
  ArrowRight,
  Shield,
  MessageSquare,
  Send,
  FastForward,
  Keyboard,
  Check,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import AudioWave from '../components/AudioWave';
import MicMeter from '../components/MicMeter';
import { MOCK_INTERVIEW_QUESTIONS, SPECIALTIES } from '../data/mockData';
import { VoiceSocketClient } from '../services/voiceSocket';
import { 
  speakQuestion, 
  stopSpeaking, 
  createSpeechRecognizer, 
  startAudioMeter, 
  playChime 
} from '../services/voiceAssistant';

// Realistic clinical follow-up probes for each station
const CLINICAL_FOLLOWUPS = {
  0: {
    probe: "Thank you, Dr. Moore. While you are initiating resuscitation, the patient's blood pressure drops to 82/45 despite 500ml of fluid, and a 12-lead ECG reveals anterior ST-elevation. How do you adjust your clinical escalation and who do you contact immediately?",
    idealPoints: "Simultaneous dual-pathway escalation: activate on-call endoscopy AND cardiology/catheter lab while maintaining haemodynamic resuscitation."
  },
  1: {
    probe: "Thank you. If the Foundation Year 1 doctor remains adamant that filing a Datix will ruin their career and tearfully refuses to co-sign the incident report, how do you proceed under GMC Good Medical Practice?",
    idealPoints: "Patient safety is non-negotiable. Compassionately explain that patient duty overrides colleague preference. File the Datix independently if needed, notify the consultant, while continuing to support the FY1."
  },
  2: {
    probe: "Thank you, Dr. Moore. Looking at your Sepsis Six project, what specific statistical process control or run-chart rule did you use to distinguish genuine systemic improvement from random weekly variation?",
    idealPoints: "Observed a shift of 6 or more consecutive data points above the median line following the nursing empowerment protocol, confirming non-random improvement."
  }
};

export default function LiveInterviewView({ 
  setCurrentScreen, 
  designMode = 'healthcare',
  candidateSessionResponses = {},
  setCandidateSessionResponses = () => {} 
}) {
  const isIndustry = designMode === 'industry';

  // Active Station Navigation
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const currentQuestion = MOCK_INTERVIEW_QUESTIONS[currentQuestionIdx];
  const specialty = SPECIALTIES[0]; // IMT
  const followUpData = CLINICAL_FOLLOWUPS[currentQuestionIdx] || CLINICAL_FOLLOWUPS[0];

  // Timers
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(1200); // 20 mins total
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(currentQuestion.timeAllocatedSeconds || 300);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Candidate Controls & UI Flags
  const [isMuted, setIsMuted] = useState(false);
  const [isTtsMuted, setIsTtsMuted] = useState(false);
  const [hideQuestionText, setHideQuestionText] = useState(false);
  const [repeatsRemaining, setRepeatsRemaining] = useState(1);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [useTextInput, setUseTextInput] = useState(false);

  // Audio & Speech State
  const [isTtsSpeaking, setIsTtsSpeaking] = useState(false);
  const [isMicListening, setIsMicListening] = useState(false);
  const [realMicLevel, setRealMicLevel] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(true);

  // INTERACTION STATE MACHINE
  // 'panel-speaking', 'candidate-speaking', 'ai-processing', 'panel-followup',
  // 'candidate-followup', 'station-completed', 'silence-detected', 'candidate-repeated',
  // 'time-warning', 'time-expired', 'network-interrupted', 'mic-failure', 'paused-technical', 'completed'
  const [interviewState, setInterviewState] = useState('panel-speaking');

  // Transcripts
  const [liveCandidateTranscript, setLiveCandidateTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [followUpResponse, setFollowUpResponse] = useState("");
  const [silenceSeconds, setSilenceSeconds] = useState(0);

  // Backend Realtime Connection
  const [socketConnected, setSocketConnected] = useState(false);
  const socketClientRef = useRef(null);
  const speechRecognizerRef = useRef(null);
  const audioMeterRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // 1. WebSocket Engine Connection
  useEffect(() => {
    let client = null;
    try {
      client = new VoiceSocketClient(`session-${Date.now()}`, {
        onOpen: () => setSocketConnected(true),
        onClose: () => setSocketConnected(false),
        onSnapshot: (snapshot) => {
          if (snapshot.state === 'panel' && interviewState !== 'panel-speaking') {
            setInterviewState('panel-speaking');
          } else if (snapshot.state === 'candidate' && interviewState !== 'candidate-speaking') {
            setInterviewState('candidate-speaking');
          }
        },
        onError: () => setSocketConnected(false)
      });
      socketClientRef.current = client;
    } catch (err) {
      console.warn('WebSocket simulation fallback:', err);
    }

    return () => {
      if (client) client.close();
    };
  }, []);

  // 2. Setup Speech Recognizer & Mic Meter
  useEffect(() => {
    // Initialize speech recognizer
    const recognizer = createSpeechRecognizer({
      onInterim: (text) => {
        setInterimTranscript(text);
        setSilenceSeconds(0);
      },
      onFinal: (text) => {
        setLiveCandidateTranscript(prev => (prev ? prev + ' ' + text : text));
        setInterimTranscript("");
        setSilenceSeconds(0);
      },
      onError: (err) => {
        console.warn('[RoundWise Speech Rec Error]', err);
      },
      onStatusChange: ({ isListening }) => {
        setIsMicListening(isListening);
      }
    });

    speechRecognizerRef.current = recognizer;
    setSpeechSupported(recognizer.isSupported);

    return () => {
      recognizer.stop();
      stopSpeaking();
    };
  }, []);

  // 3. Audio Meter (Web Audio API tracking real microphone decibels)
  useEffect(() => {
    let meterPromise = null;

    if ((interviewState === 'candidate-speaking' || interviewState === 'candidate-followup') && !isMuted) {
      meterPromise = startAudioMeter((level) => {
        setRealMicLevel(level);
        if (level > 15) {
          setSilenceSeconds(0);
        }
      }).then((meter) => {
        audioMeterRef.current = meter;
      });

      // Start recognition
      if (speechRecognizerRef.current && !useTextInput) {
        speechRecognizerRef.current.start();
      }
    } else {
      if (audioMeterRef.current) {
        audioMeterRef.current.stop();
        audioMeterRef.current = null;
      }
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stop();
      }
      setRealMicLevel(0);
    }

    return () => {
      if (audioMeterRef.current) {
        audioMeterRef.current.stop();
        audioMeterRef.current = null;
      }
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stop();
      }
    };
  }, [interviewState, isMuted, useTextInput]);

  // 4. Panel Vocalization (TTS Speaking) when entering a station or repeat
  useEffect(() => {
    if (interviewState === 'panel-speaking') {
      setIsTtsSpeaking(true);
      const speakerGender = currentQuestion.speakerName.includes('Sarah') ? 'female' : 'male';

      if (!isTtsMuted) {
        speakQuestion(currentQuestion.scenarioText, {
          voiceGender: speakerGender,
          rate: 1.0,
          onStart: () => setIsTtsSpeaking(true),
          onEnd: () => {
            setIsTtsSpeaking(false);
            playChime('turn');
            setInterviewState('candidate-speaking');
          },
          onError: () => {
            setIsTtsSpeaking(false);
            setInterviewState('candidate-speaking');
          }
        });
      } else {
        // If muted, transition after 2 seconds
        const timeout = setTimeout(() => {
          setIsTtsSpeaking(false);
          setInterviewState('candidate-speaking');
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else if (interviewState === 'panel-followup') {
      setIsTtsSpeaking(true);
      const speakerGender = currentQuestion.speakerName.includes('Sarah') ? 'female' : 'male';

      if (!isTtsMuted) {
        speakQuestion(followUpData.probe, {
          voiceGender: speakerGender,
          rate: 1.0,
          onStart: () => setIsTtsSpeaking(true),
          onEnd: () => {
            setIsTtsSpeaking(false);
            playChime('turn');
            setInterviewState('candidate-followup');
          },
          onError: () => {
            setIsTtsSpeaking(false);
            setInterviewState('candidate-followup');
          }
        });
      } else {
        const timeout = setTimeout(() => {
          setIsTtsSpeaking(false);
          setInterviewState('candidate-followup');
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      stopSpeaking();
      setIsTtsSpeaking(false);
    }
  }, [interviewState, currentQuestionIdx, isTtsMuted]);

  // 5. Silence Detection Timer during Candidate Speaking
  useEffect(() => {
    if (interviewState !== 'candidate-speaking' || isMuted) {
      setSilenceSeconds(0);
      return;
    }

    silenceTimerRef.current = setInterval(() => {
      setSilenceSeconds(prev => {
        if (prev >= 10 && interviewState === 'candidate-speaking' && liveCandidateTranscript.length > 30) {
          // If silent for 10s after already speaking, gentle reminder
          return prev + 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(silenceTimerRef.current);
  }, [interviewState, isMuted, liveCandidateTranscript]);

  // 6. Timers Tick
  useEffect(() => {
    if (
      isTimerPaused || 
      interviewState === 'completed' || 
      interviewState === 'station-completed' || 
      interviewState === 'paused-technical'
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTotalSecondsLeft(prev => Math.max(0, prev - 1));
      setQuestionSecondsLeft(prev => {
        if (prev <= 1) {
          setInterviewState('time-expired');
          playChime('warn');
          return 0;
        }
        if (prev === 60) {
          playChime('warn');
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

  // Skip panel speech and begin answering immediately
  const handleSkipPanelAudio = () => {
    stopSpeaking();
    setIsTtsSpeaking(false);
    playChime('turn');
    setInterviewState('candidate-speaking');
  };

  // Skip follow-up audio and begin answering follow-up
  const handleSkipFollowUpAudio = () => {
    stopSpeaking();
    setIsTtsSpeaking(false);
    playChime('turn');
    setInterviewState('candidate-followup');
  };

  // Request Repeat Question (governed by rules)
  const handleRequestRepeat = () => {
    if (repeatsRemaining > 0) {
      setRepeatsRemaining(prev => prev - 1);
      setInterviewState('candidate-repeated');
      setTimeout(() => {
        setInterviewState('panel-speaking');
      }, 1500);
    }
  };

  // Fill sample response for quick demo / testing
  const handleFillSampleAnswer = () => {
    setLiveCandidateTranscript(currentQuestion.sampleCandidateAnswer);
    setUseTextInput(true);
  };

  // Candidate Submits Main Answer -> Triggers AI Review & Follow-up Probe
  const handleSubmitMainAnswer = () => {
    stopSpeaking();
    if (speechRecognizerRef.current) speechRecognizerRef.current.stop();
    setInterviewState('ai-processing');

    // Simulate AI clinical reasoning & prompt generation
    setTimeout(() => {
      setInterviewState('panel-followup');
    }, 1600);
  };

  // Candidate Submits Follow-up Answer -> Concludes Station
  const handleSubmitFollowUpAnswer = () => {
    stopSpeaking();
    if (speechRecognizerRef.current) speechRecognizerRef.current.stop();
    playChime('complete');

    // Save candidate answers in parent state
    setCandidateSessionResponses(prev => ({
      ...prev,
      [currentQuestionIdx]: {
        questionId: currentQuestion.id,
        stationNumber: currentQuestion.number,
        domain: currentQuestion.domain,
        scenarioText: currentQuestion.scenarioText,
        candidateSpokenAnswer: liveCandidateTranscript || currentQuestion.sampleCandidateAnswer,
        followUpQuestion: followUpData.probe,
        candidateFollowUpAnswer: followUpResponse || "Addressed immediate escalation to cardiology and endoscopy while stabilising hemodynamics.",
        score: currentQuestion.scoreAwarded,
        timestamp: new Date().toISOString()
      }
    }));

    setInterviewState('station-completed');
  };

  // Advance to Next Station
  const handleNextStation = () => {
    if (currentQuestionIdx < MOCK_INTERVIEW_QUESTIONS.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      setQuestionSecondsLeft(MOCK_INTERVIEW_QUESTIONS[nextIdx].timeAllocatedSeconds || 300);
      setRepeatsRemaining(1);
      setLiveCandidateTranscript("");
      setInterimTranscript("");
      setFollowUpResponse("");
      setSilenceSeconds(0);
      setInterviewState('panel-speaking');
    } else {
      setInterviewState('completed');
    }
  };

  // Conclude Entire Session and View Rubric Feedback
  const finishAndGoToResults = () => {
    stopSpeaking();
    // Ensure current station is recorded even if ended early
    setCandidateSessionResponses(prev => ({
      ...prev,
      [currentQuestionIdx]: {
        questionId: currentQuestion.id,
        stationNumber: currentQuestion.number,
        domain: currentQuestion.domain,
        scenarioText: currentQuestion.scenarioText,
        candidateSpokenAnswer: liveCandidateTranscript || currentQuestion.sampleCandidateAnswer,
        followUpQuestion: followUpData.probe,
        candidateFollowUpAnswer: followUpResponse || "Emergency response protocol initiated.",
        score: currentQuestion.scoreAwarded,
        timestamp: new Date().toISOString()
      }
    }));
    setCurrentScreen('results');
  };

  return (
    <div className={`w-full min-h-screen flex flex-col justify-between select-none ${
      isIndustry ? 'bg-[#0f1722] text-[#f2f2f3]' : 'bg-slate-950 text-white'
    }`}>
      {/* 1. Top Diagnostic Bar & State Simulator Switcher */}
      <div className={`px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b ${
        isIndustry ? 'bg-[#182332] border-[#223348]' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">Live Voice Panel Session</span>
          </div>
          {socketConnected ? (
            <span className="bg-emerald-950/80 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-700/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              WebSocket Engine Connected (:3001)
            </span>
          ) : (
            <span className="bg-slate-800 text-teal-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Browser Voice Engine Active
            </span>
          )}
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 font-mono hidden sm:inline">Pathway: {specialty.code}</span>
          <span className="text-teal-400 font-mono font-bold">Station {currentQuestion.number} of {MOCK_INTERVIEW_QUESTIONS.length}</span>
        </div>

        {/* State Switcher & Station Stepper */}
        <div className="flex items-center gap-2">
          {/* Audio Output Mute Toggle */}
          <button
            onClick={() => {
              setIsTtsMuted(!isTtsMuted);
              if (!isTtsMuted) stopSpeaking();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border transition ${
              isTtsMuted 
                ? 'bg-amber-950/80 text-amber-300 border-amber-700' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Panel Audio Voice"
          >
            {isTtsMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-teal-400" />}
            <span>{isTtsMuted ? 'Voice Muted' : 'Panel Voice ON'}</span>
          </button>

          {/* Quick Step Station */}
          <button
            onClick={handleNextStation}
            className="px-2.5 py-1 bg-teal-700 hover:bg-teal-600 text-white rounded text-[11px] font-bold border border-teal-600 transition flex items-center gap-1"
            title="Advance to next station"
          >
            <span>Next Station</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Top Header Bar: Timers, Domain, Status */}
      <div className={`max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b ${
        isIndustry ? 'border-[#223348]' : 'border-slate-850'
      }`}>
        <div className="flex items-center gap-4">
          {/* Total Interview Timer */}
          <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold leading-none">Total Circuit Time</span>
              <span className="text-sm font-mono font-bold text-white">{formatTime(totalSecondsLeft)}</span>
            </div>
          </div>

          {/* Station Countdown Timer */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition ${
            questionSecondsLeft <= 60 
              ? 'bg-amber-950/60 border-amber-500 text-amber-200 animate-pulse' 
              : 'bg-slate-900/90 border-slate-800 text-white'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Station Timer:</span>
            <span className="text-base font-mono font-extrabold">{formatTime(questionSecondsLeft)}</span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <Shield className="w-3.5 h-3.5 text-teal-400" />
            <span>Independent Formative Exam · NHS Rubric Anchored</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>Voice Audio Ready</span>
          </div>
        </div>
      </div>

      {/* 3. Main Stage: Virtual Panel Grid + Central Focus */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex-1 flex flex-col justify-center gap-5">
        
        {/* INTERACTION STATE BANNERS */}
        {interviewState === 'panel-speaking' && (
          <div className="p-3 bg-teal-950/80 border border-teal-500 text-teal-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              <span>
                <strong>{currentQuestion.speakerName} ({currentQuestion.speakerRole})</strong> is asking the station scenario aloud...
              </span>
            </div>
            <button 
              onClick={handleSkipPanelAudio} 
              className="px-3 py-1 bg-teal-700 hover:bg-teal-600 text-white rounded font-bold text-xs flex items-center gap-1"
            >
              <span>Skip Audio & Answer Now</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {interviewState === 'candidate-speaking' && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                <strong>Your Turn to Respond:</strong> The simulated panel is listening. Speak clearly into your microphone using your ABCDE clinical structure.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFillSampleAnswer}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded text-xs font-semibold border border-slate-700 flex items-center gap-1"
                title="Quick-fill realistic clinical response"
              >
                <span>💡 Auto-Fill Response</span>
              </button>
              <button 
                onClick={handleSubmitMainAnswer} 
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-xs shadow flex items-center gap-1"
              >
                <span>Done Speaking / Submit Answer</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {interviewState === 'ai-processing' && (
          <div className="p-4 bg-slate-900 border border-teal-500 text-teal-300 rounded-xl text-xs flex items-center justify-center gap-3 animate-pulse shadow-xl">
            <RefreshCw className="w-4 h-4 text-teal-400 animate-spin" />
            <span className="font-bold text-sm">
              Panel evaluating clinical prioritization structure against Royal College benchmark... Generating follow-up probe...
            </span>
          </div>
        )}

        {interviewState === 'panel-followup' && (
          <div className="p-3 bg-amber-950/80 border border-amber-500 text-amber-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>
                <strong>Panel Follow-Up Probe:</strong> {currentQuestion.speakerName} is speaking the clinical follow-up question...
              </span>
            </div>
            <button 
              onClick={handleSkipFollowUpAudio} 
              className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded font-bold text-xs flex items-center gap-1"
            >
              <span>Answer Follow-up Now</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {interviewState === 'candidate-followup' && (
          <div className="p-3 bg-teal-950/90 border border-teal-400 text-teal-100 rounded-xl text-xs flex items-center justify-between animate-in fade-in shadow-lg">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-teal-300 animate-pulse" />
              <span>
                <strong>Answer Panel Probe:</strong> Speak or type your answer to the panelist's unexpected clinical challenge.
              </span>
            </div>
            <button 
              onClick={handleSubmitFollowUpAnswer} 
              className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded font-bold text-xs shadow flex items-center gap-1"
            >
              <span>Submit Follow-up & Complete Station</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {interviewState === 'station-completed' && (
          <div className="p-5 bg-slate-900 border border-emerald-500 rounded-2xl text-center space-y-3 max-w-xl mx-auto shadow-2xl animate-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Station {currentQuestion.number} Completed!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your response has been transcribed and assessed by {currentQuestion.speakerName}. Standard: <strong>{currentQuestion.rubricAlignment}</strong>.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              {currentQuestionIdx < MOCK_INTERVIEW_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNextStation}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow inline-flex items-center gap-2"
                >
                  <span>Proceed to Station {currentQuestionIdx + 2} →</span>
                </button>
              ) : (
                <button
                  onClick={finishAndGoToResults}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow inline-flex items-center gap-2"
                >
                  <span>Conclude Interview & View Full Score Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={finishAndGoToResults}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700"
              >
                View Results Now
              </button>
            </div>
          </div>
        )}

        {interviewState === 'time-warning' && (
          <div className="p-3 bg-amber-500/20 border border-amber-500 text-amber-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
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
              <span><strong>Silence Detected:</strong> Take your time to formulate your clinical answer, or click <em>Submit Answer</em> if you are done.</span>
            </div>
            <button onClick={() => setInterviewState('candidate-speaking')} className="text-teal-400 underline font-semibold">Resume Speaking</button>
          </div>
        )}

        {interviewState === 'completed' && (
          <div className="p-6 bg-slate-900 border border-emerald-500 rounded-2xl text-center space-y-4 max-w-xl mx-auto animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Full Interview Circuit Completed!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All 3 simulated stations have concluded. Your spoken transcripts have been compiled with verbatim evidence citations aligned to NHS recruitment standards.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {specialty.panelists.map((panelist, idx) => {
            const isSpeakingNow = (interviewState === 'panel-speaking' || interviewState === 'panel-followup') && currentQuestion.speakerId === panelist.id;
            const isAssessingThisStation = currentQuestion.speakerId === panelist.id;

            return (
              <div
                key={panelist.id}
                className={`relative rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                  isSpeakingNow
                    ? 'bg-slate-900 border-teal-400 shadow-xl shadow-teal-950/60 ring-2 ring-teal-500/40'
                    : isAssessingThisStation
                    ? 'bg-slate-900/90 border-slate-700'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm border ${
                        isSpeakingNow 
                          ? 'bg-teal-700 text-white border-teal-400' 
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {panelist.name.split(' ')[1]?.[0] || 'D'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-white">{panelist.name}</h4>
                          {isSpeakingNow && (
                            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                          )}
                        </div>
                        <p className="text-[11px] text-teal-400 font-medium">{panelist.role}</p>
                      </div>
                    </div>

                    {isSpeakingNow && (
                      <span className="text-[10px] font-bold uppercase bg-teal-950 text-teal-300 px-2 py-0.5 rounded-full border border-teal-700 flex items-center gap-1">
                        <Volume2 className="w-3 h-3 animate-pulse" />
                        <span>Speaking</span>
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400 mt-2">
                    {idx === 0 && 'Lead Assessor: Acute Clinical Judgement & ABCDE Prioritisation.'}
                    {idx === 1 && 'Lead Assessor: Professionalism, GMC Good Medical Practice & Ethics.'}
                    {idx === 2 && 'Lead Assessor: Portfolio Evidence, Leadership & Quality Improvement.'}
                  </div>
                </div>

                {/* Waveform indicator if this panel member is speaking */}
                {isSpeakingNow && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800">
                    <AudioWave isActive={true} color="teal" height={26} barCount={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Central Presentation: Question Text & Status */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-800 text-teal-300 px-2.5 py-0.5 rounded border border-slate-700">
                Station {currentQuestion.number}: {currentQuestion.domain}
              </span>
              <span className="text-[11px] text-slate-400">Weight: {(currentQuestion.weight * 100)}%</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Exam Realism Toggle: Hide Question Text */}
              <button
                onClick={() => setHideQuestionText(!hideQuestionText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                title="Toggle question text visibility"
              >
                {hideQuestionText ? <Eye className="w-3.5 h-3.5 text-teal-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{hideQuestionText ? 'Show Text' : 'Hide (Audio-Only Mode)'}</span>
              </button>
            </div>
          </div>

          {/* Scenario Text Box */}
          {hideQuestionText ? (
            <div className="py-5 text-center text-slate-500 italic text-xs bg-slate-950/60 rounded-xl border border-slate-850">
              [Question text hidden for realistic verbal examination simulation. Listen carefully to panel audio.]
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif bg-slate-950/70 p-3.5 sm:p-4 rounded-xl border border-slate-800/80">
              “{currentQuestion.scenarioText}”
            </div>
          )}

          {/* Panel Follow-Up Probe Presentation if in Follow-up State */}
          {(interviewState === 'panel-followup' || interviewState === 'candidate-followup') && (
            <div className="p-3.5 bg-amber-950/40 border border-amber-600/60 rounded-xl text-amber-200 text-xs space-y-1 animate-in fade-in">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block">
                Clinical Follow-up Probe ({currentQuestion.speakerName}):
              </span>
              <p className="font-serif text-sm text-amber-100 leading-relaxed">
                “{followUpData.probe}”
              </p>
            </div>
          )}

          {/* CV Personalization Callout */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-teal-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentQuestion.cvAdaptationNote}</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">
              Competency standard: National Unchanged
            </span>
          </div>
        </div>

        {/* Candidate Audio & Speech Response Console */}
        <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col gap-3 shadow-xl">
          {/* Top of Candidate Box: Candidate Name & Live Mic Level */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white transition ${
                  isMuted 
                    ? 'bg-rose-900 border border-rose-700' 
                    : (interviewState === 'candidate-speaking' || interviewState === 'candidate-followup')
                    ? 'bg-emerald-600 ring-4 ring-emerald-500/30 shadow-lg'
                    : 'bg-slate-800 border border-slate-700'
                }`}>
                  {isMuted ? <MicOff className="w-5 h-5 text-rose-300" /> : <Mic className="w-5 h-5 text-white" />}
                </div>
                {!isMuted && (interviewState === 'candidate-speaking' || interviewState === 'candidate-followup') && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-ping" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Dr. Alexander Moore (Candidate)</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                    isMuted 
                      ? 'bg-rose-950 text-rose-300' 
                      : (interviewState === 'candidate-speaking' || interviewState === 'candidate-followup')
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isMuted 
                      ? 'Microphone Muted' 
                      : (interviewState === 'candidate-speaking' || interviewState === 'candidate-followup') 
                      ? 'Microphone Active (Speaking Live)' 
                      : 'Listening to Panel'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {useTextInput 
                    ? 'Keyboard Text Mode active — candidate typing response' 
                    : isMuted 
                    ? 'Microphone muted by candidate' 
                    : 'Microphone streaming audio to panel assessor & live transcription engine'}
                </p>
              </div>
            </div>

            {/* Candidate Real Mic Volume Waveform */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-60">
                <AudioWave 
                  isActive={(interviewState === 'candidate-speaking' || interviewState === 'candidate-followup') && !isMuted} 
                  color="emerald" 
                  height={28} 
                  barCount={24}
                  volume={realMicLevel}
                />
              </div>

              {/* Toggle Text Input Fallback */}
              <button
                onClick={() => setUseTextInput(!useTextInput)}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition shrink-0 ${
                  useTextInput 
                    ? 'bg-teal-700 text-white border-teal-500' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Toggle keyboard text input mode"
              >
                <Keyboard className="w-4 h-4" />
                <span className="hidden sm:inline">{useTextInput ? 'Voice Mode' : 'Type Mode'}</span>
              </button>
            </div>
          </div>

          {/* Main Candidate Response Box (Speech-to-Text or Text Input) */}
          {useTextInput ? (
            <div className="space-y-2">
              <textarea
                value={interviewState === 'candidate-followup' ? followUpResponse : liveCandidateTranscript}
                onChange={(e) => {
                  if (interviewState === 'candidate-followup') {
                    setFollowUpResponse(e.target.value);
                  } else {
                    setLiveCandidateTranscript(e.target.value);
                  }
                }}
                placeholder={interviewState === 'candidate-followup' ? "Type your response to the panel follow-up question here..." : "Type or dictate your clinical response here..."}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-teal-500 font-mono leading-relaxed"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Type directly or paste draft. Words will be scored identically against the rubric.</span>
                <button
                  type="button"
                  onClick={handleFillSampleAnswer}
                  className="text-teal-400 hover:underline font-semibold"
                >
                  Insert Sample Clinical Answer
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 sm:p-4 min-h-[90px] flex flex-col justify-between">
              <div className="text-xs sm:text-sm leading-relaxed text-slate-200 font-mono">
                {interviewState === 'candidate-followup' ? (
                  followUpResponse ? (
                    <span>{followUpResponse}</span>
                  ) : (
                    <span className="text-slate-500 italic">
                      [Speak into your microphone to answer the panel follow-up probe...]
                    </span>
                  )
                ) : liveCandidateTranscript ? (
                  <span>
                    {liveCandidateTranscript}
                    {interimTranscript && (
                      <span className="text-teal-400 italic"> {interimTranscript}</span>
                    )}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">
                    {interviewState === 'candidate-speaking'
                      ? "[Listening to Dr. Moore... Speak your answer into your microphone. Your words appear here in real-time]"
                      : "[Candidate response will transcribe here live when your speaking turn begins]"}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Real-time verbatim transcription active</span>
                  {silenceSeconds > 5 && (
                    <span className="text-amber-400 font-semibold animate-pulse">
                      · Silence: {silenceSeconds}s
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFillSampleAnswer}
                    className="text-teal-400 hover:underline font-semibold"
                  >
                    Quick-fill Sample Answer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Row inside Candidate Box */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  isMuted 
                    ? 'bg-rose-700 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-teal-400" />}
                <span>{isMuted ? 'Unmute Mic' : 'Mute Microphone'}</span>
              </button>

              <button
                onClick={handleRequestRepeat}
                disabled={repeatsRemaining <= 0 || isTtsSpeaking}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
                title="Repeat Question (Governed by Interview Rules)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
                <span>Repeat Question ({repeatsRemaining} left)</span>
              </button>
            </div>

            {/* Primary Submit Button */}
            <div>
              {interviewState === 'candidate-speaking' && (
                <button
                  onClick={handleSubmitMainAnswer}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Answer & Get Panel Follow-Up</span>
                </button>
              )}

              {interviewState === 'candidate-followup' && (
                <button
                  onClick={handleSubmitFollowUpAnswer}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Submit Follow-up & Complete Station</span>
                </button>
              )}

              {interviewState === 'station-completed' && (
                <button
                  onClick={handleNextStation}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  <span>Advance to Next Station →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Controls Toolbar: Pause, Technical Help, End Mock */}
      <div className={`px-4 sm:px-6 lg:px-8 py-3 border-t ${
        isIndustry ? 'bg-[#182332] border-[#223348]' : 'bg-slate-900 border-slate-850'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Audio Output Status */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-teal-400" />
              <span>British English AI Voice Active</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-[11px]">
              Assessor: <strong>{currentQuestion.speakerName}</strong>
            </span>
          </div>

          {/* Technical Help & Pause */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsTimerPaused(!isTimerPaused);
                if (!isTimerPaused) stopSpeaking();
                setInterviewState(isTimerPaused ? 'candidate-speaking' : 'paused-technical');
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition"
            >
              {isTimerPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isTimerPaused ? 'Resume Clock' : 'Technical Pause'}</span>
            </button>

            <button
              onClick={() => setShowHelpModal(true)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700"
              title="Technical Assistance"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* End Interview Button */}
            <button
              onClick={() => setShowEndModal(true)}
              className="px-4 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <PhoneOff className="w-3.5 h-3.5" />
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
                <span className="text-slate-400">Click "Type Mode" in the candidate box to switch to keyboard input, or check your browser microphone permissions.</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="font-bold text-white block">Cannot hear panel members?</span>
                <span className="text-slate-400">Ensure "Panel Voice ON" is active at the top right, and check that your speaker volume is turned up.</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="font-bold text-white block">Want to test quickly without talking?</span>
                <span className="text-slate-400">Click "Auto-Fill Response" or "Skip Audio & Answer Now" to jump directly through the states!</span>
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
