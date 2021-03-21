import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./newshipaddress.css";
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

function NewShippingAddress() {
  const [FirstNameReg, setFirstNameReg] = useState("");
  const [LastNameReg, setLastNameReg] = useState("");
  const [AddressReg, setAddressReg] = useState("");
  const [Address2Reg, setAddress2Reg] = useState("");
  const [CityReg, setCityReg] = useState("");
  const [StateReg, setStateReg] = useState("");
  const [ZipCodeReg, setZipCodeReg] = useState("");
  const [CountryReg, setCountryReg] = useState("");

  // Function Insert  Shipping Address.
  const insertShipAddress = () => {
    Axios.post("http://localhost:3001/shipaddress/newshipaddress", {
      FirstName: FirstNameReg,
      LastName: LastNameReg,
      Address: AddressReg,
      Address2: Address2Reg,
      City: CityReg,
      State: StateReg,
      ZipCode: ZipCodeReg,
      Country: CountryReg,
    }).then((response) => {
      console.log(response);
    });
    window.location.reload();
  };

  return (
    <div className="NewShippingAddress">
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
          <h1>Add a New Shipping Address</h1>
        </Container>
      </div>

      <div className="ShippingAddress">
        {/* ShippingAddress.*/}
        <div>
          {/*  FIX THE DROPDOWNNNNNNNNNNNNNNNNN
        <Form.Group as={Col} className="drowpdown">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>
          */}
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
                <InputGroup.Text id="inputGroup-sizing-sm">
                  City
                </InputGroup.Text>
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
                <InputGroup.Text id="inputGroup-sizing-sm">
                  State
                </InputGroup.Text>
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
            <Button variant="primary" onClick={insertShipAddress}>
              Save
            </Button>{" "}
            <Button variant="secondary" href="/mngshipaddress">
              Cancel
            </Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewShippingAddress;
