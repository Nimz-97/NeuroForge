import React, { useEffect, useState } from "react";

function getStats() {
  // Default stats structure
  return (
    JSON.parse(localStorage.getItem("neuroforge_stats")) || {
      memory: { plays: 0, bestLevel: 0, avgScore: 0 },
      focus: { plays: 0, bestScore: 0, avgScore: 0 },
      logic: { plays: 0, bestLevel: 0, avgScore: 0 },
      pairs: { plays: 0, bestMoves: null, avgMoves: null },
      cardorder: { plays: 0, bestStage: 0, avgStage: 0 },
      lastPlayed: null,
      streak: 0
    }
  );
}

function Dashboard() {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    setStats(getStats());
  }, []);

  return (
    <main className="dashboard">
      <h2>🧠 Brain Capacity Dashboard</h2>
      <div className="dashboard-section">
        <h3>Flash Recall</h3>
        <p>Games Played: {stats.memory.plays}</p>
        <p>Best Level: {stats.memory.bestLevel}</p>
        <p>Average Score: {stats.memory.avgScore}</p>
      </div>
      <div className="dashboard-section">
        <h3>Focus Dash</h3>
        <p>Games Played: {stats.focus.plays}</p>
        <p>Best Score: {stats.focus.bestScore}</p>
        <p>Average Score: {stats.focus.avgScore}</p>
      </div>
      <div className="dashboard-section">
        <h3>Pattern Portal</h3>
        <p>Games Played: {stats.logic.plays}</p>
        <p>Best Level: {stats.logic.bestLevel}</p>
        <p>Average Score: {stats.logic.avgScore}</p>
      </div>
      <div className="dashboard-section">
        <h3>Matching Pairs</h3>
        <p>Games Played: {stats.pairs.plays}</p>
        <p>Best Moves: {stats.pairs.bestMoves ?? "-"}</p>
        <p>Average Moves: {stats.pairs.avgMoves ?? "-"}</p>
      </div>
      <div className="dashboard-section">
        <h3>Card Order Memory</h3>
        <p>Games Played: {stats.cardorder.plays}</p>
        <p>Best Stage: {stats.cardorder.bestStage}</p>
        <p>Average Stage: {stats.cardorder.avgStage}</p>
      </div>
      <div className="dashboard-section">
        <h3>General</h3>
        <p>Last Played: {stats.lastPlayed ? new Date(stats.lastPlayed).toLocaleString() : "-"}</p>
        <p>Daily Streak: {stats.streak}</p>
      </div>
    </main>
  );
}

export default Dashboard;