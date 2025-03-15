import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Vote = () => {
  const [pollId, setPollId] = useState(""); // Store entered Poll ID
  const [poll, setPoll] = useState(null); // Store fetched poll
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false); // Track voting status
  const navigate = useNavigate();

  // Function to fetch poll based on ID
  const fetchPoll = async () => {
    if (!pollId) {
      setError("❌ Please enter a Poll ID.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/polls/${pollId}`);
      setPoll(response.data);
      setError("");

      // ✅ Check if user already voted (using localStorage)
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || {};
      if (votedPolls[pollId]) {
        setHasVoted(true);
      } else {
        setHasVoted(false);
      }
    } catch (error) {
      console.error("Error fetching poll:", error);
      setError("⚠️ Poll not found. Please check the ID.");
      setPoll(null);
    }
  };

  // Function to vote for an option
  const vote = async (option) => {
    if (hasVoted) {
      alert("🚫 You have already voted for this poll!");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/vote/${pollId}`, { option });
      alert("✅ Vote submitted successfully!");

      // ✅ Store voting status in localStorage
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || {};
      votedPolls[pollId] = true;
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls));

      setHasVoted(true);
      fetchPoll(); // Refresh poll results after voting
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🗳️ Vote for Your Candidate</h1>

      {/* Poll ID Input */}
      <input
        type="text"
        placeholder="Enter Poll ID"
        value={pollId}
        onChange={(e) => setPollId(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchPoll} style={styles.fetchButton}>🔍 Find Poll</button>

      {error && <p style={styles.error}>{error}</p>}

      {/* Display Poll */}
      {poll && (
        <div style={styles.poll}>
          <h2>{poll.question}</h2>
          {poll.options.map((option, index) => (
            <button
              key={index}
              style={{
                ...styles.voteButton,
                background: hasVoted ? "#ccc" : "#007bff",
                cursor: hasVoted ? "not-allowed" : "pointer",
              }}
              onClick={() => vote(option)}
              disabled={hasVoted} // Disable buttons if already voted
            >
              {option} ({poll.votes?.[option] || 0} votes)
            </button>
          ))}
          {hasVoted && <p style={styles.alreadyVoted}>🚫 You have already voted in this poll.</p>}
        </div>
      )}

      {/* ✅ Back to Home Button */}
      <button style={styles.homeButton} onClick={() => navigate("/")}>
        ⬅️ Back to Home
      </button>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    color: "white",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  input: {
    width: "80%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fetchButton: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    margin: "5px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  poll: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  voteButton: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    margin: "5px",
  },
  alreadyVoted: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },
  homeButton: {
    marginTop: "20px",
    background: "#28a745",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Vote;
