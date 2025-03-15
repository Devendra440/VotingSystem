import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const VotingApp = () => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [pollId, setPollId] = useState(""); 
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();  // ✅ Use useNavigate() hook

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/polls");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const createPoll = async (e) => {
    e.preventDefault();
    if (!question || !options) {
      alert("❌ Please enter a question and at least one option!");
      return;
    }

    try {
      const newPoll = { question, options: options.split(",").map(opt => opt.trim()) };
      const response = await axios.post("http://localhost:5000/api/polls", newPoll);

      setPollId(response.data.pollId);
      setQuestion("");
      setOptions("");
      setCopySuccess(false);
      alert(`✅ Poll Created! ID: ${response.data.pollId}`);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const copyPollId = () => {
    navigator.clipboard.writeText(pollId).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(err => console.error("Failed to copy:", err));
  };

  const goToHome = () => {
    navigate("/");  // ✅ Navigate to Home (Header.jsx)
  };

  return (
    <div className="container">
      <h1>🗳️ Voting App</h1>

      <form className="poll-form" onSubmit={createPoll}>
        <input type="text" placeholder="Poll Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <input type="text" placeholder="Options (comma-separated)" value={options} onChange={(e) => setOptions(e.target.value)} />
        <button type="submit" className="create-btn">➕ Create Poll</button>
      </form>

      {pollId && (
        <div className="copy-id-container">
          <p>📌 Poll ID: <strong>{pollId}</strong></p>
          <button className="copy-btn" onClick={copyPollId}>📋 Copy Poll ID</button>
          {copySuccess && <span className="copy-success">✔ Copied!</span>}
        </div>
      )}

      {/* ✅ Back to Home Button */}
      <button className="back-home-btn" onClick={goToHome}>🏠 Back to Home</button>
    </div>
  );
};

export default VotingApp;
