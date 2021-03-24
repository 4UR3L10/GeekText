import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BookDetails from "./BookDetails"
import AuthorPage from "./AuthorPage"

function BookAppTest() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/books/:bookId" >
            <BookDetails userId="2"/>
          </Route>
          <Route path="/author/:authorId">
            <AuthorPage />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

function Text({ match }) {
  return (
    <div>
      {match.params.bookId}
    </div>
  );
}

export default BookAppTest;
