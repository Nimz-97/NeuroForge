import React, { useState } from "react";

const icons = ["★", "☆", "✦", "✧", "✪"];
const targetIcon = "★";

function getIcons() {
  let arr = [];
  for (let i = 0; i < 12; i++) {
    arr.push(icons[Math.floor(Math.random() * icons.length)]);
  }
  return arr;
}

function FocusGame() {
  const [iconList, setIconList] = useState(getIcons());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleClick = idx => {
    if (iconList[idx] === targetIcon) {
      setScore(s => s + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Try again!");
    }
    setTimeout(() => {
      setIconList(getIcons());
      setFeedback("");
    }, 700);
  };

  return (
    <main className="game">
      <h2>Focus Dash</h2>
      <div className="score">Score: {score}</div>
      <div className="target">Find: <span className="target-icon">{targetIcon}</span></div>
      <div className="icon-grid">
        {iconList.map((icon, idx) => (
          <button key={idx} className="icon-btn" onClick={() => handleClick(idx)}>
            {icon}
          </button>
        ))}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <button onClick={() => setIconList(getIcons())}>Try Again</button>
    </main>
  );
}

export default FocusGame;