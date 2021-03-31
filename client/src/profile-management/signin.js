import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./signin.css";
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
import Alert from "react-bootstrap/Alert";
// Alert ReactBootsrap.

const jwt = require("jsonwebtoken");

function SignIn() {
    const [EmailAddressReg, setEmailAddressReg] = useState("");
    const [PasswordReg, setPasswordReg] = useState("");

    const token = jwt.sign({
        EmailAddressReg
    }, "mysupersecretpassword", {expiresIn: "7d"});

    // Login User Arrow Function.
    const login = () => {
        try {
            signInUser();
            StoreToken();
            DecodeToken();
            window.location.href = "http://localhost:3000/mngaccount";
        } catch (e) { // PopUp.
            alert(e);
        }
    };

    // Function to Post to login a user.
    const signInUser = () => {
        Axios.post("http://localhost:4000/api/signin/user", {
            EmailAddress: EmailAddressReg,
            Password: PasswordReg
        }).then((response) => {
            console.log(response);
        });
    };

    const StoreToken = () => {
        console.log("The token is " + token);

        window.localStorage.setItem("Token", token);
        // window.localStorage.setItem("Email", EmailAddressReg);
    };

    const DecodeToken = () => {
        var decoded = jwt_decode(localStorage.getItem("Token"));

        console.log(decoded);

        console.log("BEST: " + decoded.EmailAddressReg);
    };

    return (


        <div className="Signin">
            <br/> {/* TextHeader.*/}
            <div className="Mainheader">
                <Container>
                    <h1>Sign in or Create an Account</h1>
                    <p>
                        Don't have an account?{" "}
                        <Alert.Link href="/signup">Create an Account</Alert.Link>.
                    </p>
                </Container>
            </div>

            <div className="Form">
                {/* Sign In.*/}
                <div>
                    <label> {/* Email.*/}
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">
                                    Email
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                onChange={
                                    (e) => {
                                        setEmailAddressReg(e.target.value);
                                    }
                                }/>
                        </InputGroup>

                    {/* Passsword.*/}
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">
                                Passsword
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="password" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                            onChange={
                                (e) => {
                                    setPasswordReg(e.target.value);
                                }
                            }/>
                    </InputGroup>
            </label>

            {/* Buttons.*/}
            <div>
                <Button variant="primary"
                    onClick={login}>
                    Sign In
                </Button>
                {" "}
                <Button variant="secondary" href="/">
                    Cancel
                </Button>
                {" "} </div>
        </div>
    </div>
</div>
    );
}

export default SignIn;
