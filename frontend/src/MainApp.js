import "./App.css";
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LinkedIn from './Components/LinkedIn.jsx';
import neutralProfileData from "./Profiles/neutralProfileData.jsx";
import upwardAssimilationProfileData from "./Profiles/upwardAssimilationProfileData.jsx"
import upwardContrastProfileData from "./Profiles/upwardContrastProfileData.jsx";
import downwardContrastProfileData from "./Profiles/downwardContrastProfileData.jsx";
import downwardAssimilationProfileData from "./Profiles/downwardAssimilationProfileData.jsx";

const InitialQualtricsSurvey = ({ userId, onStart, initialCountdown = 30 }) => {
  const surveyUrl = `https://tamucc.co1.qualtrics.com/jfe/form/SV_cH2qf6ZW5XHUp9A?userId=${userId}`;
  const [timerActive, setTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(initialCountdown);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer(initialCountdown);
    return () => clearInterval(timerRef.current);
  }, [initialCountdown]);

  const startTimer = (seconds) => {
    setTimerActive(false);
    setCountdown(seconds);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setTimerActive(true);
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <>
    <div className="nav">
      <button
        className={`start-button ${timerActive ? 'active' : 'disabled'}`}
        onClick={onStart}
        disabled={!timerActive}
      >
        {timerActive ? 'Click here after submitting the form' : `Start in ${countdown}s`}
      </button>
      </div>
    <div className="qualtrics-container" style={{ height: '100vh' }}>
      
      <iframe
        title="Initial Qualtrics Survey"
        src={surveyUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        key={`${userId}-initial`}
      />

    </div>
    </>
  );
};

const QualtricsSurvey = ({ profileData, userId }) => {
  const surveyUrl = `https://tamucc.co1.qualtrics.com/jfe/form/SV_9mn36Q92rz50SRo?userId=${userId}&profileId=${profileData.id}`;
  
  return (
    <div className="qualtrics-container" style={{ height: '100vh' }}>
      <iframe
        title="Qualtrics Survey"
        src={surveyUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        key={`${userId}-${profileData.id}`}
      />
    </div>
  );
};

const MainApp = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const leftPaneRef = useRef(null);
  const [activeProfile, setActiveProfile] = useState(() => {
    const storedActiveProfile = sessionStorage.getItem('activeProfile');
    return storedActiveProfile ? parseInt(storedActiveProfile) : 0;
  });
  const [profileSequence, setProfileSequence] = useState(() => {
    const storedSequence = sessionStorage.getItem('profileSequence');
    return storedSequence ? JSON.parse(storedSequence) : [];
  });
  const [showInitialSurvey, setShowInitialSurvey] = useState(true);
  const [nextTimerActive, setNextTimerActive] = useState(false);
  const [nextCountdown, setNextCountdown] = useState(30);
  const nextTimerRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || userData.user_id !== userId) {
      navigate('/login');
      return;
    }
    
    if (profileSequence.length === 0) {
      generateProfileSequence(userData.quality);
    }
  }, []);

  const startNextTimer = (seconds) => {
    setNextTimerActive(false);
    setNextCountdown(seconds);
    clearInterval(nextTimerRef.current);

    nextTimerRef.current = setInterval(() => {
      setNextCountdown(prev => {
        if (prev <= 1) {
          setNextTimerActive(true);
          clearInterval(nextTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!showInitialSurvey && profileSequence.length > 0) {
      startNextTimer(0);
    }
    return () => clearInterval(nextTimerRef.current);
  }, [showInitialSurvey, profileSequence.length]);

  const generateProfileSequence = (quality) => {
    let sequence = [];
    const getUniqueProfiles = (type, count) => {
      let source;
      switch (type) {
        case 'upward assimilation':
          source = upwardAssimilationProfileData;
          break;
        case 'contrast':
          source = upwardContrastProfileData;
          break;
        case 'neutral':
          source = neutralProfileData;
          break;
        case 'downward assimilation':
          source = downwardAssimilationProfileData;
          break;
        case 'downward contrast':
          source = downwardContrastProfileData;
          break;
        default:
          source = neutralProfileData; // Default to neutral if quality is not recognized
      }
      const shuffled = [...source].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    sequence = getUniqueProfiles(quality === 1 ? 'upward assimilation' : 
                                 quality === 2 ? 'contrast' : 
                                 quality === 3 ? 'neutral' : 
                                 quality === 4 ? 'downward assimilation' : 
                                 quality === 5 ? 'downward contrast' : 'neutral', 8);
    
    setProfileSequence(sequence);
    sessionStorage.setItem('profileSequence', JSON.stringify(sequence));
  };

  const handleNextProfile = () => {
    if (activeProfile < profileSequence.length - 1) {
      setActiveProfile(prev => {
        const newProfile = prev + 1;
        sessionStorage.setItem('activeProfile', newProfile);
        startNextTimer(0);
        // Scroll both panes back to top
        if (leftPaneRef.current) {
          leftPaneRef.current.scrollTop = 0;
        }
        window.scrollTo(0, 0);
        return newProfile;
      });
    } else {
      sessionStorage.removeItem('profileSequence');
      sessionStorage.removeItem('activeProfile');
      navigate(`/thank-you/${userId}`, { replace: true });
    }
  };

  if (showInitialSurvey) {
    return <InitialQualtricsSurvey userId={userId} onStart={() => setShowInitialSurvey(false)} initialCountdown={0} />;
  }

  if (!profileSequence.length) {
    return <div className="loading">Loading profiles...</div>;
  }

  return (
    <div className="App">
      <div className="progress-container">
        <div className="progress-indicator">
          {profileSequence.map((_, index) => (
            <div 
              key={index}
              className={`progress-dot ${
                index < activeProfile ? 'completed' : 
                index === activeProfile ? 'current' : ''
              }`}
            />
          ))}
        </div>
        
        <button 
          className={`next-button ${nextTimerActive ? 'active' : 'disabled'}`}
          onClick={handleNextProfile}
          disabled={!nextTimerActive}
        >
          {nextTimerActive 
            ? (activeProfile < profileSequence.length - 1 ? 'Next Profile' : 'Finish')
            : `Next in ${nextCountdown}s`
          }
        </button>
      </div>
      
      <div className="split-view">
        <div className="left-pane" ref={leftPaneRef}>
          <LinkedIn profileData={profileSequence[activeProfile]} />
        </div>
        <div className="right-pane">
          <QualtricsSurvey 
            profileData={profileSequence[activeProfile]} 
            userId={userId} 
          />
        </div>
      </div>
    </div>
  );
};

export default MainApp;