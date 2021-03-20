import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./mngshipaddress.css";
import Axios from "axios";

// Boostrap.
import "bootstrap/dist/css/bootstrap.min.css"; // Necessary For ReactBootsrap.
import Button from "react-bootstrap/Button"; // Button ReactBootsrap.
import InputGroup from "react-bootstrap/InputGroup"; // Input ReactBootsrap.
import FormControl from "react-bootstrap/FormControl"; // Form ReactBootsrap.
import Navbar from "react-bootstrap/Navbar"; // NavBar ReactBootsrap.
import Nav from "react-bootstrap/Nav"; // Nav ReactBootsrap.
import NavDropdown from "react-bootstrap/NavDropdown"; // NavDropDown ReactBootsrap.
import Jumbotron from "react-bootstrap/Jumbotron"; // Jumbotron ReactBootsrap.
import Container from "react-bootstrap/Container"; // Container ReactBootsrap.
import Alert from "react-bootstrap/Alert"; // Alert ReactBootsrap.

function ManageShippingAddress() {
  return (
    <div className="ManageShippingAddress">
      {/* Testing.*/}

      {/* NavBar.*/}
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/">GeekText</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/signin">Sign In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <NavDropdown title="Manage" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/mngaccount">Account</NavDropdown.Item>
              <NavDropdown.Item href="/mngsettings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/mngshipaddress">
                Shipping Address
              </NavDropdown.Item>
              <NavDropdown.Item href="/newshipaddress">
                Shipping Address New
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/mngpayment">Payment</NavDropdown.Item>
              <NavDropdown.Item href="/newpayment">
                Payment New
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Contact Us</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />

      {/* TextHeader.*/}
      <div className="mainheader">
        <Container>
          <h1>Other Saved Addresses</h1>
        </Container>
      </div>

      <div className="signup">
        {/* SignUp.*/}

        {/* Buttons.*/}
        <div>
          <Button variant="primary" href="/newshipaddress">
            Add New Address
          </Button>{" "}
          <Button variant="secondary" href="/">
            Cancel
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export default ManageShippingAddress;
