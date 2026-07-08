import React,{
  useState,
  useEffect
} from "react";
import {
  useNavigate
} from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate =
useNavigate();

  const [cart,
    setCart] =
    useState([]);

  useEffect(() => {

    fetch(
      "http://localhost:3000/cart/" +
      localStorage.getItem("email")
    )
    .then(res => res.json())
    .then(data => {

  console.log(data);

  const updatedData =
    data.map(item => ({
      ...item,
      quantity: 1
    }));

  setCart(updatedData);

});

  }, []);

  function Increase(id) {

    setCart(

      cart.map(item =>

        item._id === id

          ? {
              ...item,
              quantity:
                item.quantity + 1
            }

          : item

      )

    );

  }

  function Decrease(id) {

    setCart(

      cart.map(item =>

        item._id === id

          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1
            }

          : item

      )

    );

  }

  function RemoveCart(id) {

    fetch(
      "http://localhost:3000/cart/" + id,
      {
        method: "DELETE"
      }
    )
    .then(res => res.text())
    .then(data => {

      alert(data);

      setCart(
        cart.filter(
          item =>
            item._id !== id
        )
      );

    });

  }

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );
    function Checkout(){

  if(cart.length === 0){

    alert(
      "Cart is Empty"
    );

    return;
  }

  navigate("/order/" + cart[0]._id);

}

  return (

    <div className="cart-container">

      <h1 className="cart-title">
🛒 My Cart
</h1>

      {

        cart.length === 0 ?

        (

          <h2>
            Cart Empty
          </h2>

        )

        :

        (

          cart.map(item => (

            <div
key={item._id}
className="cart-card"
>

              <img
  src={
    "http://localhost:3000/uploads/" +
    item.image
  }
  alt={item.name}
  width="150"
  height="150"
  className="cart-image"
/>
<div className="product-details">
              <h3 className="product-name">
                {item.name}
              </h3>
              <h4>
                Price: ₹{item.price}
              </h4>
              <p>
                Quantity: {item.quantity}
              </p>
              <p>
                Item Total:
                ₹{item.price * item.quantity}
              </p></div>
              <button className="qty-btn"
                onClick={() =>
                  Decrease(
                    item._id
                  )
                }
              >
                -
              </button>
              

              <span
                style={{
                  margin:"10px"
                }}
              >
                {item.quantity}
              </span>

              <button className="qty-btn"
                onClick={() =>
                  Increase(
                    item._id
                  )
                }
              >
                +
              </button>

              <br />
              <br />

              <button className="remove-btn"
                onClick={() =>
                  RemoveCart(
                    item._id
                  )
                }
              >
                ❌ Remove
              </button>

            </div>

          ))

        )

      }

      <hr />

      <h2 className="total">
        Total: ₹{total}
      </h2>

      <button className="checkout-btn"
onClick={Checkout}
>
  Proceed To Checkout
</button>

    </div>
    

  );

}

export default Cart;