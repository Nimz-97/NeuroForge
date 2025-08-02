import React, { useState } from "react";

function getRandomSequence(length = 4) {
  return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
}

function MemoryGame() {
  const [level, setLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(0);
  const [sequence, setSequence] = useState(getRandomSequence(3 + level));
  const [show, setShow] = useState(true);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setSequence(getRandomSequence(3 + level));
    setShow(true);
    setInput("");
    setFeedback("");
    setTimeout(() => setShow(false), 1200 + level * 200);
  };

  const handleInput = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (input === sequence.join("")) {
      setFeedback("Correct!");
      setScore(s => s + 1);
      if (subLevel + 1 === 10) {
        setTimeout(() => {
          setLevel(l => l + 1);
          setSubLevel(0);
          setSequence(getRandomSequence(3 + level + 1));
          setShow(true);
          setInput("");
          setFeedback("Level Up!");
          setTimeout(() => setShow(false), 1200 + (level + 1) * 200);
        }, 1000);
      } else {
        setTimeout(() => {
          setSubLevel(sl => sl + 1);
          setSequence(getRandomSequence(3 + level));
          setShow(true);
          setInput("");
          setFeedback("");
          setTimeout(() => setShow(false), 1200 + level * 200);
        }, 1000);
      }
    } else {
      setFeedback("Try again! Level reset.");
      setLevel(1);
      setSubLevel(0);
      setTimeout(() => {
        setSequence(getRandomSequence(4));
        setShow(true);
        setInput("");
        setFeedback("");
        setTimeout(() => setShow(false), 1400);
      }, 1000);
    }
  };

  React.useEffect(() => {
    setTimeout(() => setShow(false), 1200 + level * 200);
    // eslint-disable-next-line
  }, []);

  return (
    <main className="game">
      <h2>Flash Recall</h2>
      <div className="score">
        Score: {score} | Level: {level} | Sub-level: {subLevel + 1}/10
      </div>
      {show ? (
        <div className="sequence">{sequence.join(" ")}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInput}
            placeholder="Enter sequence"
            autoFocus
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {feedback && <div className="feedback">{feedback}</div>}
      <button onClick={handleStart}>Try Again</button>
    </main>
  );
}

export default MemoryGame;