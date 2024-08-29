import React, { useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    // console.log("Form submitted", { email, password });
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid credentials");
    } else if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", email);
      // console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2 className="title">Log In</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Log In
          </button>
          <Link to="/sign-up" className="go-to-login">
            Not a user? Sign Up!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
