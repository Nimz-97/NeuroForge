import React, { useState, useEffect } from "react";

const symbols = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍋", "🍓", "🥝"];

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function MatchingPairs() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const pairs = shuffle([...symbols, ...symbols]);
    setCards(pairs);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setFeedback("");
  }, [reset]);

  const handleFlip = idx => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setTimeout(() => {
          setMatched(m => [...m, first, second]);
          setFlipped([]);
          setFeedback("Matched!");
        }, 700);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setFeedback("Try again!");
        }, 700);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setFeedback(`You won in ${moves} moves!`);
    }
  }, [matched, cards, moves]);

  return (
    <main className="game">
      <h2>Matching Pairs</h2>
      <div className="score">Moves: {moves}</div>
      <div className="pairs-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 60px)",
        gap: "10px",
        justifyContent: "center",
        margin: "20px 0"
      }}>
        {cards.map((symbol, idx) => (
          <button
            key={idx}
            className="pair-card"
            style={{
              width: 60, height: 60, fontSize: "2rem",
              background: matched.includes(idx) || flipped.includes(idx) ? "#fff" : "#4f8cff",
              color: matched.includes(idx) || flipped.includes(idx) ? "#222" : "#4f8cff",
              border: "1px solid #bbb",
              borderRadius: "8px",
              cursor: matched.includes(idx) ? "default" : "pointer",
              transition: "background 0.2s"
            }}
            onClick={() => handleFlip(idx)}
            disabled={matched.includes(idx)}
          >
            {matched.includes(idx) || flipped.includes(idx) ? symbol : "?"}
          </button>
        ))}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <button onClick={() => setReset(r => !r)}>Try Again</button>
    </main>
  );
}

export default MatchingPairs;