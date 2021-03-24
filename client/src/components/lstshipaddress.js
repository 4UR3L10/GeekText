import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import react, { Component } from "react";
import "./lstshipaddress.css";
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

  // Arrow function to get the data.
  const getData = async () => {
    const response = await axios.get(URL);
    setEmployees(response.data);
  };

  // Get all shipping addresses for a user.
  const getDataShip = async () => {
    const response = await axios.get(
      "http://localhost:3001/shipaddress/getshipaddress"
    );
    setEmployees(response.data.results);
  };

  const removeData = (ShipAddressID) => {
    axios.delete(`${URL}/${ShipAddressID}`).then((res) => {
      const del = employees.filter(
        (employee) => ShipAddressID !== employee.ShipAddressID
      );
      setEmployees(del);
    });
  };

  const renderHeader = () => {
    let headerElement = [
      "ShipAddressID",
      "UserID",
      "FirstName",
      "LastName",
      "Address",
      "Address2",
      "City",
      "State",
      "ZipCode",
      "Country",
      "DefaultAddress",
      "Delete OP",
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
          ShipAddressID,
          UserID,
          FirstName,
          LastName,
          Address,
          Address2,
          City,
          State,
          ZipCode,
          Country,
          DefaultAddress,
        }) => {
          return (
            <tr key={ShipAddressID}>
              <td>{ShipAddressID}</td>
              <td>{UserID}</td>
              <td>{FirstName}</td>
              <td>{LastName}</td>
              <td>{Address}</td>
              <td>{Address2}</td>
              <td>{City}</td>
              <td>{State}</td>
              <td>{ZipCode}</td>
              <td>{Country}</td>
              <td>{DefaultAddress}</td>

              <td className="opration">
                <button
                  className="button"
                  onClick={() => removeData(ShipAddressID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      )
    );
  };

  return (
    <>
      <h1 id="title">Shipping Addresses</h1>
      {
        <table id="employee">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      }
      <br />
      <div>
        <Button variant="secondary" href="/mngshipaddress">
          Cancel
        </Button>{" "}
      </div>
      <br />
      <div>
        <Button variant="primary" onClick={getDataShip}>
          Test
        </Button>{" "}
      </div>
      <br />
    </>
  );
};

export default ListShippingAddress;
