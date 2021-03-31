import React from "react";
import request from "superagent";

function searchBook(e, genre) {
  e.preventDefault();
  request
    .get(`http://localhost:4000/api/books?genre=${genre}`)
    .query({ q: this.state.searchField })
    .then((data) => {
      console.log(data);
      //this is the problem because it is just
      this.setState({ books: [...data.body] });
    });
}

export default searchBook;
