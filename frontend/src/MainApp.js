import "./App.css";
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LinkedIn from './Components/LinkedIn.jsx';
import neutralProfileData from "./Profiles/neutralProfileData.jsx";
import upwardAssimilationProfileData from "./Profiles/upwardAssimilationProfileData.jsx";
import upwardContrastProfileData from "./Profiles/upwardContrastProfileData.jsx";
import downwardContrastProfileData from "./Profiles/downwardContrastProfileData.jsx";
import downwardAssimilationProfileData from "./Profiles/downwardAssimilationProfileData.jsx";

const InitialQualtricsSurvey = ({ userId, onStart }) => {
  const anum = localStorage.getItem("anum");
  const surveyUrl = `https://tamucc.co1.qualtrics.com/jfe/form/SV_cH2qf6ZW5XHUp9A?userId=${userId}&anum=${anum}`;
  const [surveyComplete, setSurveyComplete] = useState(false);

  // Listen for Qualtrics End-of-Survey postMessage
  useEffect(() => {
    const handleMessage = (e) => {
      if (
        e.origin.includes("qualtrics.com") &&
        typeof e.data === "string" &&
        e.data.includes("QualtricsEOS")
      ) {
        setSurveyComplete(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <div className="nav">
        {!surveyComplete ? (
          <button className="start-button disabled" disabled>
            Please complete the survey
          </button>
        ) : (
          <button className="start-button active" onClick={onStart}>
            Click here to continue
          </button>
        )}
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

/* 
// 🔒 Paused: Second survey form logic (profile-based Qualtrics survey)
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
*/

const MainApp = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [showInitialSurvey, setShowInitialSurvey] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || userData.user_id !== userId) {
      navigate('/login');
      return;
    }
  }, [userId, navigate]);

  if (showInitialSurvey) {
    return (
      <InitialQualtricsSurvey
        userId={userId}
        onStart={() => {
          // End survey after first form
          navigate(`/thank-you/${userId}`, { replace: true });
        }}
      />
    );
  }

  return <div>Loading...</div>;
};

export default MainApp;
