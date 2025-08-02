import React, { useState } from "react";

const patternsByLevel = [
  // Level 1 (Basic patterns)
  [
    { seq: [2, 4, 6, 8], next: 10 }, // +2
    { seq: [1, 2, 3, 4], next: 5 }, // +1
    { seq: [5, 10, 15, 20], next: 25 }, // +5
    { seq: [10, 9, 8, 7], next: 6 }, // -1
    { seq: [3, 6, 9, 12], next: 15 }, // +3
    { seq: [20, 18, 16, 14], next: 12 }, // -2
    { seq: [1, 3, 5, 7], next: 9 }, // odd numbers
    { seq: [2, 3, 5, 7], next: 11 }, // primes
    { seq: [1, 4, 9, 16], next: 25 }, // squares
    { seq: [1, 2, 4, 8], next: 16 } // ×2
  ],
  
  // Level 2 (Slightly more complex)
  [
    { seq: [1, 1, 2, 3, 5], next: 8 }, // Fibonacci
    { seq: [3, 6, 12, 24], next: 48 }, // ×2
    { seq: [5, 8, 11, 14], next: 17 }, // +3
    { seq: [81, 27, 9, 3], next: 1 }, // ÷3
    { seq: [1, 4, 7, 10], next: 13 }, // +3
    { seq: [2, 5, 10, 17], next: 26 }, // +3, +5, +7, +9 (square numbers +1)
    { seq: [1, 3, 7, 15], next: 31 }, // ×2 +1
    { seq: [1, 2, 6, 24], next: 120 }, // factorial (×2, ×3, ×4, ×5)
    { seq: [0, 3, 8, 15], next: 24 }, // n²-1
    { seq: [1, 10, 100, 1000], next: 10000 } // ×10
  ],
  
  // Level 3 (Increasing difficulty)
  [
    { seq: [1, 4, 9, 16, 25], next: 36 }, // squares
    { seq: [1, 8, 27, 64], next: 125 }, // cubes
    { seq: [2, 3, 5, 7, 11], next: 13 }, // primes
    { seq: [1, 2, 4, 8, 16], next: 32 }, // ×2
    { seq: [1, 3, 6, 10, 15], next: 21 }, // triangular numbers
    { seq: [1, 5, 14, 30, 55], next: 91 }, // sum of squares
    { seq: [1, 2, 6, 15, 31], next: 56 }, // differences: 1,4,9,16,25
    { seq: [3, 5, 9, 17, 33], next: 65 }, // ×2 -1
    { seq: [1, 2, 3, 5, 8], next: 13 }, // Fibonacci-like
    { seq: [1, 4, 2, 5, 3], next: 6 } // alternating +3, -2
  ],
  
  // Level 4
  [
    { seq: [1, 2, 4, 7, 11], next: 16 }, // +1, +2, +3, +4, +5
    { seq: [2, 6, 12, 20, 30], next: 42 }, // n² + n
    { seq: [1, 3, 4, 7, 11], next: 18 }, // sum of previous two
    { seq: [1, 2, 6, 24, 120], next: 720 }, // factorial
    { seq: [1, 4, 3, 6, 5], next: 8 }, // alternating +3, -1
    { seq: [1, 5, 9, 13, 17], next: 21 }, // +4
    { seq: [10, 19, 28, 37, 46], next: 55 }, // +9
    { seq: [1, 2, 5, 10, 17], next: 26 }, // +1, +3, +5, +7, +9
    { seq: [1, 0, 3, -2, 5], next: -4 }, // alternating +1, -3
    { seq: [1, 3, 7, 13, 21], next: 31 } // +2, +4, +6, +8, +10
  ],
  
  // Level 5
  [
    { seq: [1, 11, 21, 1211, 111221], next: 312211 }, // look-and-say
    { seq: [1, 2, 3, 2, 1], next: 2 }, // palindrome
    { seq: [2, 4, 8, 16, 32], next: 64 }, // ×2
    { seq: [1, 4, 9, 61, 52], next: 63 }, // squares reversed
    { seq: [1, 2, 4, 5, 7, 8], next: 10 }, // not multiples of 3
    { seq: [1, 10, 11, 100, 101], next: 110 }, // binary numbers
    { seq: [1, 2, 6, 15, 31], next: 56 }, // cumulative sums
    { seq: [1, 3, 6, 10, 15], next: 21 }, // triangular numbers
    { seq: [1, 2, 5, 12, 27], next: 58 }, // ×2 +1, +2, +3
    { seq: [1, 4, 13, 40, 121], next: 364 } // ×3 +1
  ],
  
  // Level 6
  [
    { seq: [1, 2, 4, 8, 16, 32], next: 64 }, // powers of 2
    { seq: [1, 1, 2, 3, 5, 8, 13], next: 21 }, // Fibonacci
    { seq: [1, 2, 3, 5, 7, 11], next: 13 }, // primes
    { seq: [1, 3, 7, 15, 31, 63], next: 127 }, // 2ⁿ-1
    { seq: [1, 2, 6, 24, 120, 720], next: 5040 }, // factorial
    { seq: [1, 4, 9, 16, 25, 36], next: 49 }, // squares
    { seq: [1, 8, 27, 64, 125, 216], next: 343 }, // cubes
    { seq: [1, 2, 2, 4, 8, 32], next: 256 }, // multiply previous two
    { seq: [1, 5, 14, 30, 55, 91], next: 140 }, // sum of squares
    { seq: [1, 2, 5, 14, 41, 122], next: 365 } // ×3 -1
  ],
  
  // Level 7
  [
    { seq: [2, 5, 10, 17, 26, 37], next: 50 }, // n² +1
    { seq: [1, 3, 6, 10, 15, 21, 28], next: 36 }, // triangular numbers
    { seq: [1, 2, 4, 7, 11, 16, 22], next: 29 }, // +1, +2, +3, etc.
    { seq: [1, 4, 9, 16, 25, 36, 49], next: 64 }, // squares
    { seq: [1, 2, 6, 24, 120, 720, 5040], next: 40320 }, // factorial
    { seq: [1, 1, 2, 4, 7, 11, 16], next: 22 }, // +0, +1, +2, +3, etc.
    { seq: [1, 3, 4, 7, 11, 18, 29], next: 47 }, // sum of previous two
    { seq: [1, 2, 4, 8, 16, 32, 64], next: 128 }, // ×2
    { seq: [1, 5, 9, 17, 33, 65, 129], next: 257 }, // ×2 -1, +4, +8, etc.
    { seq: [1, 2, 3, 2, 1, 2, 3], next: 2 } // repeating pattern
  ],
  
  // Level 8
  [
    { seq: [1, 4, 27, 256, 3125], next: 46656 }, // nⁿ
    { seq: [1, 2, 6, 30, 210, 2310], next: 30030 }, // primorial
    { seq: [1, 2, 5, 12, 29, 70], next: 169 }, // ×2 + previous
    { seq: [1, 3, 12, 60, 360, 2520], next: 20160 }, // ×3, ×4, ×5, etc.
    { seq: [1, 2, 3, 1, 2, 3, 1], next: 2 }, // repeating
    { seq: [1, 4, 10, 22, 46, 94], next: 190 }, // ×2 +2
    { seq: [1, 5, 13, 29, 61, 125], next: 253 }, // ×2 +3
    { seq: [1, 2, 5, 13, 34, 89], next: 233 }, // ×3 - previous
    { seq: [1, 3, 7, 13, 21, 31, 43], next: 57 }, // +2, +4, +6, etc.
    { seq: [1, 2, 4, 7, 11, 16, 22, 29], next: 37 } // +1, +2, +3, etc.
  ],
  
  // Level 9
  [
    { seq: [1, 2, 3, 5, 8, 13, 21, 34], next: 55 }, // Fibonacci
    { seq: [1, 2, 4, 8, 16, 32, 64, 128], next: 256 }, // ×2
    { seq: [1, 4, 9, 16, 25, 36, 49, 64], next: 81 }, // squares
    { seq: [1, 8, 27, 64, 125, 216, 343, 512], next: 729 }, // cubes
    { seq: [1, 2, 6, 24, 120, 720, 5040, 40320], next: 362880 }, // factorial
    { seq: [1, 3, 6, 10, 15, 21, 28, 36], next: 45 }, // triangular
    { seq: [1, 2, 3, 1, 4, 2, 5, 3], next: 6 }, // interleaved sequences
    { seq: [1, 2, 4, 5, 7, 8, 10, 11], next: 13 }, // not multiples of 3
    { seq: [1, 1, 2, 3, 5, 8, 13, 21], next: 34 }, // Fibonacci
    { seq: [1, 3, 4, 7, 11, 18, 29, 47], next: 76 } // sum of previous two
  ],
  
  // Level 10 (Expert level)
  [
    { seq: [1, 2, 3, 2, 3, 4, 3, 4, 5], next: 4 }, // +1,+1,-1,+1,+1,-1,etc.
    { seq: [1, 2, 6, 15, 31, 56, 92], next: 141 }, // differences of differences
    { seq: [1, 2, 3, 5, 7, 11, 13, 17], next: 19 }, // primes
    { seq: [1, 2, 4, 8, 16, 32, 64, 128, 256], next: 512 }, // ×2
    { seq: [1, 1, 2, 3, 5, 8, 13, 21, 34], next: 55 }, // Fibonacci
    { seq: [1, 4, 9, 16, 25, 36, 49, 64, 81], next: 100 }, // squares
    { seq: [1, 8, 27, 64, 125, 216, 343, 512, 729], next: 1000 }, // cubes
    { seq: [1, 2, 6, 24, 120, 720, 5040, 40320, 362880], next: 3628800 }, // factorial
    { seq: [1, 3, 6, 10, 15, 21, 28, 36, 45], next: 55 }, // triangular
    { seq: [1, 2, 5, 12, 27, 58, 121, 248, 503], next: 1014 } // ×2 +1, +2, +3, etc.
  ]
];

