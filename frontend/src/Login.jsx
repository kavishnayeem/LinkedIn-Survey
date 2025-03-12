import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'


const Login = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const cleanUserId = userId.trim().toLowerCase();
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: cleanUserId }),
      });
  
      if (!response.ok) {
        throw new Error(`Invalid credentials`);
      }
      console.log(response);
      const result = await response.json();
    
      if (result.valid) {
        localStorage.setItem('valid', "true");
        localStorage.setItem('userData', JSON.stringify(result.user));
        localStorage.setItem('quality', result.user.quality);
        navigate(`/app/${result.user.user_id}`, { 
          replace: true,
          state: { user: result.user } 
        });
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
      localStorage.removeItem('valid');
      localStorage.removeItem('userData');
      localStorage.removeItem('quality');
    }
  };
  return (
    <div className="login-container">
      <h2>Professional Profile Evaluation</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your User ID"
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;