import React,{
useState,
useEffect
} from "react";

import {
useParams
} from "react-router-dom";
import "./OrderSuccess.css";
import { useNavigate } from "react-router-dom";
function OrderSuccess(){
    const navigate = useNavigate();

const { id } =
useParams();

console.log(id);

const [product,
setProduct] =
useState(null);

useEffect(()=>{

fetch(
"http://localhost:3000/product/" +
id
)
.then(res=>res.json())
.then(data=>{

    console.log(
        "Product Data:",
        data
    );

    setProduct(data);

})
.catch(err=>{

    console.log(err);

});

},[id]);

if(!product){

return <h1>
Loading...
</h1>;

}

return(

<div className="success-container">

    <div className="success-card">

        <div className="success-icon">
            ✅
        </div>

        <h1 className="success-title">
            Order Placed Successfully
        </h1>

        <h2 className="product-name">
            {product.name}
        </h2>

        <img
        src={
        "http://localhost:3000/uploads/" +
        product.image
        }
        alt={product.name}
        className="product-image"
        />

        <p className="success-message">
            Thank you for shopping with us.
            Your flower order has been placed successfully.
        </p>

        <button
        className="home-btn"
        onClick={()=>
        navigate("/products")
        }>
            Continue Shopping
        </button>

    </div>

</div>

);

}

export default OrderSuccess;

