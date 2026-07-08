import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home(){
    const navigate=useNavigate();
    function Button1(){
        navigate("/products");
    }
    return(
        <div className="home-container">
            <h1 className="color1"> Fresh </h1><h1 className="color2"> Flower </h1>
            <h3 className="color3"> Natural & Beautiful Flower </h3>
            <p>Flowers are one of the most beautiful creations of nature. They come in different colors, shapes, sizes, and fragrances. Flowers play an important role in the life cycle of plants by helping in reproduction through pollination. They provide nectar and pollen to insects such as bees and butterflies. Flowers are widely used for decoration, religious ceremonies, gifts, perfumes, and medicines. Some popular flowers include roses, lilies, sunflowers, jasmine, and lotus. Besides their beauty, flowers help create a pleasant environment and bring happiness to people. They are considered a symbol of love, peace, and friendship in many cultures around the world. 🌸🌹🌻</p>
            <button onClick={Button1} className="id3"> Shop Now </button>
        </div>
    );
}
export default Home;