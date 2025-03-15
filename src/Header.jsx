import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Function to ask for Poll ID and navigate to results page
  const handleSeeResults = () => {
    const pollId = prompt("📌 Enter Poll ID to see results:");
    if (pollId) {
      navigate(`/results/${pollId}`);  // Navigate to results page
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      background: "rgba(255, 255, 255, 0.2)",
      padding: "20px",
      borderRadius: "15px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      marginBottom: "20px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    button: {
      padding: "12px 20px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "0.3s ease-in-out",
    },
    addVoteButton: {
      background: "#4caf50",
      color: "white",
    },
    voteButton: {
      background: "#007bff",
      color: "white",
    },
    resultsButton: {
      background: "#f39c12",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🗳️ Voting System</h1>
      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, ...styles.addVoteButton }}
          onClick={() => navigate("/login")}
        >
          ➕ Add Voting
        </button>

        <button
          style={{ ...styles.button, ...styles.voteButton }}
          onClick={() => navigate("/vote")}
        >
          ✅ Vote Here
        </button>

        {/* ✅ See Results Button */}
        <button
          style={{ ...styles.button, ...styles.resultsButton }}
          onClick={handleSeeResults}
        >
          📊 See Results
        </button>
      </div>
    </div>
  );
};

export default Header;
