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
        const access_token = result.access_token; // Access token should be in the response data
    
        // Assuming 'window.putData' is intended to store the token (corrected to 'window.localStorage' or other method)
        window.localStorage.setItem("access_token", access_token); // Example: storing in localStorage
    
        setSuccessMessage(result.message || "Signup successful!");
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || "An error occurred during signup.");
      }
    } catch (error) {
      setError("An error occurred while processing the request.");
    }
  };    

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center justify-content-center h-100 gradient-custom-3">
  <div className="container d-flex justify-content-center align-items-center h-100">
    <div className="col-12 col-md-8 col-lg-5">
      <div className="card custom-card">
        <div className="card-body p-3">
          <h4 className="text-uppercase text-center mb-3">Sign Up</h4>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="repeat-password">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="repeat-password"
                        className="form-control"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>
                    <p className="text-center text-muted mt-3">
                      Already have an account?{" "}
                      <Link to="/login" className="fw-bold">
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>

      </div>
    </section>
  );
};

export default Signup;
