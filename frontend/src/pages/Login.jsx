import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    try {
      // Simulate a 6 second spinner
      await new Promise(res => setTimeout(res, 6000));
      const res = await axiosInstance.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="auth-error">{error}</div>}
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
        <button className="auth-btn" type="submit" disabled={loading}>Login</button>
        {loading && <div className="spinner spinner-green"></div>}
        <p className="auth-link">Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default Login; 