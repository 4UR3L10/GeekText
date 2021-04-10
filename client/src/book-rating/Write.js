import React, { useState } from "react";
import Modal from "react-modal";

//const { v5: uuidv5 } = require("uuid");

function Write({
  //addReview
  bookId,
  userId,
  onSubmit = () => {}
}) {
  const [open, setOpen] = useState(false);

  const [review, setReview] = useState({
    //id: "",
    //username: "", // from who knows where
    comment: "",
    rating: "", // &#10029;
    title: "",
    is_anonymous: "",
  });

  function handleTaskInputChange(e) {
    // updates task property on review object
    setReview({ ...review, comment: e.target.value });
  }
  function handleTitleInputChange(e) {
    setReview({ ...review, title: e.target.value });
  }

  function handleRatingInputChange(e) {
    setReview({ ...review, rating: e.target.value });
  }

  function handleAnonInputChange(e) {
    setReview({ ...review, is_anonymous: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //onClick();
    console.log(review);
    /*
    if (review.comment.trim()) {
      // , id: uuid.v5()
      // for line underneath
      addReview({ ...review });
      setReview({ ...review, comment: "" });
    }
    if (review.title.trim()) {
      addReview({ ...review });
      setReview({ ...review, title: "" });
    }
*/

    fetch(`http://localhost:4000/api/books/${bookId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        book_id: bookId,
        rating: review.rating.length,
        comment: review.title + "\n" + review.comment,
        is_anonymous: review.is_anonymous === "Yes",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json)
        onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  }

  return (
    <div>
      <button
        className="writeareview"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Write a Review
      </button>

      <Modal
        isOpen={open}
        style={{
          overlay: { inset: "100px 500px 320px 500px", backgroundColor: "" },
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1> Write a review</h1>
          <div className="titlediv">Title:</div>
          <textarea
            className="titleinput"
            name="title"
            value={review.title}
            onChange={handleTitleInputChange}
            rows="1"
            cols="20"
            placeholder="Write a title..."
          />
          <div className="reviewdiv">Review:</div>
          <textarea
            className="reviewinput"
            name="comment"
            value={review.comment}
            onChange={handleTaskInputChange}
            rows="7"
            cols="50"
            placeholder="Write a review..."
          />
          <fieldset onChange={handleAnonInputChange}>
            <div className="anondiv">
              Remain anonymous?
              <input type="radio" value="Yes" id="yes" name="anon" />
              <label for="yes">Yes</label>
              <input type="radio" value="No" id="no" name="anon" />
              <label for="no">No</label>
            </div>
          </fieldset>

          <button className="submitbutton" type="submit">
            Submit
          </button>

          <fieldset className="rating" onChange={handleRatingInputChange}>
            <legend>Please rate:</legend>
            <input type="radio" id="star5" name="rating" value="★★★★★" />
            <label for="star5" title="Rocks!">
              5 stars
            </label>
            <input type="radio" id="star4" name="rating" value="★★★★" />
            <label for="star4" title="Pretty good">
              4 stars
            </label>
            <input type="radio" id="star3" name="rating" value="★★★" />
            <label for="star3" title="Meh">
              3 stars
            </label>
            <input type="radio" id="star2" name="rating" value="★★" />
            <label for="star2" title="Kinda bad">
              2 stars
            </label>
            <input type="radio" id="star1" name="rating" value="★" />
            <label for="star1" title="Sucks big time">
              1 star
            </label>
          </fieldset>
        </form>

        <button
          className="closebutton"
          type="button"
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Write;
