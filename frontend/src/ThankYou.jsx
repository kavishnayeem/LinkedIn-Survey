import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();
  const { userId } = useParams();


  return (
    <div className="thank-you-container" style={{ height: '100vh' }}>
      <p>✅ Thank you for completing the survey!</p>
      <p>Your responses have been recorded.</p>

      {/*
      🔒 Paused: Third Qualtrics survey form
      const anum = localStorage.getItem('anum');
      const surveyUrl = `https://tamucc.co1.qualtrics.com/jfe/form/SV_bDubTHdi96CCJWm?userId=${userId}&anum=${anum}`;
      <iframe
        title="Qualtrics Survey"
        src={surveyUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        key={`${userId}`}
      />
      */}
    </div>
  );
};

export default ThankYou;
