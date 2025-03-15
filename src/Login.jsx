import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    alert("✅ Login successful!");
    navigate("/voting");
  };

  // Inline styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      fontFamily: "'Poppins', sans-serif",
    },
    box: {
      background: "rgba(255, 255, 255, 0.15)",
      padding: "30px",
      borderRadius: "15px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      width: "350px",
      color: "white",
    },
    title: {
      fontSize: "26px",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "14px",
      marginBottom: "20px",
      color: "#ddd",
    },
    input: {
      width: "90%",
      padding: "12px",
      margin: "10px 0",
      border: "none",
      borderRadius: "8px",
      background: "rgba(255, 255, 255, 0.8)",
      fontSize: "16px",
      color: "#333",
      outline: "none",
      transition: "0.3s ease-in-out",
    },
    inputFocus: {
      transform: "scale(1.05)",
    },
    button: {
      background: "#ff7b00",
      color: "white",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
      transition: "0.3s",
    },
    buttonHover: {
      background: "#ff5722",
      transform: "scale(1.05)",
    },
    footer: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#ddd",
    },
    link: {
      color: "#ff7b00",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Welcome Back! 👋</h1>
        <p style={styles.subtitle}>Please enter your credentials to continue</p>
        
        <input type="text" placeholder="Username" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        
        <button 
          style={styles.button} 
          onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseOut={(e) => (e.target.style.background = styles.button.background)}
          onClick={handleLogin}
        >
          Login
        </button>
        
        <p style={styles.footer}>
          Don't have an account? <a href="#" style={styles.link}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
