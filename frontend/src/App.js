import './App.css';
import { useState } from 'react';
import LinkedIn from './Components/LinkedIn';
import Form from './Components/Form.jsx';
import midProfileData from "./Profiles/midProfileData.jsx";
import highProfileData from "./Profiles/highProfileData.jsx";
import lowProfileData from "./Profiles/lowProfileData.jsx"; // Import low profile data

function App() {
  const [activeProfile, setActiveProfile] = useState(0);
  const [profileData, setProfileData] = useState(null); // Start with no profile selected

  return (
    <div className="App">
      <div className="profile-switcher">
        {!profileData ? (
          // Show profile type selector initially
          <>
            <button
              onClick={() => {
                setProfileData(lowProfileData); // Add low profile data option
                setActiveProfile(0);
              }}
              className="switch-btn"
            >
              Low Profiles
            </button>
            <button
              onClick={() => {
                setProfileData(midProfileData);
                setActiveProfile(0);
              }}
              className="switch-btn"
            >
              Mid Profiles
            </button>
            <button
              onClick={() => {
                setProfileData(highProfileData);
                setActiveProfile(0);
              }}
              className="switch-btn"
            >
              High Profiles
            </button>

          </>
        ) : (
          // Show profile numbers after type selection
          profileData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProfile(index)}
              className={`switch-btn ${index === activeProfile ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))
        )}
      </div>
      
      {profileData && (
        <div className="split-view">
          <div className="left-pane">
            <LinkedIn profileData={profileData[activeProfile]} />
          </div>
          <div className="right-pane">
            <Form activeProfile={activeProfile} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;