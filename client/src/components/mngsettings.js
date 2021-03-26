import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./mngsettings.css";
import Axios from "axios";
import jwt_decode from "jwt-decode";

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
  const [EmailVerAddressReg, setEmailVerAddressReg] = useState("");
  const [PasswordReg, setPasswordReg] = useState("");
  const [PasswordConfReg, setPasswordConfReg] = useState("");
  const [CurrentPasswordReg, setCurrentPasswordReg] = useState("");
  const [NickNameReg, setNickNameReg] = useState("");
  const [AnonymusStatReg, setAnonymusStatReg] = useState("");
  const [ZipCodeReg, setZipCodeReg] = useState("");
  const [StateReg, setStateReg] = useState("");
  const [CityReg, setCityReg] = useState("");
  const [Address2Reg, setAddress2Reg] = useState("");
  const [AddressReg, setAddressReg] = useState("");
  const [CountryReg, setCountryReg] = useState("");
  var decoded = jwt_decode(localStorage.getItem("Token"));

  // Function Update Name.
  const updateName = () => {
    // Update Fullname.
    Axios.put("http://localhost:3001/mngsettings/fullname", {
      UserFullName: UserFullNameReg,
      IdEmail: decoded.EmailAddressReg,
    }).then((response) => {
      console.log(response);
    });

    window.location.reload();
  };

  // Function Verify Email.
  const verifyEmail = () => {
    let emailTemp = EmailAddressReg;
    let emailVerTemp = EmailVerAddressReg;

    // Format of the email.
    if (emailTemp.includes("@") && emailTemp.includes(".")) {
      console.log("Valid Email Address");
    } else {
      alert("New Email Must Contain '@' and '.'");
      return;
    }

    // Email must the same as the confirm email.
    if (emailTemp == emailVerTemp) {
      updateEmail();
    } else {
      alert("Email addresses are not the same");
      return;
    }
  };

  // Function Update Email.
  const updateEmail = () => {
    // Update Fullname.
    Axios.put("http://localhost:3001/mngsettings/email", {
      EmailAddress: EmailAddressReg,
      IdEmail: decoded.EmailAddressReg,
    }).then((response) => {
      console.log(response);
    });

    window.location.reload();
  };

  // Function Update Nickname.
  const updateNickname = () => {
    // Update NickName.
    Axios.put("http://localhost:3001/mngsettings/nickname", {
      NickName: NickNameReg,
      IdEmail: decoded.EmailAddressReg,
    }).then((response) => {
      console.log(response);
    });

    window.location.reload();
  };

  // Function Update Anonymus Status.  // UPGRADEEEEEEEEEEEEEEEEEEEEEEEEEE
  const updateStatus = () => {
    // Update Anonymus Status.
    console.log("AnonymusStatReg:" + AnonymusStatReg);

    Axios.put("http://localhost:3001/mngsettings/status", {
      AnonymusStat: AnonymusStatReg,
      IdEmail: decoded.EmailAddressReg,
    }).then((response) => {
      console.log(response);
    });

    //window.location.reload();
  };

  // Check Password Function. // UPGRADEEEEEEEEEEEEEEEEEEEEEEEEEE
  const checkPassword = () => {
    const password = PasswordReg;

    if (password.length > 5) {
      console.log("Valid Password Length");
    } else {
      alert("Password Must be at least 6 character long");
      return;
    }

    const numberCheck = /\d/g;

    if (numberCheck.test(password)) {
      console.log("Contains a number");
    } else {
      alert("Passwords Must have a number");
      return;
    }

    const lowercase = /[a-z]/;

    if (lowercase.test(password)) {
      console.log("Contains a lowercase");
    } else {
      alert("Passwords Must have a lowercase letter");
      return;
    }

    const upercase = /[A-Z]/;

    if (upercase.test(password)) {
      console.log("Contains a upercase");
    } else {
      alert("Passwords Must have a upercase letter");
      return;
    }

    const symbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (symbol.test(password)) {
      console.log("Contains a symbol");
    } else {
      alert("Passwords Must have a symbol");
      return;
    }

    const confpassword = PasswordConfReg;

    if (confpassword === password) {
      console.log("Passwords Matched");
    } else {
      alert("Passwords Did Not Matched");
      return;
    }
  };

  // Function Update Password.  // UPGRADEEEEEEEEEEEEEEEEEEEEEEEEEE SO THE OLD PASSWORD CAN BE RETRIEVE.
  const encryptPassword = () => {
    const bcrypt = require("bcrypt-nodejs");
    const saltRounds = 10;
    let passwordTemp = PasswordReg;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(passwordTemp, salt, null, function (err, hash) {
        // Store hash in your password DB.
        Axios.put("http://localhost:3001/mngsettings/password", {
          Password: hash,
          IdEmail: decoded.EmailAddressReg,
        }).then((response) => {
          console.log(response);
        });

        // Refresh.
        //window.location.reload();
      });
    });
  };

  // Function Update Address.  // FINISHHHHHHHHHHHHHHHHHHH Missing Create Address or put it in signup.
  const updateAddress = () => {
    Axios.put("http://localhost:3001/mngsettings/address", {
      Address: AddressReg,
      Address2: Address2Reg,
      City: CityReg,
      State: StateReg,
      ZipCode: ZipCodeReg,
      Country: CountryReg,
      IdEmail: decoded.EmailAddressReg,
    }).then((response) => {
      console.log(response);
    });
    //window.location.reload();
  };

  // Function Remove the Token or Sign Out.
  const signout = () => {
    window.localStorage.removeItem("Token");
    window.location.href = "http://localhost:3000/";
  };

  if (localStorage.getItem("Token") != null) {
    // Logged In.
    // var decoded = jwt_decode(localStorage.getItem("Token")); /*CHANGE TO GLOBALLLLLLLLLLLLLLLLLLL*/
    //console.log("decoded: " + decoded.EmailAddressReg);
    return (
      <div className="ManageSettings">
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
        <div className="mainheader">
          <h1>Account Settings</h1>
          <Container>
            <br />
            <div>
              <br />
              <h2>Update Your Name</h2>
            </div>
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
                <Button variant="secondary" href="/mngaccount">
                  Cancel
                </Button>{" "}
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
                  onChange={(e) => {
                    setEmailVerAddressReg(e.target.value);
                  }}
                />
              </InputGroup>
              {/* Buttons.*/}
              <div>
                <Button variant="primary" onClick={verifyEmail}>
                  Save Changes
                </Button>{" "}
                <Button variant="secondary" href="/mngaccount">
                  Cancel
                </Button>{" "}
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
                  onChange={(e) => {
                    setPasswordConfReg(e.target.value);
                  }}
                />
              </InputGroup>
              {/* Buttons.*/}
              <div>
                <Button variant="primary" onClick={encryptPassword}>
                  Save Changes
                </Button>{" "}
                <Button variant="secondary" href="/mngaccount">
                  Cancel
                </Button>{" "}
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
                <Button variant="primary" onClick={updateAddress}>
                  Save Changes
                </Button>{" "}
                <Button variant="secondary" href="/mngaccount">
                  Cancel
                </Button>{" "}
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
                <Form.Check
                  type="checkbox"
                  value="Y"
                  label="Remain Anonymus"
                  onChange={(e) => {
                    setAnonymusStatReg(e.target.value);
                  }}
                />
              </Form.Group>

              {/* Buttons.*/}
              <div>
                <Button variant="primary" onClick={updateStatus}>
                  Save Changes
                </Button>{" "}
                <Button variant="secondary" href="/mngaccount">
                  Cancel
                </Button>{" "}
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
              <Button variant="primary" onClick={updateNickname}>
                Save Changes
              </Button>{" "}
              <Button variant="secondary" href="/mngaccount">
                Cancel
              </Button>{" "}
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
  // Not Logged In.
  else {
    return (
      <div className="App">
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
        <div className="mainheader">
          <Container>
            <h1>Create an Account or Sign In</h1>
            <p>
              <Alert.Link href="/signup">SignUp </Alert.Link> to create a
              GeekText account. If you already have an account, please.{" "}
              <Alert.Link href="/signin">Sign In</Alert.Link>.
            </p>
          </Container>
        </div>
      </div>
    );
  }
}

export default ManageSettings;
