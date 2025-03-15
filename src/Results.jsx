import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Results = () => {
  const { id } = useParams(); // Get Poll ID from URL
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/polls/${id}`);
      setPoll(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("⚠️ Poll not found. Please check the ID.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Poll Results</h1>

      {error && <p style={styles.error}>{error}</p>}

      {poll && (
        <div style={styles.poll}>
          <h2>{poll.question}</h2>
          <ul style={styles.list}>
            {poll.options.map((option, index) => (
              <li key={index} style={styles.listItem}>
                {option}: <strong>{poll.votes?.[option] || 0} votes</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button style={styles.homeButton} onClick={() => navigate("/")}>
        ⬅️ Back to Home
      </button>
    </div>
  );
};

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
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "8px",
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

export default Results;
