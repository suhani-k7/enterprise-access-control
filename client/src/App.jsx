import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase';
import axios from 'axios';
import './App.css';

// --- CEO DASHBOARD ---
const CEODashboard = () => (
  <div style={{ padding: '30px', backgroundColor: '#fff5f5', borderRadius: '15px', border: '2px solid #ff4d4d', marginTop: '20px' }}>
    <h2 style={{ color: '#d32f2f' }}>👑 CEO Executive Suite</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
      <div style={cardStyle}><h4>💰 Revenue</h4><p>$4.2M (+12%)</p></div>
      <div style={cardStyle}><h4>📈 Growth</h4><p>24% YoY</p></div>
      <div style={cardStyle}><h4>🤝 M&A Pipeline</h4><p>3 Active Deals</p></div>
    </div>
    <button style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>Generate Annual Report</button>
  </div>
);

// --- MANAGER PANEL ---
const ManagerPanel = () => (
  <div style={{ padding: '30px', backgroundColor: '#f0f7ff', borderRadius: '15px', border: '2px solid #007bff', marginTop: '20px' }}>
    <h2 style={{ color: '#0056b3' }}>📋 Managerial Operations</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
      <div style={cardStyle}><h4>👥 Team Capacity</h4><p>85% Utilized</p></div>
      <div style={cardStyle}><h4>⏳ Pending Approvals</h4><p>4 Time-off Requests</p></div>
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
  <div style={{ padding: '30px', backgroundColor: '#f6fff6', borderRadius: '15px', border: '2px solid #28a745', marginTop: '20px' }}>
    <h2 style={{ color: '#1e7e34' }}>🛠 Employee Workspace</h2>
    <div style={{ textAlign: 'left' }}>
      <h4>My Daily Tasks:</h4>
      <div style={{ ...cardStyle, marginBottom: '10px' }}>✅ Update documentation for API</div>
      <div style={{ ...cardStyle, marginBottom: '10px' }}>⬜️ Sync with lead developer at 3PM</div>
      <div style={{ ...cardStyle, marginBottom: '10px' }}>⬜️ Finalize CSS for Dashboard</div>
    </div>
    <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
      Submit Daily Report
    </button>
  </div>
);

// Shared Style for Cards
const cardStyle = {
  background: 'white',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: '1px solid #eee'
};

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = async () => {
    try {
      // 1. Log in with Google
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      // 2. Get the secure Token from Firebase
      const token = await result.user.getIdToken();

      // 3. Send that token to our Django Backend
      const response = await axios.post('http://127.0.0.1:8000/api/get-role/', {
        token: token
      });

      // 4. Save the role Django sent back
      setRole(response.data.role);

    } catch (error) {
      console.error("Login or Role Check failed:", error);
      alert("Check the console - Django might be blocked!");
    }
  };

return (
    <div className="layout-container">
      <header className="app-header">
        <div className="logo">Enterprise Portal</div>
        {user && (
          <div className="user-nav">
            <span>{user.email}</span>
            <span className={`badge ${role === 'CEO' ? 'badge-ceo' : role === 'Manager' ? 'badge-manager' : 'badge-employee'}`}>
              {role || 'Loading...'}
            </span>
            <button className="btn-logout" onClick={() => window.location.reload()}>Logout</button>
          </div>
        )}
      </header>

      <main className="main-content">
        {!user ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Welcome to the Enterprise Portal</h1>
            <button className="btn-login" onClick={handleLogin}>Sign in with Google</button>
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