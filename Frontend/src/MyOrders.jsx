import React,{
useState,
useEffect
} from "react";

import "./MyOrders.css";

function MyOrders(){

const [orders,
setOrders] =
useState([]);

useEffect(()=>{

const email =
localStorage.getItem(
"email"
);

console.log(
"Email:",
email
);

if(!email){

console.log(
"No email found in localStorage"
);

return;
}

fetch(
"http://localhost:3000/my-orders/" +
localStorage.getItem("email")
)

.then(res=>res.json())

.then(data=>{

console.log(
"Orders Data:",
data
);

setOrders(data);

})

.catch(err=>{

console.log(
"Error:",
err
);

});

},[]);

return(

<div className="orders-container">

<h1 className="orders-title">
📦 My Orders
</h1>

{

orders.length === 0 ?

(

<h2 className="no-orders">
No Orders Found
</h2>

)

:

(

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
className="order-image"
/>

<h2 className="product-name">
{order.productName}
</h2>

<h3 className="product-price">
₹{order.productPrice}
</h3>

<div className="product-info">

<p>
Description :
{order.productDescription}
</p>

<p>
Category :
{order.productCategory}
</p>

<p>
Stock :
{order.productStock}
</p>

</div>

<div className="customer-info">

<h3>
Customer Details
</h3>

<p>
Name :
{order.name}
</p>

<p>
Email :{order.email}
</p>

<p>
Phone :
{order.phone}
</p>

<p>
Address :
{order.address}
</p>

<p>
Pincode :
{order.pincode}
</p>

<p>
Status :
<span className="status">
{order.status}
</span>
</p>

</div>

</div>

))

}

</div>

)

}

</div>

);

}

export default MyOrders;