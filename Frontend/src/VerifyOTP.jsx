import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  async function Verify() {
  console.log("Button Clicked");

  if (otp.length !== 6) {
    alert("OTP must be 6 digits");
    return;
  }

  const email =
    localStorage.getItem("email");

  console.log(email);
  console.log(otp);

  const response = await fetch(
    "http://localhost:3000/verify-otp",
    {
      method: "POST",
      headers: {
        "Content-Type":
        "application/json"
      },
      body: JSON.stringify({
        email,
        otp
      })
    }
  );

  const data =
  await response.json();

  console.log(data);

  if (data.success) {
    navigate("/reset-password");
  }
  else {
    alert(data.message);
  }
}
  return (
    <div>
      <h1>Verify OTP</h1>

      <input
        type="text"
        placeholder="Enter 6 Digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={Verify}>
        Verify OTP
      </button>
    </div>
  );
}

export default VerifyOTP;