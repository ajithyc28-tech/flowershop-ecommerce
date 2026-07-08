import React, { useState } from "react";
import "./ResetPassword.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function Reset() {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(newPassword)) {
      alert(
        "Password must contain uppercase, lowercase, number and special character"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const email = localStorage.getItem("email");

    const response = await fetch(
      "http://localhost:3000/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      window.location.href = "/login";
    }
  }

  return (
    <div className="reset-container">
      <div className="reset-box">

        <h1 className="reset-title">
          <span className="title1">Reset</span>
          <span className="title2"> Password</span>
        </h1>

        <input
          className="reset-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <input
          className="reset-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          className="reset-btn"
          onClick={Reset}
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;