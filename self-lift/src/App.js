import React, {useState, useEffect} from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Токен в localStorage:', token); // <--- сюда
    if (token) {
      checkAuth(token);
    }
  }, []);

  const checkAuth = async (token) => {

    try {
      const response = await fetch('http://localhost:8000/api/verify-token/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} /> : <Navigate to="/profile" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} /> : <Navigate to="/profile" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile userData={userData} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;