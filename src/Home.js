import React from "react";
import { Link } from "react-router-dom";
import memoryGameImg from './images/memory-game.jpg'; // Add your image files
import focusGameImg from './images/focus-game.jpg';
import logicGameImg from './images/logic-game.jpg';
import pairsGameImg from './images/pairs-game.jpg';
import cardOrderImg from './images/card-order.jpg';

function Home() {
  return (
    <main className="home">
      <h1>NeuroForge</h1>
      <p>Sharpen your mind with mini-games!</p>
      <div className="game-cards">
        <Link to="/memory" className="game-card">
          <img src={memoryGameImg} alt="Memory Game" />
          <span>Flash Recall</span>
        </Link>
        <Link to="/focus" className="game-card">
          <img src={focusGameImg} alt="Focus Game" />
          <span>Focus Dash</span>
        </Link>
        <Link to="/logic" className="game-card">
          <img src={logicGameImg} alt="Logic Game" />
          <span>Pattern Portal</span>
        </Link>
        <Link to="/pairs" className="game-card">
          <img src={pairsGameImg} alt="Matching Pairs" />
          <span>Matching Pairs</span>
        </Link>
        <Link to="/cardorder" className="game-card">
          <img src={cardOrderImg} alt="Card Order" />
          <span>Card Order Memory</span>
        </Link>
      </div>
      <Link to="/dashboard" className="dashboard-link">View Dashboard</Link>
    </main>
  );
}

export default Home;