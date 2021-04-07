import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./newpayment.css";
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
import Col from "react-bootstrap/Col"; // Col ReactBootsrap.

function NewPayment() {
  const [CardNumberReg, setCardNumberReg] = useState("");
  const [CardTypeReg, setCardTypeReg] = useState("");
  const [CrdtHldrNameReg, setCrdtHldrNameReg] = useState("");
  const [ExpMonthReg, setExpMonthReg] = useState("");
  const [ExpYearReg, setExpYearReg] = useState("");
  const [SecurityCodeReg, setSecurityCodeReg] = useState("");

  // Function Insert Shipping Address.
  const insertPaymentMethod = () => {
    try {
      checkCreditCardValidation();
    } catch (e) {
      // PopUp.
      alert(e);
      window.location.reload();
      return;
    }

    Axios.post("http://localhost:4000/api/payment/newpayment", {
      CardType: CardTypeReg,
      CardNumber: CardNumberReg,
      CrdtHldrName: CrdtHldrNameReg,
      ExpMonth: ExpMonthReg,
      ExpYear: ExpYearReg,
      SecurityCode: SecurityCodeReg,
      UserID: localStorage.getItem("UserID"),
    }).then((response) => {
      console.log(response);
    });

    window.location.href = "/mngpayment";
  };

  // Check CreditCard Arrow Function.
  const checkCreditCardValidation = () => {
    /* Initialization.*/
    /* Date Class Import statement. */
    var today = new Date();
    const CreditCardNumberTmp = CardNumberReg;
    const ExpMonthTmp = ExpMonthReg;
    const ExpYearTmp = ExpYearReg;
    const lowercase = /[a-z]/;
    const upercase = /[A-Z]/;

    /* Credit Card Number can be only Numbers */
    if (
      lowercase.test(CreditCardNumberTmp) ||
      upercase.test(CreditCardNumberTmp)
    ) {
      throw "CreditCardNumber Must be numbers";
    }

    /* Getting month. */
    var mm = today.getMonth() + 1;

    /* Getting Full Year. */
    var yyyy = today.getFullYear();

    /* Checking the year. */
    if (ExpYearTmp < yyyy) {
      throw "Credit Card has expired check your year.";
    }

    /* Checking for the month */
    if (ExpYearTmp == yyyy && ExpMonthTmp < mm) {
      throw "Credit Card has expired check your month.";
    }
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
    // Missing Function to Insert The Payment and Billing.
    return (
      <div className="NewPayment">
        {/* Testing.*/}
        <br /> {/* TextHeader.*/}
        <div className="mainheader">
          <h1>Add a New Credit Card Information</h1>
          <Container>
            <p>
              The payment method you select will be used as your default for
              future payments. By setting up a default payment you will be able
              to automatically purchase NOOK content. Any gift cards in your
              account will be applied first. Gift cards do not apply to
              subscriptions or purchases/extensions of current Textbook rentals.
            </p>
          </Container>
        </div>
        <label>
          {" "}
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
                Exp Month [XX]
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
                Exp Year [XXXX]
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
          {/* Security Code.*/}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Security Code
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setSecurityCodeReg(e.target.value);
              }}
            />
          </InputGroup>
        </label>
        {/* Buttons.*/}
        <div>
          <Button variant="primary" onClick={insertPaymentMethod}>
            Save
          </Button>{" "}
          <Button variant="secondary" href="/mngpayment">
            Cancel
          </Button>{" "}
        </div>
        <br />
      </div>
    );
  } else {
    return (
      <div className="App">
        {/* Testing.*/}
        <br /> {/* TextHeader.*/}
        <div className="mainheader">
          <Container>
            <h1>Create an Account or Sign In</h1>
            <p>
              <Alert.Link href="/signup">SignUp</Alert.Link>
              to create a GeekText account. If you already have an account,
              please. <Alert.Link href="/signin">Sign In</Alert.Link>.
            </p>
          </Container>
        </div>
      </div>
    );
  }
}

export default NewPayment;
