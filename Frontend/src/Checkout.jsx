import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";
import "Checkout.css";
function Checkout() {

  const navigate =
    useNavigate();

  const [address,
    setAddress] =
    useState("");

  const [city,
    setCity] =
    useState("");

  const [pincode,
    setPincode] =
    useState("");

  function PlaceOrder() {

    fetch(
      "http://localhost:3000/place-order",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          email:
            localStorage.getItem(
              "email"
            ),

          address,
          city,
          pincode

        })

      }
    )
    .then(res => res.text())
    .then(data => {

      alert(data);

      navigate(
        "/ordersuccess"
      );

    });

  }

  return(

<div className="checkout-container">

    <div className="checkout-card">

        <div className="order-icon">
            🌸
        </div>

        <h1 className="checkout-title">
            Checkout
        </h1>

        <input
        className="checkout-input"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e)=>
        setAddress(e.target.value)}
        />

        <input
        className="checkout-input"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e)=>
        setCity(e.target.value)}
        />

        <input
        className="checkout-input"
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e)=>
        setPincode(e.target.value)}
        />

        <button
        className="place-order-btn"
        onClick={PlaceOrder}
        >
            Place Order
        </button>

    </div>

</div>

);

}

export default Checkout;