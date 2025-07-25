import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (!username || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    try {
      // Simulate a 6 second spinner
      await new Promise(res => setTimeout(res, 6000));
      await axiosInstance.post('/api/auth/register', { username, email, password });
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="auth-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="auth-input"
        />
        <button className="auth-btn" type="submit" disabled={loading}>Register</button>
        {loading && <div className="spinner spinner-green"></div>}
        <p className="auth-link">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register; 