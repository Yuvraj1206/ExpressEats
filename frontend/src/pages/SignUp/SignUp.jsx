import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    // console.log("Form submitted", { name, location: address, email, password });
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, location: address, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid credentials");
    } else if (json.success) {
      setName("");
      setAddress("");
      setEmail("");
      setPassword("");
      localStorage.setItem("userEmail", email);
      navigate("/log-in");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="label">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="input"
            />
          </div>
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
            Sign Up
          </button>
          <Link to="/log-in" className="go-to-login">
            Already a user? Log-In!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
