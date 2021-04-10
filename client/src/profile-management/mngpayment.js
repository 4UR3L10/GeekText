import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import react, { Component } from "react";
import "./mngpayment.css";
import axios from "axios";
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

const URL = "https://jsonplaceholder.typicode.com/users";

const ManagePayment = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getDataPay();
  }, []);

  // Get all payments for a user.
  const getDataPay = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/payment/getpayment",
      {
        UserID: localStorage.getItem("UserID"),
      }
    );
    setEmployees(response.data.results);
  };

  // Remove Credit card info.
  const removeData = async (CardID) => {
    window.location.reload();
    const response = await axios.post(
      "http://localhost:4000/api/payment/deletepayment",
      {
        CardID: CardID,
      }
    );

    window.location.reload();
  };

  const updateData = async (CardID) => {
    window.localStorage.setItem("CardID", CardID);
    window.location.href = "/updatepayment";
  };

  const renderHeader = () => {
    let headerElement = [
      "CardID",
      "CardNumber",
      "CardType",
      "CrdtHldrName",
      "ExpDate",
      "SecurityCode",
      "CrdtCrdVld",
      "Update",
      "Delete",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      employees &&
      employees.map(
        ({
          id,
          card_number,
          card_type,
          holder_name,
          expire_date,
          security_code,
          is_card_valid,
        }) => {
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{card_number}</td>
              <td>{card_type}</td>
              <td>{holder_name}</td>
              <td>{expire_date}</td>
              <td>{security_code}</td>
              <td>{is_card_valid}</td>
              <td className="opration">
                <button className="buttonUpdate" onClick={() => updateData(id)}>
                  Update
                </button>
              </td>
              <td className="opration">
                <button className="button" onClick={() => removeData(id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      )
    );
  };

  // Function Remove the Token or Sign Out.
  const signout = () => {
    window.localStorage.removeItem("Token");
    window.location.href = "http://localhost:3000/";
  };

  if (localStorage.getItem("Token") != null) {
    var decoded = jwt_decode(localStorage.getItem("Token"));
    console.log("decoded: " + decoded.EmailAddressReg);

    return (
      <>
        <br />
        <h1 id="title">Credit Card Info</h1>
        {
          <div className="container">
            <table id="employee">
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tbody>{renderBody()}</tbody>
            </table>
          </div>
        }
        <br />
        <div className="container">
          <Button variant="primary" href="/newpayment">
            Add New Payment Method
          </Button>{" "}
        </div>
        <br />

        <div className="container">
          <Button variant="secondary" href="/mngaccount">
            Cancel
          </Button>{" "}
        </div>
        <br />
        <br />
      </>
    );
  } else {
    return (
      <div className="App">
        {/* Testing.*/}

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
};

export default ManagePayment;
