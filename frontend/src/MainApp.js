import "./App.css";
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LinkedIn from './Components/LinkedIn.jsx';
import neutralProfileData from "./Profiles/neutralProfileData.jsx";
import upwardAssimilationProfileData from "./Profiles/upwardAssimilationProfileData.jsx";
import upwardContrastProfileData from "./Profiles/upwardContrastProfileData.jsx";
import downwardContrastProfileData from "./Profiles/downwardContrastProfileData.jsx";
import downwardAssimilationProfileData from "./Profiles/downwardAssimilationProfileData.jsx";

const QualtricsSurvey = ({ profileData, userId, onSurveyComplete }) => {
  const anum = localStorage.getItem('anum'); 
  const surveyUrl = `https://tamucc.co1.qualtrics.com/jfe/form/SV_9mn36Q92rz50SRo?userId=${userId}&profileId=${profileData.id}&anum=${anum}`;

  useEffect(() => {
    const handleMessage = (e) => {
      if (
        e.origin.includes("qualtrics.com") &&
        typeof e.data === "string" &&
        e.data.includes("QualtricsEOS")
      ) {
        onSurveyComplete(); 
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSurveyComplete]);

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

  const [canProceed, setCanProceed] = useState(false);

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
          source = neutralProfileData;
      }
      const shuffled = [...source].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    sequence = getUniqueProfiles(
      quality === 1 ? 'upward assimilation' :
      quality === 2 ? 'contrast' :
      quality === 3 ? 'neutral' :
      quality === 4 ? 'downward assimilation' :
      quality === 5 ? 'downward contrast' : 'neutral',
      12
    );

    setProfileSequence(sequence);
    sessionStorage.setItem('profileSequence', JSON.stringify(sequence));
  };

  const handleNextProfile = () => {
    if (activeProfile < profileSequence.length - 1) {
      setActiveProfile(prev => {
        const newProfile = prev + 1;
        sessionStorage.setItem('activeProfile', newProfile);
        setCanProceed(false);

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
          className={`next-button ${canProceed ? 'active' : 'disabled'}`}
          onClick={handleNextProfile}
          disabled={!canProceed}
        >
          {activeProfile < profileSequence.length - 1 ? 'Next Profile' : 'Finish'}
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
            onSurveyComplete={() => setCanProceed(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
