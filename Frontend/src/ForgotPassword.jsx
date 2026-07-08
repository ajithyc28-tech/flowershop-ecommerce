import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function SendOTP() {
    if (email.trim() === "") {
      alert("Email is required");
      return;
    }

    const response = await fetch(
      "http://localhost:3000/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("email", email);
      alert(data.message);
      navigate("/verify-otp");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="forgot-container">
      <div className="forgot-box">

        <h1 className="forgot-title">
          <span className="title1">Forgot</span>
          <span className="title2"> Password</span>
        </h1>

        <input
          className="forgot-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="forgot-btn"
          onClick={SendOTP}
        >
          Send OTP
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;