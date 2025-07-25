import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  return (
    <nav className="navbar">
      <div className="navbar-logo">MERN App</div>
      <div className="navbar-links">
        {token && <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Dashboard</NavLink>}
        {!token && <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Login</NavLink>}
        {!token && <NavLink to="/register" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Register</NavLink>}
      </div>
    </nav>
  );
  
};

export default Navbar; 