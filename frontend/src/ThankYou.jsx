import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('valid');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="checkmark">✓</div>
        <h1>Thank You for Participating!</h1>
        <p>Your responses have been recorded successfully.</p>
        <p>We appreciate your time and valuable feedback.</p>
        <button onClick={handleLogout} className="logout-button">
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default ThankYou;