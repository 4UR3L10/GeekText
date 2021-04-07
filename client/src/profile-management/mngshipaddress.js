import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import react, { Component } from "react";
import "./mngshipaddress.css";
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

const ListShippingAddress = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getDataShip();
  }, []);

  // Get all shipping addresses for a user.
  const getDataShip = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/shipaddress/getshipaddress",
      {
        UserID: localStorage.getItem("UserID"),
      }
    );
    setEmployees(response.data.results);
  };

  const removeData = async (ShipAddressID) => {
    window.location.reload();
    const response = await axios.post(
      "http://localhost:4000/api/shipaddress/deleteshipaddress",
      {
        ShipAddressID: ShipAddressID,
      }
    );

    window.location.reload();
  };

  const updateData = async (ShipAddressID) => {
    window.localStorage.setItem("ShipAddressID", ShipAddressID);
    window.location.href = "/updateshipaddress";
  };

  const renderHeader = () => {
    let headerElement = [
      "AddressID",
      "Address",
      "City",
      "State",
      "ZipCode",
      "Country",
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
      employees.map(({ id, street, city, state, zip_code, country }) => {
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{street}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{zip_code}</td>
            <td>{country}</td>
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
      })
    );
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
      <>
        <br />
        <h1 id="title">Shipping Addresses</h1>
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
          <Button variant="primary" href="/newshipaddress">
            Add New Address
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

export default ListShippingAddress;
