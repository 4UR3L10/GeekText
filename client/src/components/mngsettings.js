import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./mngsettings.css";
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

function ManageSettings() {
  const [UserFullNameReg, setUserFullNameReg] = useState("");
  const [EmailAddressReg, setEmailAddressReg] = useState("");
  const [PasswordReg, setPasswordReg] = useState("");
  const [CurrentPasswordReg, setCurrentPasswordReg] = useState("");
  const [NickNameReg, setNickNameReg] = useState("");
  const [ZipCodeReg, setZipCodeReg] = useState("");
  const [StateReg, setStateReg] = useState("");
  const [CityReg, setCityReg] = useState("");
  const [Address2Reg, setAddress2Reg] = useState("");
  const [AddressReg, setAddressReg] = useState("");
  const [CountryReg, setCountryReg] = useState("");

  const updateName = () => {
    // Update Fullname.
    Axios.put("http://localhost:3001/mngsettings/fullname", {
      UserFullName: UserFullNameReg,
    }).then((response) => {
      console.log(response);
    });

    window.location.reload();
  };

  return (
    <div className="ManageSettings">
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
          <h1>Account Settings</h1>
          <br />
          <br />
          <h2>Update Your Name</h2>
        </Container>
      </div>

      <div className="SettingsForm">
        {/* SignUp.*/}
        <div>
          <label>
            {/* Fullname.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Fullname
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setUserFullNameReg(e.target.value);
                }}
              />
            </InputGroup>

            {/* Buttons.*/}
            <div>
              <Button variant="primary" onClick={updateName}>
                Save Changes
              </Button>{" "}
              <Button variant="secondary">Cancel</Button>{" "}
            </div>
            <br />

            {/* TextHeader.*/}
            <div className="mainheader">
              <Container>
                <h2>Update Your Email Address</h2>
              </Container>
            </div>

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

            {/* Confirm Email.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Confirm Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>

            {/* Buttons.*/}
            <div>
              <Button variant="primary" href={"#"}>
                Save Changes
              </Button>{" "}
              <Button variant="secondary">Cancel</Button>{" "}
            </div>
            <br />

            {/* TextHeader.*/}
            <div className="mainheader">
              <Container>
                <h2>Change Your Password</h2>
              </Container>
            </div>

            {/* Current Passsword.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Current Passsword
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setCurrentPasswordReg(e.target.value);
                }}
              />
            </InputGroup>

            {/* Passsword.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  New Passsword
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

            {/* Confirm Passsword.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Confirm Passsword
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>

            {/* Buttons.*/}
            <div>
              <Button variant="primary" href={"#"}>
                Save Changes
              </Button>{" "}
              <Button variant="secondary">Cancel</Button>{" "}
            </div>
            <br />

            {/* TextHeader.*/}
            <div className="mainheader">
              <Container>
                <h2>Change Your Home Address</h2>
              </Container>
            </div>

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

            {/* Buttons.*/}
            <div>
              <Button variant="primary" href={"#"}>
                Save Changes
              </Button>{" "}
              <Button variant="secondary">Cancel</Button>{" "}
            </div>
            <br />

            {/* TextHeader.*/}
            <div className="mainheader">
              <Container>
                <h2>Change Your Anonymus Status</h2>
              </Container>
            </div>

            {/* Anonymus.*/}
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remain Anonymus" />
            </Form.Group>

            {/* Buttons.*/}
            <div>
              <Button variant="primary" href={"#"}>
                Save Changes
              </Button>{" "}
              <Button variant="secondary">Cancel</Button>{" "}
            </div>
            <br />

            {/* TextHeader.*/}
            <div className="mainheader">
              <Container>
                <h2>Change Your Nickname</h2>
              </Container>
            </div>

            {/* Nickname.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nickname
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setNickNameReg(e.target.value);
                }}
              />
            </InputGroup>
          </label>

          {/* Buttons.*/}
          <div>
            <Button variant="primary" href={"#"}>
              Save Changes
            </Button>{" "}
            <Button variant="secondary">Cancel</Button>{" "}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ManageSettings;
