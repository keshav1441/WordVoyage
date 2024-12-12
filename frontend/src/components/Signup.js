import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const payload = { name, username, email, password };
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log(result); // Debug: Ensure `userid` is in the response
    
        const access_token = result.access_token;
        const userId = result.userid; // Extract `userid`
    
        if (!userId) {
            console.error("User ID is undefined in the response!");
            setError("User ID is missing. Please try again.");
            return;
        }
    
        // Store the access token
        window.localStorage.setItem("access_token", access_token);
    
        setSuccessMessage(result.message || "Signup successful!");
    
        // Redirect to the dashboard with the userId
        window.location.href = `/dashboard/${userId}`;
    } else {
        const errorResult = await response.json();
        
        setError(errorResult.message || "An error occurred during signup.");
    }}
     catch (error) {
      setError("An error occurred while processing the request.");
    }
  };    

  return (
    <div className="container">
    <form className="form" onSubmit={handleSubmit}>
      <div className="title">
        Welcome,<br />
        <span>sign up to continue</span>
      </div>
      <input
        className="input"
        name="name"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        name="username"
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        name="email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        name="password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input"
        name="repeat-password"
        placeholder="Confirm Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <div className="alert-container">
  {error && <div className="alert alert-danger">{error}</div>}
  {successMessage && <div className="alert alert-success">{successMessage}</div>}
</div>

      <button type="submit" className="button-confirm">
        Let's go →
      </button>

      <p className="text-center text-muted mt-2">
        Already have an account? <Link to="/login" className="fw-bold">Login here</Link>
      </p>
    </form>
    </div>
  );
};

export default Signup;
