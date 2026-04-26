import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase';
import axios from 'axios';
import './App.css';

// --- CEO DASHBOARD ---
const CEODashboard = () => (
  <div
    style={{
      padding: '30px',
      borderRadius: '15px',
      border: '2px solid #ff4d4d',
      marginTop: '20px'
    }}
  >
    <h2 className="dashboard-title ceo">CEO View</h2>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px',
        marginTop: '20px'
      }}
    >
      <div className="card" style={cardStyle}>
        <h4>Revenue</h4>
        <p>$4.2M (+12%)</p>
      </div>

      <div className="card" style={cardStyle}>
        <h4>Growth</h4>
        <p>24% YoY</p>
      </div>

      <div className="card" style={cardStyle}>
        <h4>M&A Pipeline</h4>
        <p>3 Active Deals</p>
      </div>
    </div>

    <button
      className="generate-btn"
      style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
    >
      Generate Annual Report
    </button>
  </div>
);

// --- MANAGER PANEL ---
const ManagerPanel = () => (
  <div
    style={{
      padding: '30px',
      borderRadius: '15px',
      border: '2px solid #007bff',
      marginTop: '20px'
    }}
  >
    <h2 className="dashboard-title manager">Manager View</h2>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginTop: '20px'
      }}
    >
      <div className="card" style={cardStyle}>
        <h4>👥 Team Capacity</h4>
        <p>85% Utilized</p>
      </div>

      <div className="card" style={cardStyle}>
        <h4>⏳ Pending Approvals</h4>
        <p>4 Time-off Requests</p>
      </div>
    </div>

    <div style={{ textAlign: 'left', marginTop: '20px' }}>
      <h4>Current Projects:</h4>
      <ul>
        <li>Project Alpha (Due: Friday)</li>
        <li>Beta Testing Phase II</li>
      </ul>
    </div>
  </div>
);

// --- EMPLOYEE VIEW ---
const EmployeeView = () => (
  <div
    style={{
      padding: '30px',
      borderRadius: '15px',
      border: '2px solid #28a745',
      marginTop: '20px'
    }}
  >
    <h2 className="dashboard-title employee">Employee View</h2>

    <div style={{ textAlign: 'left' }}>
      <h4>My Daily Tasks:</h4>

      <div
        className="card"
        style={{ ...cardStyle, marginBottom: '10px' }}
      >
        ✅ Update documentation for API
      </div>

      <div
        className="card"
        style={{ ...cardStyle, marginBottom: '10px' }}
      >
        ⬜️ Sync with lead developer at 3PM
      </div>

      <div
        className="card"
        style={{ ...cardStyle, marginBottom: '10px' }}
      >
        ⬜️ Finalize CSS for Dashboard
      </div>
    </div>

    <button
      style={{
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px'
      }}
    >
      Submit Daily Report
    </button>
  </div>
);

// Shared Style for Cards
const cardStyle = {
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: '1px solid #eee'
};

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      console.log(result.user.uid);

      const token = await result.user.getIdToken();

      const response = await axios.post(
        'http://127.0.0.1:8000/api/get-role/',
        { token: token }
      );

      setRole(response.data.role);
    } catch (error) {
      console.error('Login or Role Check failed:', error);
      alert('Check the console - Django might be blocked!');
    }
  };

  return (
    <div className={`layout-container ${mode}`}>
      <header className="app-header">
        <div className="logo">Enterprise Portal</div>

        <div className="user-nav">
          <button className="theme-toggle" onClick={toggleTheme}>
            {mode === 'dark' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3
                     7 7 0 0 0 21 12.79z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {user && (
            <>
              <span>{user.email}</span>

              <span
                className={`badge ${
                  role === 'CEO'
                    ? 'badge-ceo'
                    : role === 'Manager'
                    ? 'badge-manager'
                    : 'badge-employee'
                }`}
              >
                {role || 'Loading...'}
              </span>

              <button
                className={`btn-logout ${role?.toLowerCase()}`}
                onClick={() => window.location.reload()}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main className="main-content">
        {!user ? (
          <div className="home-hero">
            <h1>Enterprise Access Portal</h1>

            <p className="home-tagline">
              Secure. Scalable. Role-Based Access Control for modern organizations.
            </p>

            <p className="home-description">
              This platform demonstrates a full-stack RBAC system powered by Firebase Authentication and a Django backend.
              Users are authenticated securely and dynamically assigned roles such as CEO, Manager, or Employee,
              each with a personalized dashboard experience.
            </p>

            <div className="home-features">
              <div className="feature-card">
                <strong>Secure Login</strong>
                <p>Google authentication via Firebase</p>
              </div>

              <div className="feature-card">
                <strong>Smart Access Control</strong>
                <p>Role-based permissions handled by Django</p>
              </div>

              <div className="feature-card">
                <strong>Dynamic UI</strong>
                <p>Custom dashboards based on user roles</p>
              </div>
            </div>

            <button className="btn-login" onClick={handleLogin}>
              Get Started with Google
            </button>
          </div>
        ) : (
          <div className="dashboard-container">
            {role === 'CEO' && <CEODashboard />}
            {role === 'Manager' && <ManagerPanel />}
            {role === 'Employee' && <EmployeeView />}
          </div>
        )}
      </main>

      <footer className="app-footer">
        &copy; 2026 Enterprise Systems Inc.
      </footer>
    </div>
  );
}

export default App;