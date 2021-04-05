import React, { Component } from "react";
import SearchBar from "./searchBar";
import request from "superagent";
import BookList from "./BookList";
import "../App.css";
import { withRouter } from "react-router-dom";

//searchField will be updated to whatever is typed in through handleSearch
class Rating extends Component {
  constructor(props) {
    super(props);
    this.rating = this.props.match.params.avg_rating;
    this.state = {
      books: [],
      searchField: "",
      sort: "",
    };
  }

  componentDidMount() {
    this.searchBook();
  }

  //in get, put in the URL in which we pull the books from, currently using info from google api
  //search term will be what is changed (key term) to pull info

  searchBook = () => {
    console.log(this.avg_rating);
    // e.preventDefault();
    request
      .get(
        this.rating
          ? `http://localhost:4000/api/books?rating=${this.rating}`
          : `http://localhost:4000/api/books`
      )
      .query({ q: this.state.searchField })
      .then((data) => {
        console.log(data);
        this.setState({ books: [...data.body] });
      });
  };

  //set state every time something is typed in input box
  //e = event
  //value is whatever is entered in searchField
  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  };

  //updating the value of e to whatever the user selected in the sort tag
  handleSort = (e) => {
    console.log(e.target.value);
    this.setState({ sort: e.target.value });
  };

  //passing handleSearch as a function with prop, so that search bar can use it
  render() {
    const sortedBooks = this.state.books.sort((a, b) => {
      if (this.state.sort === "Newest") {
        //sorting by starting year (0,4) and concverting to int
        return (
          parseInt(b.published_date.substring(0, 4)) -
          parseInt(a.published_date.substring(0, 4))
        );
      } else if (this.state.sort === "Oldest") {
        //sorting by starting year (0,4) and concverting to int
        return (
          parseInt(a.published_date.substring(0, 4)) -
          parseInt(b.published_date.substring(0, 4))
        );
      } else if (this.state.sort === "Rating Top") {
        //sorting by rating
        return parseInt(b.avg_rating) - parseInt(a.avg_rating);
      } else if (this.state.sort === "Rating Bottom") {
        //sorting by rating
        return parseInt(a.avg_rating) - parseInt(b.avg_rating);
      } else if (this.state.sort === "Price High") {
        //sorting by price
        return parseInt(b.price) - parseInt(a.price);
      } else if (this.state.sort === "Price Low") {
        //sorting by price
        return parseInt(a.price) - parseInt(b.price);
      } else if (this.state.sort === "Title A") {
        //sorting by price
        return a.book_title.localeCompare(b.book_title);
      } else if (this.state.sort === "Title B") {
        //sorting by price
        return b.book_title.localeCompare(a.book_title);
      } else if (this.state.sort === "Author A") {
        //sorting by price
        return a.author_name.localeCompare(b.author_name);
      } else if (this.state.sort === "Author B") {
        //sorting by price
        return b.author_name.localeCompare(a.author_name);
      }
    });
    return (
      <div>
        <SearchBar
          searchBook={this.searchBook}
          handleSearch={this.handleSearch}
          handleSort={this.handleSort}
        />
        <BookList books={sortedBooks} />
      </div>
    );
  }
}

export default withRouter(Rating);
