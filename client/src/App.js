import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar"; // NavBar ReactBootsrap.
import Nav from "react-bootstrap/Nav"; // Nav ReactBootsrap.
import NavDropdown from "react-bootstrap/NavDropdown"; // NavDropDown ReactBootsrap.
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Books from "./book-browsing/src/components/Books";
import BookDetails from "./book-details/BookDetails";
import searchBook from "./book-browsing/src/utils";

function App() {
  return (
    <div>
      {/* NavBar.*/}
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">GeekText</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="#">Top Sellers</Nav.Link>
          <NavDropdown title="Rating" id="basic-nav-dropdown">
            <NavDropdown.Item href="/rating/1">1 star</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">2 star</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">3 star</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">4 star</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">5 star</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Book Browsing By Genre" id="basic-nav-dropdown">
            <NavDropdown.Item href="/genre/Literature">
              Literature
            </NavDropdown.Item>
            <NavDropdown.Item href="/genre/Manga">Manga</NavDropdown.Item>
            <NavDropdown.Item href="/genre/Romance">Romance</NavDropdown.Item>
            <NavDropdown.Item href="/genre/Fiction">Fiction</NavDropdown.Item>
            <NavDropdown.Item href="/genre/Science">Science</NavDropdown.Item>
            <NavDropdown.Item href="/genre/Sci-Fi">Sci-Fi</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">Sign Up</NavDropdown.Item>
            <NavDropdown.Item href="#">Sign In</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#">Shipping Address</NavDropdown.Item>
            <NavDropdown.Item href="#">Payment</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">SignOut</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#">Shopping Cart</Nav.Link>
          <Nav.Link href="#">WishList</Nav.Link>
        </Nav>
      </Navbar>

      {/* ---------routing for drop down--------- */}
      <Router>
        <div>
          <Switch>
            <Route strict path="/books/:bookId">
              <BookDetails userId="2" />
            </Route>
            <Route strict path="/genre/:genre">
              <Books />
            </Route>
            <Route strict path="/rating/:avg_rating">
              <Books />
            </Route>
            <Route path="/">
              <Books />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
