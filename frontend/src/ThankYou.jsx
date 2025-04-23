import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const surveyUrl = `https://tamucc.co1.qualtrics.com/jfe/form/SV_bDubTHdi96CCJWm?userId=${userId}`;

  const handleLogout = () => {
    localStorage.removeItem('valid');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="thank-you-container" style={{ height: '100vh' }}>
      <iframe
        title="Qualtrics Survey"
        src={surveyUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        key={`${userId}`}
      />
    </div>
  );
};

export default ThankYou;