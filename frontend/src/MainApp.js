import "./App.css";
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LinkedIn from './Components/LinkedIn.jsx';
import Form from './Components/Form.jsx';
import midProfileData from "./Profiles/midProfileData.jsx";
import highProfileData from "./Profiles/highProfileData.jsx";
import lowProfileData from "./Profiles/lowProfileData.jsx";

const MainApp = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const leftPaneRef = useRef(null);
  const rightPaneRef = useRef(null);
  const [activeProfile, setActiveProfile] = useState(() => {
    const storedActiveProfile = sessionStorage.getItem('activeProfile');
    return storedActiveProfile ? parseInt(storedActiveProfile) : 0;
  });
  const [profileSequence, setProfileSequence] = useState(() => {
    const storedSequence = sessionStorage.getItem('profileSequence');
    return storedSequence ? JSON.parse(storedSequence) : [];
  });
  const [userQuality, setUserQuality] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || userData.user_id !== userId) {
      navigate('/login');
      return;
    }
    
    setUserQuality(userData.quality);
    
    if (profileSequence.length === 0) {
      generateProfileSequence(userData.quality);
    } else {
      const storedActiveProfile = sessionStorage.getItem('activeProfile');
      if (storedActiveProfile) {
        setActiveProfile(parseInt(storedActiveProfile));
      }
    }
  }, []);

  const generateProfileSequence = (quality) => {
    let sequence = [];
    const getUniqueProfiles = (type, count) => {
      const source = type === 'high' ? highProfileData :
                     type === 'mid' ? midProfileData : lowProfileData;
      const shuffled = [...source].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    switch(quality) {
      case 1:
        sequence = [...getUniqueProfiles('mid', 1), ...getUniqueProfiles('high', 6), ...getUniqueProfiles('mid', 1)];
        break;
      case 2:
        sequence = getUniqueProfiles('mid', 8);
        break;
      case 3:
        sequence = [...getUniqueProfiles('mid', 1), ...getUniqueProfiles('low', 6), ...getUniqueProfiles('mid', 1)];
        break;
      default:
        navigate('/login');
    }
    
    setProfileSequence(sequence);
    sessionStorage.setItem('profileSequence', JSON.stringify(sequence));
  };

  const scrollToTop = () => {
    leftPaneRef.current?.scrollTo(0, 0);
    rightPaneRef.current?.scrollTo(0, 0);
  };

  const handleSubmissionSuccess = () => {
    if (activeProfile < profileSequence.length - 1) {
      setTimeout(() => {
        setActiveProfile(prev => {
          const newProfile = prev + 1;
          sessionStorage.setItem('activeProfile', newProfile);
          scrollToTop();
          return newProfile;
        });
      }, 500);
    } else {
      sessionStorage.removeItem('profileSequence');
      sessionStorage.removeItem('activeProfile');
      navigate('/thank-you', { replace: true });
    }
  };

  if (!profileSequence.length) return <div className="loading">Loading profiles...</div>;

  return (
    <div className="App">
      <div className="progress-indicator">
        {profileSequence.map((_, index) => (
          <div 
            key={index}
            className={`progress-dot ${
              index < activeProfile ? 'completed' : 
              index === activeProfile ? 'current' : ''
            }`}
          >
            {index < activeProfile }
          </div>
        ))}
      </div>
      
      <div className="split-view">
        <div className="left-pane" ref={leftPaneRef}>
          <LinkedIn profileData={profileSequence[activeProfile]} />
        </div>
        <div className="right-pane" ref={rightPaneRef}>
          <Form 
            profileData={profileSequence[activeProfile]}
            onSubmitSuccess={handleSubmissionSuccess}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default MainApp;