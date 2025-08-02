import React, { useState, useEffect } from "react";

const cardPack = [
  "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮", // Spades
  "🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾", // Hearts
  "🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎", // Diamonds
  "🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞"  // Clubs
];

function getRandomCards(count) {
  const pack = [...cardPack];
  const cards = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pack.length);
    cards.push(pack.splice(idx, 1)[0]);
  }
  return cards;
}

function getDisplayTime(stage) {
  // Start at 4000ms, decrease by 300ms per stage, minimum 1200ms
  return Math.max(1200, 4000 - (stage - 1) * 300);
}

function CardOrderGame() {
  const [stage, setStage] = useState(1);
  const [round, setRound] = useState(1);
  const [sequence, setSequence] = useState(getRandomCards(3));
  const [show, setShow] = useState(true);
  const [input, setInput] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // Show cards for 2.5 seconds, then hide
  useEffect(() => {
    setShow(true);
    setInput([]);
    setTimeout(() => setShow(false), getDisplayTime(stage));
    // eslint-disable-next-line
  }, [stage, round]);

  const handleCardClick = (card) => {
    if (show || input.length >= sequence.length) return;
    setInput(inp => {
      const newInput = [...inp, card];
      if (newInput.length === sequence.length) {
        if (newInput.join() === sequence.join()) {
          setFeedback("Correct!");
          if (round === 3) {
            setTimeout(() => {
              setStage(prevStage => {
                const nextStage = prevStage + 1;
                setRound(1);
                setSequence(getRandomCards(3 + nextStage - 1));
                setFeedback("Stage Up!");
                setShow(true);
                setTimeout(() => setShow(false), getDisplayTime(nextStage));
                return nextStage;
              });
            }, 1200);
          } else {
            setTimeout(() => {
              setRound(r => r + 1);
              setSequence(getRandomCards(3 + stage - 1));
              setFeedback("");
              setShow(true);
              setTimeout(() => setShow(false), getDisplayTime(stage));
            }, 1200);
          }
        } else {
          setFeedback("Try again! Stage reset.");
          setTimeout(() => {
            setStage(1);
            setRound(1);
            setSequence(getRandomCards(3));
            setFeedback("");
            setShow(true);
            setTimeout(() => setShow(false), getDisplayTime(1));
          }, 1200);
        }
      }
      return newInput;
    });
  };

  const handleRestart = () => {
    setRound(1);
    setSequence(getRandomCards(3 + stage - 1));
    setInput([]);
    setFeedback("");
    setShow(true);
    setTimeout(() => setShow(false), getDisplayTime(stage));
  };

  return (
    <main className="game">
      <h2>Card Order Memory</h2>
      <div className="score">Stage: {stage} | Round: {round}/3</div>
      <div style={{ margin: "1rem 0" }}>
        {show ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
              margin: "0 auto"
            }}
          >
            {sequence.map((card, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "4rem",
                  padding: "1.2rem 2rem",
                  borderRadius: "16px",
                  background: "#fff",
                  border: "3px solid #4f8cff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  margin: "0.5rem",
                  color: "#222",
                  display: "inline-block",
                  minWidth: "80px",
                  textAlign: "center"
                }}
              >
                {card}
              </span>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
              margin: "0 auto"
            }}
          >
            {sequence
              .concat(getRandomCards(5))
              .sort(() => Math.random() - 0.5)
              .map((card, idx) => (
                <button
                  key={idx}
                  style={{
                    fontSize: "3rem",
                    padding: "1.2rem 2rem",
                    borderRadius: "16px",
                    border: "3px solid #4f8cff",
                    background: input.includes(card)
                      ? "#b3c7f7"
                      : ["#fffbe6", "#e6f7ff", "#e6ffe6", "#ffe6f7", "#f0e6ff"][idx % 5],
                    color: "#222",
                    margin: "0.5rem",
                    minWidth: "80px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    cursor: input.includes(card) ? "not-allowed" : "pointer",
                    transition: "background 0.2s"
                  }}
                  onClick={() => handleCardClick(card)}
                  disabled={input.includes(card)}
                >
                  {card}
                </button>
              ))}
          </div>
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <button onClick={handleRestart}>Try Again</button>
    </main>
  );
}

export default CardOrderGame;