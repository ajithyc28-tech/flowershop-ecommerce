import React, { useState } from "react";
import "./About.css";
function About(){
    const[show,setshow]=useState(false);
    return(
        <div className="home-container1">
            <h1 className="color4"> About </h1><h1 className="color5"> Us </h1>
            <h3 className="color6"> Why Choose Us </h3>
            <p>At Fresh Flower, we are committed to providing the highest quality flowers that are fresh, natural, and beautifully arranged. Our flowers are carefully selected to ensure long-lasting freshness and vibrant colors. We offer a wide variety of flowers for every occasion, including birthdays, weddings, anniversaries, and special celebrations. Customer satisfaction is our top priority, and we strive to deliver excellent service with affordable prices. Whether you are looking for a thoughtful gift or a beautiful decoration, our fresh flowers bring beauty, fragrance, and happiness to every moment. 🌸🌹🌻</p>
            {
                show &&(
                    <p>Choosing Fresh Flower means choosing quality, beauty, and trust. We are passionate about bringing nature's beauty closer to you and helping you share joy, love, and happiness with your family, friends, and loved ones through the gift of flowers. Our commitment to excellence and attention to detail make us the preferred choice for flower lovers everywhere. 🌹🌸🌻🌺🌼🌷</p>
                )
            }
            <button onClick={()=>setshow(!show)}>
                {show ?"Hide":"Show More"}
            </button>
        </div>
    );
}
export default About;