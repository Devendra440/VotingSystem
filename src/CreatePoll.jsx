import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VotingApp from "./VotingApp";
import CreatePoll from "./CreatePoll";

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">🏠 Home</Link>
          <Link to="/create-poll">➕ Add Voting</Link>
        </nav>
        <Routes>
          <Route path="/" element={<VotingApp />} />
          <Route path="/create-poll" element={<CreatePoll />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
