import React,
{
    useState,
    useEffect
}
from "react";

function Orders(){

    const [orders,
    setOrders] =
    useState([]);

    useEffect(()=>{

        loadOrders();

    },[]);

    function loadOrders(){

        const token =
        localStorage.getItem(
            "adminToken"
        );

        fetch(
            "http://localhost:3000/orders",
            {
                headers:{
                    token:token
                }
            }
        )
        .then(res=>res.json())
        .then(data=>{

            setOrders(data);

        });

    }

    async function UpdateStatus(
        id,
        status
    ){

        const token =
        localStorage.getItem(
            "adminToken"
        );

        await fetch(
            "http://localhost:3000/update-order-status/" + id,
            {
                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json",

                    token:token
                },

                body:JSON.stringify({
                    status:status
                })
            }
        );

        loadOrders();

    }

    return(

        <div>

            <h1>
                Customer Orders
            </h1>

            {
                orders.map(
                (item)=>(

                <div
                key={item._id}
                style={{
                    border:
                    "1px solid black",
                    margin:"10px",
                    padding:"10px"
                }}>

                    <h3>
                        {item.name}
                    </h3>

                    <p>
                        Email:
                        {item.email}
                    </p>

                    <p>
                        Phone:
                        {item.phone}
                    </p>

                    <p>
                        Address:
                        {item.address}
                    </p>

                    <p>
                        Pincode:
                        {item.pincode}
                    </p>

                    <p>
                        Quantity:
                        {item.quantity}
                    </p>

                    <p>
                        Current Status:
                        {item.status}
                    </p>

                    <select
                    value={item.status}
                    onChange={(e)=>
                    UpdateStatus(
                        item._id,
                        e.target.value
                    )}
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Confirmed">
                            Confirmed
                        </option>

                        <option value="Shipped">
                            Shipped
                        </option>

                        <option value="Delivered">
                            Delivered
                        </option>

                    </select>

                </div>

                ))
            }

        </div>

    );

}

export default Orders;