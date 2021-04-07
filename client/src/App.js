import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar"; // NavBar ReactBootsrap.
import Nav from "react-bootstrap/Nav"; // Nav ReactBootsrap.
import NavDropdown from "react-bootstrap/NavDropdown"; // NavDropDown ReactBootsrap.
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Books from "./book-browsing/src/components/Books";
import BookDetails from "./book-details/BookDetails";
import AuthorPage from "./book-details/AuthorPage";
import searchBook from "./book-browsing/src/utils";
import Rating from "./book-browsing/src/components/Rating";
import signin from "./profile-management/signin";
import mngaccount from "./profile-management/mngaccount";
import signup from "./profile-management/signup";
import mngsettings from "./profile-management/mngsettings";
import newpayment from "./profile-management/newpayment";
import newshipaddress from "./profile-management/newshipaddress";
import mngpayment from "./profile-management/mngpayment";
import mngshipaddress from "./profile-management/mngshipaddress";
import updateshipaddress from "./profile-management/updateshipaddress";
import updatepayment from "./profile-management/updatepayment";
import WishlistSelect from "./wishlist-management/WishlistSelect";
import PaginaPrincipal from "./shopping-cart/src/components/PaginaPrincipal";

function App() {
  // Function Remove the Token or Sign Out.
  const signout = () => {
    window.localStorage.removeItem("Token");
    window.localStorage.removeItem("UserID");
    window.location.href = "http://localhost:3000/signin";
  };

  return (
    <div>
      {" "}
      {/* NavBar.*/}
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">GeekText</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="#">Top Sellers</Nav.Link>
          <NavDropdown title="Rating" id="basic-nav-dropdown">
            <NavDropdown.Item href="/rating/1">1+ stars</NavDropdown.Item>
            <NavDropdown.Item href="/rating/2">2+ stars</NavDropdown.Item>
            <NavDropdown.Item href="/rating/3">3+ stars</NavDropdown.Item>
            <NavDropdown.Item href="/rating/4">4+ stars</NavDropdown.Item>
            <NavDropdown.Item href="/rating/5">5 stars</NavDropdown.Item>
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
            <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
            <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/mngaccount">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signout}>SignOut</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/ShoppingCart">Shopping Cart</Nav.Link>
          <Nav.Link href="/WishlistSelect">WishList</Nav.Link>
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
              <Rating />
            </Route>
            <Route exact path="/signin" component={signin} />
            <Route exact path="/mngaccount" component={mngaccount} />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/mngsettings" component={mngsettings} />
            <Route exact path="/newshipaddress" component={newshipaddress} />
            <Route exact path="/newpayment" component={newpayment} />
            <Route exact path="/mngpayment" component={mngpayment} />
            <Route exact path="/mngshipaddress" component={mngshipaddress} />
            <Route
              exact
              path="/updateshipaddress"
              component={updateshipaddress}
            />
            <Route exact path="/updatepayment" component={updatepayment} />
            <Route path="/author/:authorId">
              <AuthorPage />
            </Route>
            <Route exact path="/WishlistSelect" component={WishlistSelect} />
            <Route exact path="/ShoppingCart" component={PaginaPrincipal} />
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
