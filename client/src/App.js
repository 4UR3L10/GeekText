import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar"; // NavBar ReactBootsrap.
import Nav from "react-bootstrap/Nav"; // Nav ReactBootsrap.
import NavDropdown from "react-bootstrap/NavDropdown"; // NavDropDown ReactBootsrap.

function App() {
  return (
    <div className="App">
      {/* NavBar.*/}
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">GeekText</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Book Browsing" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">By Genre</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Book Rating</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Top Sellers</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Book Browsing By Genre" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">Literature</NavDropdown.Item>
            <NavDropdown.Item href="#">Manga</NavDropdown.Item>
            <NavDropdown.Item href="#">Romance</NavDropdown.Item>
            <NavDropdown.Item href="#">Fiction</NavDropdown.Item>
            <NavDropdown.Item href="#">Science</NavDropdown.Item>
            <NavDropdown.Item href="#">Sci-Fi</NavDropdown.Item>
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
      <br />

      {/* Other Stuff.*/}
    </div>
  );
}

export default App;
