import React,{
  useState,
  useEffect,
  useRef
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "./Products.css";

function Products() {

  const [products,setProducts] =
  useState([]);

  const navigate =
  useNavigate();

  const sliderRef =
  useRef(null);

  useEffect(()=>{

    fetch(
      "http://localhost:3000/products"
    )
    .then(res=>res.json())
    .then(data=>{

      setProducts(data);

    });

  },[]);

  function ScrollLeft(){

    sliderRef.current.scrollBy({
      left:-500,
      behavior:"smooth"
    });

  }

  function ScrollRight(){

    sliderRef.current.scrollBy({
      left:500,
      behavior:"smooth"
    });

  }

  const topProducts =
  products;

  const otherProducts =
  products.slice(5);

  return(

    <div className="products-container">

      <h1 className="title">
        🌸 Flower Shop
      </h1>

      <div className="slider-container">

        <button
          className="arrow-btn"
          onClick={ScrollLeft}
        >
          ◀
        </button>

        <div
          className="slider-row"
          ref={sliderRef}
        >

          {topProducts.map(item => (

            <div
              key={item._id}
              className="product-card"
            >

              <img
                src={
                  "http://localhost:3000/uploads/" +
                  item.image
                }
                alt={item.name}
                className="product-image"
                onClick={() =>
                  navigate(
                    `/product/${item._id}`
                  )
                }
              />

              <h3>
                {item.name}
              </h3>

              <h4>
                ₹{item.price}
              </h4>

              <button
                className="view-btn"
                onClick={() =>
                  navigate(
                    `/product/${item._id}`
                  )
                }
              >
                View Product
              </button>

            </div>

          ))}

        </div>

        <button
          className="arrow-btn"
          onClick={ScrollRight}
        >
          ▶
        </button>

      </div>

      <h2 className="subtitle">
        More Products
      </h2>

      <div className="products-grid">

        {otherProducts.map(item => (

          <div
            key={item._id}
            className="product-card"
          >

            <img
              src={
                "http://localhost:3000/uploads/" +
                item.image
              }
              alt={item.name}
              className="product-image"
              onClick={() =>
                navigate(
                  `/product/${item._id}`
                )
              }
            />

            <h3>
              {item.name}
            </h3>

            <h4>
              ₹{item.price}
            </h4>

            <button
              className="view-btn"
              onClick={() =>
                navigate(
                  `/product/${item._id}`
                )
              }
            >
              View Product
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Products;