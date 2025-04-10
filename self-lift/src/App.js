import React, {useState, useEffect} from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth(token);
    }
    else{
      setIsAuthChecked(true);
    }
  }, []);

  const checkAuth = async (token) => {

    try {
      const response = await fetch('http://localhost:8000/api/verify-token/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
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
    } finally {
      setIsAuthChecked(true); // <--- Без это фигни ничего работать не будет
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <Router>
      <div className="App">
      {!isAuthChecked ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 text-lg font-medium">Загрузка...</span>
        </div>
      </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserData={setUserData}/>} />
          <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} /> : <Navigate to="/profile" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile userData={userData} logout={handleLogout} isAuthenticated={isAuthenticated}/> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
        </Routes>
      )}
    </div>
    </Router>
  );
}

export default App;