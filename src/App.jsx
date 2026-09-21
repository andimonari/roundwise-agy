import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import LandingView from './views/LandingView';
import PricingView from './views/PricingView';
import CheckoutView from './views/CheckoutView';
import SpecialtySetupView from './views/SpecialtySetupView';
import CvUploadView from './views/CvUploadView';
import CvFactReviewView from './views/CvFactReviewView';
import DeviceCheckView from './views/DeviceCheckView';
import WaitingRoomView from './views/WaitingRoomView';
import LiveInterviewView from './views/LiveInterviewView';
import ResultsOverviewView from './views/ResultsOverviewView';
import QuestionReviewView from './views/QuestionReviewView';
import UserDashboardView from './views/UserDashboardView';
import AdminDashboardView from './views/AdminDashboardView';
import DesignSystemView from './views/DesignSystemView';
import DesignComparisonView from './views/DesignComparisonView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  
  // Design System Mode: 'industry' (Handoff Blueprint) or 'healthcare' (Classic Slate/Teal)
  const [designMode, setDesignMode] = useState('industry');

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    textSize: 'normal', // 'normal', 'large', 'xl'
    reducedMotion: false,
    captions: true
  });

  const [candidateSessionResponses, setCandidateSessionResponses] = useState({});

  const [setupData, setSetupData] = useState({
    specialtyId: 'imt',
    specialtyName: 'Internal Medicine Training (IMT)',
    pathway: 'ST1 / CT1 Round 1 (National)',
    interviewDate: '2026-11-15',
    experienceLevel: 'Foundation Doctor FY2',
    interviewType: 'full-circuit',
    length: 'standard',
    panelConfig: 'three-member',
    extraThinkingTime: false
  });

  // Calculate accessibility CSS classes
  const a11yClass = [
    accessibilitySettings.highContrast ? 'accessibility-high-contrast' : '',
    accessibilitySettings.textSize === 'large' ? 'accessibility-text-lg' : '',
    accessibilitySettings.textSize === 'xl' ? 'accessibility-text-xl' : '',
    accessibilitySettings.reducedMotion ? 'accessibility-reduced-motion' : '',
    designMode === 'industry' ? 'theme-industry' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${a11yClass}`}>
      {/* Header with Navigation, Screen Switcher & Design Mode Toggle */}
      <Header
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        accessibilitySettings={accessibilitySettings}
        setAccessibilitySettings={setAccessibilitySettings}
        designMode={designMode}
        setDesignMode={setDesignMode}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <LandingView 
            setCurrentScreen={setCurrentScreen} 
            isMobileMode={false} 
            designMode={designMode} 
          />
        )}
        {currentScreen === 'landing-mobile' && (
          <LandingView 
            setCurrentScreen={setCurrentScreen} 
            isMobileMode={true} 
            designMode={designMode} 
          />
        )}
        {currentScreen === 'pricing' && (
          <PricingView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'checkout' && (
          <CheckoutView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'setup' && (
          <SpecialtySetupView 
            setCurrentScreen={setCurrentScreen} 
            setupData={setupData} 
            setSetupData={setSetupData} 
            designMode={designMode} 
          />
        )}
        {currentScreen === 'cv-upload' && (
          <CvUploadView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'cv-review' && (
          <CvFactReviewView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'device-check' && (
          <DeviceCheckView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'waiting-room' && (
          <WaitingRoomView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'live-interview' && (
          <LiveInterviewView 
            setCurrentScreen={setCurrentScreen} 
            designMode={designMode} 
            candidateSessionResponses={candidateSessionResponses}
            setCandidateSessionResponses={setCandidateSessionResponses}
          />
        )}
        {currentScreen === 'results' && (
          <ResultsOverviewView 
            setCurrentScreen={setCurrentScreen} 
            designMode={designMode} 
            candidateSessionResponses={candidateSessionResponses}
          />
        )}
        {currentScreen === 'question-review' && (
          <QuestionReviewView 
            setCurrentScreen={setCurrentScreen} 
            designMode={designMode} 
            candidateSessionResponses={candidateSessionResponses}
          />
        )}
        {currentScreen === 'user-dashboard' && (
          <UserDashboardView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'admin' && (
          <AdminDashboardView setCurrentScreen={setCurrentScreen} designMode={designMode} />
        )}
        {currentScreen === 'design-system' && (
          <DesignSystemView designMode={designMode} />
        )}
        {currentScreen === 'design-comparison' && (
          <DesignComparisonView 
            designMode={designMode} 
            setDesignMode={setDesignMode} 
            setCurrentScreen={setCurrentScreen} 
          />
        )}
      </main>

      {/* Persistent Compliance Footer (suppressed only during live voice exam for immersion) */}
      {currentScreen !== 'live-interview' && (
        <Footer setCurrentScreen={setCurrentScreen} designMode={designMode} />
      )}
    </div>
  );
}
