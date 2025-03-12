import './App.css';

import LinkedIn from './Components/LinkedIn.jsx';
import Form from './Components/Form.jsx';
import midProfileData from "./Profiles/midProfileData.jsx";
import highProfileData from "./Profiles/highProfileData.jsx";
import lowProfileData from "./Profiles/lowProfileData.jsx"; // Import low profile data

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MainApp = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeProfile, setActiveProfile] = useState(0);
  const [profileSequence, setProfileSequence] = useState([]);
  const [userQuality, setUserQuality] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || userData.user_id !== userId) {
      navigate('/login');
      return;
    }
    
    setUserQuality(userData.quality);
    generateProfileSequence(userData.quality);
  }, []);

  const generateProfileSequence = (quality) => {
    let sequence = [];
    const getRandomProfiles = (type, count) => {
      const source = type === 'high' ? highProfileData :
                     type === 'mid' ? midProfileData : lowProfileData;
      return [...source].sort(() => 0.5 - Math.random()).slice(0, count);
    };

    const getUniqueProfiles = (type, count) => {
      const source = type === 'high' ? highProfileData :
                     type === 'mid' ? midProfileData : lowProfileData;
      const shuffled = [...source].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    switch(quality) {
      case 1: // High quality
        sequence = [
          ...getUniqueProfiles('mid', 1),
          ...getUniqueProfiles('high', 6),
          ...getUniqueProfiles('mid', 1)
        ];
        break;
      case 2: // Mid quality
        sequence = getUniqueProfiles('mid', 8);
        break;
      case 3: // Low quality
        sequence = [
          ...getUniqueProfiles('mid', 1),
          ...getUniqueProfiles('low', 6),
          ...getUniqueProfiles('mid', 1)
        ];
        break;
      default:
        navigate('/login');
    }
    
    setProfileSequence(sequence);
  };

  const handleSubmissionSuccess = () => {
    if (activeProfile < profileSequence.length - 1) {
      setTimeout(() => setActiveProfile(prev => prev + 1), 2000);
    } else {
      alert('All profiles submitted!');
    }
  };

  if (!profileSequence.length) return <div>Loading profiles...</div>;

  return (
    <div className="App">
      <div className="profile-switcher">
        {profileSequence.map((_, index) => (
          <button
            key={index}
            className={`switch-btn ${index === activeProfile ? 'active' : ''}`}
            disabled
          >
            {index + 1}
          </button>
        ))}
      </div>
      
      <div className="split-view">
        <div className="left-pane">
          <LinkedIn profileData={profileSequence[activeProfile]} />
        </div>
        <div className="right-pane">
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