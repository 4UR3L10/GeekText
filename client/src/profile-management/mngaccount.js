import {Link} from "react-router-dom";
import React, {useState} from "react";
import "./mngaccount.css";
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

function ManageAccount() {

    if (localStorage.getItem("Token") != null) {
        var decoded = jwt_decode(localStorage.getItem("Token"));
        console.log("decoded: " + decoded.EmailAddressReg);
        return (
            <div className="App">
                {/* Testing.*/}

                {/* TextHeader.*/}
                <div className="Mainheader">
                    <Container>
                        <h1>Welcome {
                            decoded.EmailAddressReg
                        }</h1>
                    </Container>
                </div>

                {/* Buttons.*/}
                <div>
                    <Button variant="primary" href="/mngsettings">
                        Manage Settings
                    </Button>
                    {" "} </div>
                <br/>
                <div>
                    <Button variant="primary" href="/mngshipaddress">
                        Manage Shipping Address
                    </Button>
                    {" "} </div>
                <br/>
                <div>
                    <Button variant="primary" href="/mngpayment">
                        Manage Payments
                    </Button>
                    {" "} </div>
                <br/>
                <div>
                    <Button variant="secondary" href="/">
                        Back To Home
                    </Button>
                    {" "} </div>
                <br/>
            </div>
        );
    } else {
        return (
            <div className="App">
                {/* Testing.*/}

                {/* TextHeader.*/}
                <div className="mainheader">
                    <Container>
                        <h1>Create an Account or Sign In</h1>
                        <p>
                            <Alert.Link href="/signup">SignUp{" "} </Alert.Link>
                            to create a
                                                                                                  GeekText account. If you already have an account, please.{" "}
                            <Alert.Link href="/signin">Sign In</Alert.Link>.
                        </p>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ManageAccount;
