import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import MemoryGame from "./MemoryGame";
import FocusGame from "./FocusGame";
import LogicGame from "./LogicGame";
import Dashboard from "./Dashboard";
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
      <div className={`app-container${dark ? " dark" : ""}`}>
        <header>
          <Link to="/" className="logo">🧠 NeuroForge</Link>
          <button className="theme-toggle" onClick={() => setDark(d => !d)}>
            {dark ? "🌞" : "🌙"}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory" element={<MemoryGame />} />
          <Route path="/focus" element={<FocusGame />} />
          <Route path="/logic" element={<LogicGame />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;