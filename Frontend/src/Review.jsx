import React, { useState } from "react";
import "./Review.css";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  function addReview() {
    if (!name || !message || rating === 0) {
      alert("Please fill all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      rating,
      message,
    };

    setReviews([...reviews, newReview]);

    setName("");
    setRating(0);
    setMessage("");
    setShowForm(false);
  }

  return (
    <div className="review-container">
      <h1 className="colors1">Customer</h1><h1 className="colors2"> Reviews</h1>

      <button
        className="add-review-btn"
        onClick={() => setShowForm(!showForm)}
      >
        Add Review
      </button>

      {showForm && (
        <div className="review-form">
          <input
            className="review-input"
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <div className="star-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star"
                onClick={() => setRating(star)}
              >
                {star <= rating ? "⭐" : "☆"}
              </span>
            ))}
          </div>

          <br />

          <textarea
            className="review-textarea"
            rows="4"
            placeholder="Write your review..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <br />
          <br />

          <button
            className="submit-btn"
            onClick={addReview}
          >
            Submit Review
          </button>
        </div>
      )}

      <hr className="review-line" />

      {reviews.map((item) => (
        <div
          key={item.id}
          className="review-card"
        >
          <h3 className="review-name">
            {item.name}
          </h3>

          <p className="review-stars">
            {"⭐".repeat(item.rating)}
          </p>

          <p className="review-message">
            {item.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Review;