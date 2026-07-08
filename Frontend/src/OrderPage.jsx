import React,{
useState
} from "react";
import {
useEffect
} from "react";

import {
useParams,
useNavigate
} from "react-router-dom";
import "./OrderPage.css";
function OrderPage(){

const { id } =
useParams();

const navigate =
useNavigate();

const [name,setName] =
useState("");

const [email,setEmail] =
useState(
localStorage.getItem("email") || ""
);

const [phone,setPhone] =
useState("");

const [address,setAddress] =
useState("");

const [pincode,setPincode] =
useState("");
useEffect(()=>{

  if(
    !localStorage.getItem(
      "email"
    )
  ){

    alert(
      "Please Login First"
    );

    navigate(
      "/login"
    );

  }

},[]);

async function PlaceOrder(){

if(name.trim() === ""){
alert("Name is required");
return;
}

if(email.trim() === ""){
alert("Email is required");
return;
}

if(
!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(email)
){
alert("Enter valid email");
return;
}

if(phone.trim() === ""){
alert("Phone Number is required");
return;
}

if(
!/^[0-9]{10}$/
.test(phone)
){
alert(
"Phone Number must be exactly 10 digits"
);
return;
}

if(address.trim() === ""){
alert("Address is required");
return;
}

if(pincode.trim() === ""){
alert("Pincode is required");
return;
}

if(
!/^[0-9]{6}$/
.test(pincode)
){
alert(
"Pincode must be exactly 6 digits"
);
return;
}

await fetch(
"http://localhost:3000/buy",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

name,
email,
phone,
address,
pincode,
productId:id,
quantity:1

})

}
);

alert(
"Order Placed Successfully"
);

navigate(
"/order-success/" + id
);

}

return(

<div className="order-container">

    <div className="order-card">

        <div className="order-icon">
            🌸
        </div>

        <h1 className="order-title">
            Place Order
        </h1>

        <input
        className="order-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e)=>
        setName(e.target.value)}
        />

        <input
        className="order-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>
        setEmail(e.target.value)}
        />

        <input
        className="order-input"
        type="text"
        placeholder="Phone Number"
        value={phone}
        maxLength="10"
        onChange={(e)=>
        setPhone(
        e.target.value.replace(/[^0-9]/g,"")
        )}
        />

        <textarea
        className="order-textarea"
        placeholder="Address"
        value={address}
        onChange={(e)=>
        setAddress(e.target.value)}
        />

        <input
        className="order-input"
        type="text"
        placeholder="Pincode"
        value={pincode}
        maxLength="6"
        onChange={(e)=>
        setPincode(
        e.target.value.replace(/[^0-9]/g,"")
        )}
        />

        <button
        className="buy-btn"
        onClick={PlaceOrder}
        >
            ⚡ Buy Now
        </button>

    </div>

</div>

);
}

export default OrderPage;