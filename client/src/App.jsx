import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase';
import axios from 'axios';

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
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Enterprise RBAC Portal</h1>
      
      {!user ? (
        <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Login with Google
        </button>
      ) : (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <p>Verified Role: <strong>{role || "Fetching Role..."}</strong></p>
          <hr />

          {/* This part only shows if the Role is CEO */}
          {role === 'CEO' && (
            <div style={{ background: '#fff0f0', border: '2px solid red', padding: '20px', margin: '20px' }}>
              <h3>👑 CEO PRIVATE DASHBOARD</h3>
              <p>Sensitive Data: Project "Moonshot" Financials</p>
            </div>
          )}

          {/* This part only shows if the Role is Employee */}
          {role === 'Employee' && (
            <div style={{ background: '#f0f0ff', border: '2px solid blue', padding: '20px', margin: '20px' }}>
              <h3>🛠 Employee Workspace</h3>
              <p>Current Task: Submit Weekly Time Report</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;