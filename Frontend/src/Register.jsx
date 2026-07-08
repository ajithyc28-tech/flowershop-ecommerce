import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function RegisterUser() {
    if (name.trim().length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }

    if (username.trim().length < 4) {
      alert("Username must be at least 4 characters");
      return;
    }

    if (username.includes(" ")) {
      alert("Username should not contain spaces");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Enter a valid email");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(password)) {
      alert(
        "Password must contain uppercase, lowercase, number and special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(
      "http://localhost:3000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Registration Successful");
      navigate("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">

        <h1 className="register-title">
          <span className="title1">Create</span>
          <span className="title2"> Account</span>
        </h1>

        <input
          className="register-input"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          className="register-btn"
          onClick={RegisterUser}
        >
          Register
        </button>

        <p className="forgot-text">
          <Link
            className="forgot-link"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;