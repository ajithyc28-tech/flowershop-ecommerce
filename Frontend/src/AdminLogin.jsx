import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function Logout(){

    localStorage.removeItem(
        "adminToken"
    );

    navigate(
        "/admin-login"
    );
}

  async function Login() {

    const response = await fetch(
        "http://localhost:3000/admin-login",
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

    if(data.success){

        localStorage.setItem(
            "adminToken",
            data.token
        );

        navigate(
            "/add-product"
        );

    }
    else{

        alert(
            "Invalid Admin Login"
        );

    }

}

  return(

<div className="admin-login-container">

    <div className="login-card">

        <div className="login-icon">
            🌸
        </div>

        <h1 className="login-title">
            Admin Login
        </h1>

        <input
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e)=>
        setEmail(e.target.value)}
        />

        <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>
        setPassword(e.target.value)}
        />

        <button
        className="login-btn"
        onClick={Login}
        >
            Login
        </button>

        <button
        className="logout-btn"
        onClick={Logout}
        >
            Logout
        </button>

    </div>

</div>

);
}

export default AdminLogin;