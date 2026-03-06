import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase';
import axios from 'axios';
// Add these small components ABOVE your main 'App' function
const CEODashboard = () => (
  <div style={{ padding: '20px', backgroundColor: '#fff5f5', borderRadius: '10px', border: '2px solid #ff4d4d' }}>
    <h3>CEO Command Center</h3>
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>📊 Revenue: $2.4M</div>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>👥 Headcount: 150</div>
    </div>
  </div>
);

const ManagerPanel = () => (
  <div style={{ padding: '20px', backgroundColor: '#f5faff', borderRadius: '10px', border: '2px solid #4da3ff' }}>
    <h3>Manager Operations</h3>
    <ul>
      <li>Approve Leave Requests</li>
      <li>Set Q3 Goals</li>
      <li>Review Team Performance</li>
    </ul>
  </div>
);

const EmployeeView = () => (
  <div style={{ padding: '20px', backgroundColor: '#f5fff5', borderRadius: '10px', border: '2px solid #4dff88' }}>
    <h3>Employee Workspace</h3>
    <p>Current Task: Fix Login Bug #402</p>
    <button>Submit Daily Standup</button>
  </div>
);


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
  <div className="App">
    {!user ? (
      <LoginView handleLogin={handleLogin} />
    ) : (
      <div>
        <h1>Enterprise Portal</h1>
        <p>User: {user.email}</p>
        {role === 'CEO' && <CEODashboard />}
        {role === 'Manager' && <ManagerPanel />}
        {role === 'Employee' && <EmployeeTasklist />}
        
        {role === null && <p>Loading permissions...</p>}
      </div>
    )}
  </div>
);)
}

export default App;