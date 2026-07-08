import React, {
  useState,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";
import "./Favorites.css";
function Favorites() {

  const [favorites,
    setFavorites] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    loadFavorites();

  }, []);

  function loadFavorites() {

    fetch(
      "http://localhost:3000/favorites/" +
      localStorage.getItem(
        "email"
      )
    )

      .then(res => res.json())

      .then(data => {

        setFavorites(data);

      })

      .catch(err => {

        console.log(err);

      });

  }

  function RemoveFavorite(
    productId
  ) {

    fetch(

      "http://localhost:3000/remove-favorite/" +

      localStorage.getItem(
        "email"
      ) +

      "/" +

      productId,

      {
        method: "DELETE"
      }

    )

      .then(res => res.text())

      .then(data => {

        alert(data);

        loadFavorites();

      })

      .catch(err => {

        console.log(err);

      });

  }

  return(

<div className="favorites-container">

<h1 className="favorites-title">
❤️ My Favorites
</h1>

{

favorites.length === 0 ?

(

<h2 className="no-favorites">
No Favorites Yet
</h2>

)

:

(

<div className="favorites-grid">

{

favorites.map(item => (

<div
key={item._id}
className="favorite-card"
>

<img
src={
"http://localhost:3000/uploads/" +
item.image
}
alt={item.name}
className="favorite-image"
onClick={() =>
navigate(
`/product/${item._id}`
)}
/>

<h3
className="favorite-name"
onClick={() =>
navigate(
`/product/${item._id}`
)}
>
{item.name}
</h3>

<h4 className="favorite-price">
₹{item.price}
</h4>

<p className="favorite-description">
{item.description}
</p>

<div className="favorite-info">

<p>
Category :
{item.category}
</p>

<p>
Stock :
{item.stock}
</p>

</div>

<div className="button-group">

<button
className="view-btn"
onClick={() =>
navigate(
`/product/${item._id}`
)}
>
View Product
</button>

<button
className="remove-btn"
onClick={() =>
RemoveFavorite(
item._id
)}
>
❌ Remove
</button>

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

export default Favorites;