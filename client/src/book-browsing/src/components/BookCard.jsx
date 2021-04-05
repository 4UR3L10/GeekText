import React from "react";

const BookCard = (props) => {
  return (
    <div className="card-container">
      <img src={props.image} alt="" />

      <div className="desc">
        <h2>{props.title}</h2>
        <h3>Author: {props.author}</h3>
        <h3>Date Published: {props.published.substring(0, 4)}</h3>
        <h3>Average Rating: {props.rating}</h3>
        <div>
          <h3>Price: ${props.price} USD</h3>
          <a href={`/books/${props.id}`} className="details-button">
            {" "}
            More Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

//Date published is checking to see if the published date is unavaible.
//If it isnt, replace with not available,
//If it is, only render the 4th argument which is the year
