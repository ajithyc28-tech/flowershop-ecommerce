import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";
import Review from "./Review";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";
import Cart from "./Cart";
import Favorites from "./Favorites";
import OrderPage from "./OrderPage";
import OrderSuccess from "./Ordersuccess";
import MyOrders from "./MyOrders";
import AdminLogin from "./AdminLogin";
import Orders from "./Orders";
import ContactMessages from "./message";
function App() {

  const username =
    localStorage.getItem("username");

  const [menuOpen,
    setMenuOpen] =
    useState(false);

  function Logout() {

    localStorage.removeItem("email");
    localStorage.removeItem("username");

    alert("Logged Out");

    window.location.href =
      "/login";

  }

  return (

    <BrowserRouter>

      <nav>

        <div className="logo">
          Flower🌸
        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/review">
            Review
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          {
  username ? (
    <span className="welcome">
      Welcome {username}
    </span>
  ) : (
    <Link to="/login">
      Login
    </Link>
  )
}

        </div>
<div
  className="menu-icon"
  onClick={() =>
    setMenuOpen(!menuOpen)
  }
>
  ☰
</div>

{menuOpen && (
  <div
    className="menu-overlay"
    onClick={() =>
      setMenuOpen(false)
    }
  ></div>
)}

<div
  className={
    menuOpen
      ? "menu active"
      : "menu"
  }
>

  <Link
    to="/add-product"
    onClick={() =>
    setMenuOpen(false)}
  >
    Add Product & Admin
  </Link>

  <Link
    to="/cart"
    onClick={() =>
    setMenuOpen(false)}
  >
    Cart
  </Link>

  <Link
    to="/favorites"
    onClick={() =>
    setMenuOpen(false)}
  >
    Favorites
  </Link>

  <Link
    to="/my-orders"
    onClick={() =>
    setMenuOpen(false)}
  >
    My Orders
  </Link>

  {
    username && (
      <button
        onClick={Logout}
      >
        Logout
      </button>
    )
  }

</div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/review"
          element={<Review />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/order/:id"
          element={<OrderPage />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/order-success/:id"
          element={<OrderSuccess />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />
         <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/orders" element={<Orders/>}/>
         <Route
    path="/message"
    element={<ContactMessages />}
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;