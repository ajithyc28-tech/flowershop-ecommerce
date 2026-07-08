import React, {
  useState,
  useEffect
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";
import "./ProductDetails.css";
function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [isFavorite,setIsFavorite] =useState(false);

  const [product, setProduct] =useState(null);

useEffect(() => {

    fetch(
        "http://localhost:3000/product/" +
        id
    )
    .then(res => res.json())
    .then(data => {

        setProduct(data);

    });

}, [id]);

  function Favorite() {
     if(!localStorage.getItem("email")){

    alert(
      "Please Login First"
    );

    navigate("/login");

    return;
  }

    fetch(
      "http://localhost:3000/add-favorite",
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

          productId: id

        })

      }
    )
      .then(res => res.text())
      .then(data => {

        alert(data);

        setIsFavorite(true);

      });

  }

  function AddToCart() {
      if(!localStorage.getItem("email")){

    alert(
      "Please Login First"
    );

    navigate("/login");

    return;
  }

    fetch(
      "http://localhost:3000/add-cart",
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

          productId: id

        })

      }
    )
      .then(res => res.text())
      .then(data => {

        alert(data);

      });

  }

  function BuyNow() {
      if(!localStorage.getItem("email")){

    alert(
      "Please Login First"
    );

    navigate("/login");

    return;
  }
  navigate(
    `/order/${id}`
  );
  }

  if (!product) {

    return (
        <h1>
            Loading...
        </h1>
    );

}

  return(

<div className="details-container">

    <button
    className="back-btn"
    onClick={()=>
    navigate("/products")
    }>
        ← Back
    </button>

    <div className="details-card">

        <div className="image-section">

            <img
            src={
            "http://localhost:3000/uploads/" +
            product.image
            }
            alt={product.name}
            className="product-image"
            />

        </div>

        <div className="info-section">

            <h1 className="product-name">
                {product.name}
            </h1>

            <h2 className="product-price">
                ₹{product.price}
            </h2>

            <p className="product-description">
                {product.description}
            </p>

            <div className="button-group">

                <button
                className="favorite-btn"
                onClick={Favorite}
                >
                    {isFavorite
                    ? "❤️ Added"
                    : "🤍 Favorite"}
                </button>

                <button
                className="cart-btn"
                onClick={AddToCart}
                >
                    🛒 Add To Cart
                </button>

                <button
                className="buy-btn"
                onClick={BuyNow}
                >
                    ⚡ Buy Now
                </button>

            </div>

        </div>

    </div>

</div>

);

}

export default ProductDetails;