function getRandomPattern(level, usedIndices) {
  const patterns = patternsByLevel[level - 1];
  let idx;
  do {
    idx = Math.floor(Math.random() * patterns.length);
  } while (usedIndices.includes(idx) && usedIndices.length < patterns.length);
  return { ...patterns[idx], idx };
}

function LogicGame() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [usedIndices, setUsedIndices] = useState([]);
  const [current, setCurrent] = useState(() => {
    const { idx, ...pattern } = getRandomPattern(1, []);
    return { ...pattern, idx };
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(input) === current.next) {
      setFeedback("Correct!");
      setScore((s) => s + 1);
      const newUsed = [...usedIndices, current.idx];
      if (newUsed.length === 10) {
        // Level up
        if (level < patternsByLevel.length) {
          setTimeout(() => {
            setLevel(level + 1);
            setUsedIndices([]);
            const { idx, ...pattern } = getRandomPattern(level + 1, []);
            setCurrent({ ...pattern, idx });
            setInput("");
            setFeedback("Level Up!");
          }, 1000);
        } else {
          setFeedback("Congratulations! All levels complete!");
        }
      } else {
        setTimeout(() => {
          const { idx, ...pattern } = getRandomPattern(level, newUsed);
          setCurrent({ ...pattern, idx });
          setUsedIndices(newUsed);
          setInput("");
          setFeedback("");
        }, 1000);
      }
    } else {
      setFeedback("Try again!");
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setUsedIndices([]);
    const { idx, ...pattern } = getRandomPattern(1, []);
    setCurrent({ ...pattern, idx });
    setInput("");
    setFeedback("");
  };

  return (
    <main className="game">
      <h2>Pattern Portal</h2>
      <div className="score">
        Score: {score} | Level: {level} | Puzzle: {usedIndices.length + 1}/10
      </div>
      <div className="pattern">
        {current.seq.join(", ")} , ?
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Next number"
        />
        <button type="submit">Submit</button>
      </form>
      {feedback && <div className="feedback">{feedback}</div>}
      <button onClick={handleRestart}>Try Again</button>
    </main>
  );
}

export default LogicGame;