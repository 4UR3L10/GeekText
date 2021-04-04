import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";
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

import jwt_decode from "jwt-decode";
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

function SignIn() {
  const [EmailAddressReg, setEmailAddressReg] = useState("");
  const [PasswordReg, setPasswordReg] = useState("");

  const token = jwt.sign({ EmailAddressReg }, "mysupersecretpassword", {
    expiresIn: "7d",
  });

  // Login User Arrow Function.
  const login = () => {
    try {
      signInUser().then(() => {
        StoreToken();
        DecodeToken();
        //window.location.href = "http://localhost:3000/mngaccount";
      });
    } catch (e) {
      // PopUp.
      alert(e);
    }
  };

  const signInUser = () => {
    return Axios.post("http://localhost:3001/signin/user", {
      EmailAddress: EmailAddressReg,
      Password: PasswordReg,
    }).then((response) => {
      console.log(response);
      console.log(response.status);
      console.log(response.data[0].UserId);
    });
  };

  const StoreToken = () => {
    console.log("The token is " + token);

    window.localStorage.setItem("Token", token);
    //window.localStorage.setItem("Email", EmailAddressReg);
  };

  const DecodeToken = () => {
    var decoded = jwt_decode(localStorage.getItem("Token"));

    console.log(decoded);

    console.log("BEST: " + decoded.EmailAddressReg);
  };

  const refresh = () => {
    window.location.reload();
  };

  // Function Remove the Token or Sign Out.
  const signout = () => {
    window.localStorage.removeItem("Token");
    window.location.href = "http://localhost:3000/";
  };

  if (localStorage.getItem("Token") != null) {
    // Logged In.
    var decoded = jwt_decode(localStorage.getItem("Token"));
    console.log("decoded: " + decoded.EmailAddressReg);

    return (
      <div className="App">
        {/* Testing.*/}

        {/* NavBar.*/}
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="/">GeekText</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Manage" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/mngaccount">Account</NavDropdown.Item>
                <NavDropdown.Item href="/mngsettings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/mngshipaddress">
                  Shipping Address
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/mngpayment">Payment</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={signout}>Sign Out</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />

        {/* TextHeader.*/}
        <div className="Mainheader">
          <Container>
            <h1>Welcome {decoded.EmailAddressReg}</h1>
          </Container>
        </div>
      </div>
    );
  }
  // Not Logged In.
  else {
    return (
      <div className="Signin">
        {/* Testing.*/}

        {/* NavBar.*/}
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="/">GeekText</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#memes">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />

        {/* TextHeader.*/}
        <div className="Mainheader">
          <h1>Sign in or Create an Account</h1>
          <Container>
            <p>
              Don't have an account?{" "}
              <Alert.Link href="/signup">Create an Account</Alert.Link>.
            </p>
          </Container>
        </div>

        <div className="Form">
          {/* Sign In.*/}
          <div>
            <label>
              {/* Email.*/}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Email
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => {
                    setEmailAddressReg(e.target.value);
                  }}
                />
              </InputGroup>

              {/* Passsword.*/}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Passsword
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="password"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
              </InputGroup>
            </label>

            {/* Buttons.*/}
            <div>
              <Button variant="primary" onClick={login}>
                Sign In
              </Button>{" "}
              <Button variant="secondary" href="/">
                Cancel
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
