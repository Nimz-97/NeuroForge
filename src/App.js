import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { useAuth } from "./auth/AuthContext";
import Home from "./Home";
import MemoryGame from "./MemoryGame";
import FocusGame from "./FocusGame";
import LogicGame from "./LogicGame";
import Dashboard from "./Dashboard";
import MatchingPairs from "./MatchingPairs";
import CardOrderGame from "./CardOrderGame";
import { SignUp } from "./auth/SignUp";
import { SignIn } from "./auth/SignIn";
import { Profile } from "./auth/Profile";
import "./App.css";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Router>
      <AuthProvider>
        <div className={`app-container${dark ? " dark" : ""}`}>
          <NavBar dark={dark} setDark={setDark} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Protected game routes */}
            <Route path="/memory" element={<ProtectedRoute><MemoryGame /></ProtectedRoute>} />
            <Route path="/focus" element={<ProtectedRoute><FocusGame /></ProtectedRoute>} />
            <Route path="/logic" element={<ProtectedRoute><LogicGame /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/pairs" element={<ProtectedRoute><MatchingPairs /></ProtectedRoute>} />
            <Route path="/cardorder" element={<ProtectedRoute><CardOrderGame /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

// New NavBar component with auth links
function NavBar({ dark, setDark }) {
  const { user, logOut } = useAuth();

  return (
<header>
  <Link to="/" className="logo">🧠 NeuroForge</Link>
  <div className="nav-links">
    {user ? (
      <>
        <Link to="/dashboard" className="nav-item auth-link">
          Dashboard
        </Link>
        <Link to="/profile" className="nav-item auth-link">
          Profile
        </Link>
        <button onClick={logOut} className="nav-item logout-btn">
          Logout
        </button>
      </>
    ) : (
      <>
        <Link to="/signin" className="nav-item auth-link">
          Sign In
        </Link>
        <Link to="/signup" className="nav-item auth-link">
          Sign Up
        </Link>
      </>
    )}
    <button className="theme-toggle" onClick={() => setDark(d => !d)}>
      {dark ? "🌞" : "🌙"}
    </button>
  </div>
</header>
  );
}

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

export default App;