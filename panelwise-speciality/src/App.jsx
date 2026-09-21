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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    textSize: 'normal', // 'normal', 'large', 'xl'
    reducedMotion: false,
    captions: true
  });

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
    accessibilitySettings.reducedMotion ? 'accessibility-reduced-motion' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`min-h-screen flex flex-col ${a11yClass}`}>
      {/* Header with Navigation and Screen Switcher */}
      <Header
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        accessibilitySettings={accessibilitySettings}
        setAccessibilitySettings={setAccessibilitySettings}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <LandingView setCurrentScreen={setCurrentScreen} isMobileMode={false} />
        )}
        {currentScreen === 'landing-mobile' && (
          <LandingView setCurrentScreen={setCurrentScreen} isMobileMode={true} />
        )}
        {currentScreen === 'pricing' && (
          <PricingView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'checkout' && (
          <CheckoutView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'setup' && (
          <SpecialtySetupView 
            setCurrentScreen={setCurrentScreen} 
            setupData={setupData} 
            setSetupData={setSetupData} 
          />
        )}
        {currentScreen === 'cv-upload' && (
          <CvUploadView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'cv-review' && (
          <CvFactReviewView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'device-check' && (
          <DeviceCheckView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'waiting-room' && (
          <WaitingRoomView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'live-interview' && (
          <LiveInterviewView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'results' && (
          <ResultsOverviewView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'question-review' && (
          <QuestionReviewView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'user-dashboard' && (
          <UserDashboardView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'admin' && (
          <AdminDashboardView setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'design-system' && (
          <DesignSystemView />
        )}
      </main>

      {/* Persistent Compliance Footer (suppressed only during live voice exam for immersion) */}
      {currentScreen !== 'live-interview' && (
        <Footer setCurrentScreen={setCurrentScreen} />
      )}
    </div>
  );
}
