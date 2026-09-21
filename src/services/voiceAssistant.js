// RoundWise Voice & Audio Assistant Service
// Comprehensive Web Speech API (TTS & STT) + Web Audio API analyser & acoustic chimes

let activeUtterance = null;
let audioContextInstance = null;

function getAudioContext() {
  if (!audioContextInstance && typeof window !== 'undefined') {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioContextInstance = new AudioCtx();
    }
  }
  if (audioContextInstance && audioContextInstance.state === 'suspended') {
    audioContextInstance.resume().catch(() => {});
  }
  return audioContextInstance;
}

// 1. ACOUSTIC TONE GENERATOR (Web Audio API Synthesizer - Zero Network Latency)
export function playChime(type = 'turn') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'turn') {
      // Gentle 2-tone chime: candidate's turn to speak (D5 -> A5)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.14);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'complete') {
      // Warm chord: station finished
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc.start(now);
      osc.stop(now + 0.75);
    } else if (type === 'warn') {
      // Soft single warning tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440.00, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (err) {
    console.warn('[RoundWise Audio Chime Warning]', err);
  }
}

// 2. TEXT-TO-SPEECH (Browser SpeechSynthesis with British Voice Matching)
export function speakQuestion(text, options = {}) {
  const {
    voiceGender = 'female', // 'female' or 'male'
    rate = 0.98,
    pitch = 1.0,
    volume = 1.0,
    onStart = () => {},
    onEnd = () => {},
    onError = () => {}
  } = options;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[RoundWise TTS] speechSynthesis not supported in this browser.');
    setTimeout(() => onEnd(), 1000);
    return { stop: () => {} };
  }

  // Cancel any running speech
  window.speechSynthesis.cancel();

  // Strip non-spoken markdown or quotation formatting
  const cleanText = text
    .replace(/^["“]|["”]$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  // Find best available British English voice
  const findBritishVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prefer British English voices (en-GB)
    const gbVoices = voices.filter(v => 
      v.lang === 'en-GB' || 
      v.lang === 'en_GB' || 
      v.name.includes('United Kingdom') || 
      v.name.includes('British') || 
      v.name.includes('UK')
    );

    if (gbVoices.length > 0) {
      if (voiceGender === 'male') {
        const maleVoice = gbVoices.find(v => 
          v.name.toLowerCase().includes('male') || 
          v.name.toLowerCase().includes('george') || 
          v.name.toLowerCase().includes('oliver') ||
          v.name.toLowerCase().includes('arthur')
        );
        return maleVoice || gbVoices[0];
      } else {
        const femaleVoice = gbVoices.find(v => 
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('hazel') || 
          v.name.toLowerCase().includes('victoria') ||
          v.name.toLowerCase().includes('susan')
        );
        return femaleVoice || gbVoices[0];
      }
    }

    // Fallback: any English voice
    const anyEn = voices.find(v => v.lang.startsWith('en'));
    return anyEn || voices[0];
  };

  const assignVoiceAndSpeak = () => {
    const selectedVoice = findBritishVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      onEnd();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      // Don't treat user-initiated cancel as an error
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        onError(e);
      }
      onEnd();
    };

    // Store reference to avoid GC drop in Chrome
    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    assignVoiceAndSpeak();
  } else {
    // Voices may load asynchronously in Chrome
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      assignVoiceAndSpeak();
    };
    // Timeout fallback if onvoiceschanged doesn't fire
    setTimeout(() => {
      if (!activeUtterance) assignVoiceAndSpeak();
    }, 250);
  }

  return {
    stop: () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      activeUtterance = null;
    }
  };
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  activeUtterance = null;
}

// 3. SPEECH-TO-TEXT (Web Speech API Recognition)
export function createSpeechRecognizer(handlers = {}) {
  const {
    onInterim = () => {},
    onFinal = () => {},
    onError = () => {},
    onStatusChange = () => {}
  } = handlers;

  if (typeof window === 'undefined') {
    return { isSupported: false, start: () => {}, stop: () => {} };
  }

  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionClass) {
    return { isSupported: false, start: () => {}, stop: () => {} };
  }

  let recognition = null;
  let isListening = false;
  let manuallyStopped = false;

  const initRecognizer = () => {
    recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-GB';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      onStatusChange({ isListening: true });
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          onFinal(transcriptChunk.trim());
        } else {
          interim += transcriptChunk;
        }
      }
      if (interim) {
        onInterim(interim);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // Silence is expected during thought pauses; don't trigger fatal error
        return;
      }
      if (event.error === 'not-allowed') {
        onError(new Error('Microphone permission was denied. You can still type your answers below!'));
      } else {
        onError(event);
      }
    };

    recognition.onend = () => {
      isListening = false;
      onStatusChange({ isListening: false });
      // If candidate is still in answering mode and did not manually stop, resume listening
      if (!manuallyStopped) {
        try {
          recognition.start();
        } catch (e) {
          // Ignore if already active
        }
      }
    };
  };

  initRecognizer();

  return {
    isSupported: true,
    start: () => {
      manuallyStopped = false;
      try {
        if (recognition) {
          recognition.start();
        }
      } catch (err) {
        // Ignore InvalidStateError if already started
      }
    },
    stop: () => {
      manuallyStopped = true;
      try {
        if (recognition) {
          recognition.stop();
        }
      } catch (err) {}
    }
  };
}

// 4. REAL MICROPHONE AUDIO ANALYSER (Feeds Volume Decibels to MicMeter & AudioWave)
export async function startAudioMeter(onLevelChange) {
  if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
    return { stream: null, stop: () => {} };
  }

  let stream = null;
  let animationId = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ctx = getAudioContext();
    if (!ctx) return { stream, stop: () => {} };

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.5;

    const source = ctx.createMediaStreamSource(stream);
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      // Map 0 - 255 to 0 - 100 with slight amplification for natural speech
      const level = Math.min(100, Math.round((average / 128) * 100));
      onLevelChange(level);
      animationId = requestAnimationFrame(tick);
    };

    tick();

    return {
      stream,
      stop: () => {
        if (animationId) cancelAnimationFrame(animationId);
        if (stream) {
          stream.getTracks().forEach(t => t.stop());
        }
        try {
          source.disconnect();
          analyser.disconnect();
        } catch (e) {}
      }
    };
  } catch (err) {
    console.warn('[RoundWise Audio Meter] Could not initialize mic analyser:', err.message);
    return { stream: null, stop: () => {} };
  }
}
