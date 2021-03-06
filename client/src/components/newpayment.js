import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./newpayment.css";
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
import Form from "react-bootstrap/Form"; // Form ReactBootsrap.
import Col from "react-bootstrap/Col"; // Col ReactBootsrap.

function NewPayment() {
  const [CardNumberReg, setCardNumberReg] = useState("");
  const [CardTypeReg, setCardTypeReg] = useState("");
  const [CrdtHldrNameReg, setCrdtHldrNameReg] = useState("");
  const [ExpMonthReg, setExpMonthReg] = useState("");
  const [ExpYearReg, setExpYearReg] = useState("");
  const [FirstNameReg, setFirstNameReg] = useState("");
  const [LastNameReg, setLastNameReg] = useState("");
  const [AddressReg, setAddressReg] = useState("");
  const [Address2Reg, setAddress2Reg] = useState("");
  const [CityReg, setCityReg] = useState("");
  const [StateReg, setStateReg] = useState("");
  const [ZipCodeReg, setZipCodeReg] = useState("");
  const [CountryReg, setCountryReg] = useState("");

  // Missing Function to Insert The Payment and Billing.
  return (
    <div className="NewPayment">
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
      <div className="paymentheader">
        <Container>
          <h1>Add a New Payment method</h1>
          <p>
            The payment method you select will be used as your default for
            future payments. By setting up a default payment you will be able to
            automatically purchase NOOK content. Any gift cards in your account
            will be applied first. Gift cards do not apply to subscriptions or
            purchases/extensions of current Textbook rentals.
          </p>
        </Container>
      </div>

      <label>
        {/* CardType.*/}
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Card Type
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setCardTypeReg(e.target.value);
            }}
          />
        </InputGroup>

        {/* CardNumber.*/}
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Card Number
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setCardNumberReg(e.target.value);
            }}
          />
        </InputGroup>

        {/* CrdtHldrName.*/}
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Cardholder Name
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setCrdtHldrNameReg(e.target.value);
            }}
          />
        </InputGroup>

        {/* ExpMonth.*/}
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Exp Month
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setExpMonthReg(e.target.value);
            }}
          />
        </InputGroup>

        {/* ExpYear.*/}
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Exp Year
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setExpYearReg(e.target.value);
            }}
          />
        </InputGroup>
      </label>

      {/* BillHeader.*/}
      <div className="billingheader">
        <Container>
          <h1>Add a New Billing Address</h1>
        </Container>
      </div>

      <div className="Billing">
        {/* Billing.*/}

        <label>
          {/* Country.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Country
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setCountryReg(e.target.value);
              }}
            />
          </InputGroup>

          {/* FirstName.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                FirstName
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setFirstNameReg(e.target.value);
              }}
            />
          </InputGroup>

          {/* LastName.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                LastName
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setLastNameReg(e.target.value);
              }}
            />
          </InputGroup>

          {/* Address.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Address
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setAddressReg(e.target.value);
              }}
            />
          </InputGroup>

          {/* Address Aditional.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Address Aditional
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setAddress2Reg(e.target.value);
              }}
            />
          </InputGroup>

          {/* City.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">City</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setCityReg(e.target.value);
              }}
            />
          </InputGroup>

          {/* State.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">State</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setStateReg(e.target.value);
              }}
            />
          </InputGroup>

          {/* Zip Code.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Zip Code
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setZipCodeReg(e.target.value);
              }}
            />
          </InputGroup>
        </label>

        {/* Buttons.*/}
        <div>
          <Button variant="primary" onClick={"#"}>
            Save
          </Button>{" "}
          <Button variant="secondary">Cancel</Button>{" "}
        </div>
        <br />
      </div>
    </div>
  );
}

export default NewPayment;
