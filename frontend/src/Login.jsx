import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from './Users/Users.jsx';
import './Login.css';

const Login = () => {
  const [passkey, setPasskey] = useState('');
  const [anum, setAnum] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const cleanPasskey = passkey.trim();
      const cleanAnum = anum.trim();
      const cleanName = name.trim();

      if (!cleanPasskey) throw new Error('Please enter a passkey');
      if (!cleanAnum) throw new Error('Please enter your A-number');
      if (!cleanName) throw new Error('Please enter your name');

      const user = users.find(u => u.user_id === cleanPasskey);
      if (!user) throw new Error('No user found with this passkey');

      localStorage.setItem('valid', 'true');
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('quality', user.quality.toString());
      localStorage.setItem('anum', cleanAnum);
      localStorage.setItem('name', cleanName);

      navigate(`/app/${user.user_id}`);
    } catch (err) {
      setError(`Access denied: ${err.message}`);
    } finally {
      setIsLoading(false);
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
          <h2>Enter Lab Passkey, A-number, and Name</h2>

          <form onSubmit={handleLogin} className="passkey-form">
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter Lab Passkey"
              className="passkey-input"
              disabled={isLoading}
            />
            <input
              type="text"
              value={anum}
              onChange={(e) => setAnum(e.target.value)}
              placeholder="Enter your A-number"
              className="passkey-input"
              disabled={isLoading}
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="passkey-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Begin Study'}
            </button>
          </form>
          
          {error && <p className="error-message">{error}</p>}
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
