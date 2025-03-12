import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: passkey.trim() }),
      });

      if (!response.ok) throw new Error('Invalid passkey');
      
      const result = await response.json();
      localStorage.setItem('userData', JSON.stringify(result.user));
      navigate(`/app/${result.user.user_id}`);
      
    } catch (err) {
      setError('Invalid passkey. Please check and try again.');
    }
  };

  return (
    <div className="landing-container">
      <header className="university-header">
        <img 
          src="https://i.ibb.co/m5p48GLj/tamucc-logo-2c-horz.jpg" 
          alt="TAMU-CC College of Business" 
          className="logo"
        />
        <h1>Business Professionalism Study</h1>
      </header>

      <main className="content">
        <div className="hero-card">
          <div className="decorative-bar"></div>
          <h2>Earn Extra Credit While Contributing to Research</h2>
          <p className="highlight">
            Participate in a Texas A&M University-Corpus Christi College of Business study 
            on professional networking practices.
          </p>
          
          <form onSubmit={handleLogin} className="passkey-form">
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter Lab Passkey"
              className="passkey-input"
            />
            <button type="submit" className="submit-btn">
              Begin Study
            </button>
          </form>
          
          {error && <p className="error">{error}</p>}

          <div className="info-grid">
            <div className="info-item">
              <div className="icon">⏱️</div>
              <p>Quick Session</p>
            </div>
            <div className="info-item">
              <div className="icon">🔒</div>
              <p>Confidential</p>
            </div>
            <div className="info-item">
              <div className="icon">🎓</div>
              <p>Extra Credit</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Texas A&M University-Corpus Christi College of Business</p>
        <p>6300 Ocean Dr, Corpus Christi, TX 78412</p>
      </footer>
    </div>
  );
};

export default Login;