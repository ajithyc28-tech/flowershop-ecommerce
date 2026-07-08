import React,{
useState,
useEffect
} from "react";
import "./AdminOrders.css";
function AdminOrders(){

const [orders,
setOrders] =
useState([]);

useEffect(()=>{

fetch(
"http://localhost:3000/orders"
)
.then(res=>res.json())
.then(data=>{

setOrders(data);

});

},[]);

return(

<div className="orders-container">

    <h1 className="orders-title">
        📦 All Orders
    </h1>

    <div className="orders-grid">

    {

    orders.map(order=>(

    <div
    key={order._id}
    className="order-card"
    >

        <img
        src={
        "http://localhost:3000/uploads/" +
        order.productImage
        }
        alt=""
        />

        <h3 className="product-name">
            {order.productName}
        </h3>

        <h2 className="product-price">
            ₹{order.productPrice}
        </h2>

        <div className="customer-info">

            <p>
            👤 {order.name}
            </p>

            <p>
            📧 {order.email}
            </p>

            <p>
            📞 {order.phone}
            </p>

            <p>
            📍 {order.address}
            </p>

            <p>
            📮 {order.pincode}
            </p>

        </div>

    </div>

    ))

    }

    </div>

</div>

);
}
export default AdminOrders;