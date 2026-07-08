import React, {
    useState,
    useEffect
} from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();

    const [name, setName] =
    useState("");

    const [price, setPrice] =
    useState("");

    const [image, setImage] =
    useState("");

    const [description,
    setDescription] =
    useState("");

    const [stock,
    setStock] =
    useState("");

    const [category,
    setCategory] =
    useState("");

    const [products,
    setProducts] =
    useState([]);
    function Logout(){

    localStorage.removeItem(
        "adminToken"
    );

    navigate(
        "/admin-login"
    );

}
function Logout(){

    localStorage.removeItem(
        "adminToken"
    );

    navigate(
        "/admin-login"
    );

}

    useEffect(() => {

        const token =
        localStorage.getItem(
            "adminToken"
        );

        if (!token) {
            navigate("/admin-login");
            return;
        }

        loadProducts();

    }, []);

    function loadProducts() {

        fetch(
            "http://localhost:3000/products"
        )
        .then(res => res.json())
        .then(data => {

            console.log(data);

            setProducts(data);

        });

    }

    async function Add() {

        const formData =
        new FormData();

        formData.append(
            "name",
            name
        );

        formData.append(
            "price",
            price
        );

        formData.append(
            "image",
            image
        );

        formData.append(
            "description",
            description
        );

        formData.append(
            "stock",
            stock
        );

        formData.append(
            "category",
            category
        );

        const token =
        localStorage.getItem(
            "adminToken"
        );

        await fetch(
            "http://localhost:3000/add-product",
            {
                method: "POST",

                headers: {
                    token: token
                },

                body: formData
            }
        );

        loadProducts();

    }

    async function Delete(id) {

        const token =
        localStorage.getItem(
            "adminToken"
        );

        await fetch(
            "http://localhost:3000/delete-product/" + id,
            {
                method: "DELETE",

                headers: {
                    token: token
                }
            }
        );

        loadProducts();

    }
        return(

<div className="admin-container">

    <div className="sidebar">

        <h2 className="logo">
            🌸 Flower Shop
        </h2>

        

        <button
        className="menu-btn"
        onClick={() =>
        navigate("/orders")}>
            Orders
        </button>
        <button
        className="menu-btn"
                onClick={() =>
                    navigate("/message")
                }
            >
                Messages
            </button>

    

        <button
        className="menu-btn"
        onClick={Logout}>
            Logout
        </button>

    </div>

    <div className="main-content">

        <h1 className="admin-title">
            Admin Dashboard
        </h1>

        <div className="form-card">

            <input
            value={name}
            placeholder="Product Name"
            onChange={(e)=>
            setName(e.target.value)}
            />

            <input
            value={price}
            placeholder="Price"
            onChange={(e)=>
            setPrice(e.target.value)}
            />

            <input
            type="file"
            accept="image/*"
            onChange={(e)=>
            setImage(
            e.target.files[0]
            )}
            />

            <input
            value={description}
            placeholder="Description"
            onChange={(e)=>
            setDescription(
            e.target.value
            )}
            />

            <input
            value={stock}
            placeholder="Stock"
            onChange={(e)=>
            setStock(
            e.target.value
            )}
            />

            <input
            value={category}
            placeholder="Category"
            onChange={(e)=>
            setCategory(
            e.target.value
            )}
            />

            <button
            className="add-btn"
            onClick={Add}>
                Add Product
            </button>

        </div>

        <div className="products-grid">

        {
        products.map(item=>(

        <div
        key={item._id}
        className="product-card">

            <img
            src={
            "http://localhost:3000/uploads/" +
            item.image
            }
            alt=""
            />

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <button
            className="delete-btn"
            onClick={()=>
            Delete(item._id)
            }>
                Delete
            </button>

        </div>

        ))
        }

        </div>

    </div>

</div>

);

}

export default AddProduct;