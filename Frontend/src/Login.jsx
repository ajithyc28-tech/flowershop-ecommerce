import React, {
  useState,
  useEffect
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "./Login.css";

function Login() {

  const navigate =
  useNavigate();

  const [email,
  setEmail] =
  useState("");

  const [password,
  setPassword] =
  useState("");

  useEffect(() => {

    setEmail("");
    setPassword("");

  }, []);

  async function LoginUser() {

    if (email.trim() === "") {
      alert("Email is required");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter Valid Email");
      return;
    }

    if (password.trim() === "") {
      alert("Password is required");
      return;
    }

    if (password.length < 8) {
      alert(
        "Password must be at least 8 characters"
      );
      return;
    }

    try {

      const response =
      await fetch(
        "http://localhost:3000/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data =
      await response.json();

      if (data.success) {

        localStorage.setItem(
          "email",
          email
        );

        localStorage.setItem(
          "username",
          data.username || email
        );

        localStorage.setItem(
          "token",
          data.token || ""
        );

        alert(
          "Login Successful"
        );

        navigate("/");

      }
      else {

        alert(
          data.message ||
          "Invalid Email Or Password"
        );

      }

    }
    catch (error) {

      console.log(error);

      alert(
        "Server Error"
      );

    }

  }

  return (

    <div className="login-container">

      <div className="login-box">

        <h1 className="login-title">

          <span className="title1">
            Flower
          </span>

          <span className="title2">
            Login
          </span>

        </h1>

        <form
          autoComplete="off"
          onSubmit={(e) => {

            e.preventDefault();

            LoginUser();

          }}
        >

          <input
            className="login-input"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            className="login-input"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p
          style={{
            marginTop: "10px"
          }}
        >

          <Link
           className="forgot-link"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>

        </p>

        <p className="register-text">

          Don't have an account?

          <Link
            className="register-link"
            to="/register"
          >
            Register Now
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;