import {Link} from "react-router-dom";
import React, {useState} from "react";
import "./signup.css";
import Axios from "axios";
import jwt_decode from "jwt-decode";
// import bcrypt from "bcrypt-nodejs";

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

// placeholder="Readonly input here..." in formCONTROL
// blank validation. // testoken.
function SignUp() {
    const [UserFirstNameReg, setUserFirstNameReg] = useState("");
    const [UserLastNameReg, setUserLastNameReg] = useState("");
    const [EmailAddressReg, setEmailAddressReg] = useState("");
    const [EmailAddressConfReg, setEmailAddressConfReg] = useState("");
    const [PasswordReg, setPasswordReg] = useState("");
    const [PasswordConfReg, setPasswordConfReg] = useState("");
    const [NickNameReg, setNickNameReg] = useState("");

    // Register User Arrow Function.
    const register = () => {
        try {
            checkEmail();
            checkPassword();
            encryptPassword();
        } catch (e) { // PopUp.
            alert(e);
        }
    };

    // Check Email Arrow Function.
    const checkEmail = () => {
        const email = EmailAddressReg;

        if (email.includes("@") && email.includes(".")) {
            console.log("Valid Email Address");
        } else {
            throw "Email Must Contain '@' and '.'";
        }

        const confEmail = EmailAddressConfReg;

        if (confEmail === email) {
            console.log("Emails Matched");
        } else {
            throw "Emails Do Not Matched";
        }
    };

    // Check Password Arrow Function.
    const checkPassword = () => {
        const password = PasswordReg;

        if (password.length > 5) {
            console.log("Valid Password Length");
        } else {
            throw "Password Must be at least 6 character long";
        }

        const numberCheck = /\d/g;

        if (numberCheck.test(password)) {
            console.log("Contains a number");
        } else {
            throw "Passwords Must have a number";
        }

        const lowercase = /[a-z]/;

        if (lowercase.test(password)) {
            console.log("Contains a lowercase");
        } else {
            throw "Passwords Must have a lowercase letter";
        }

        const upercase = /[A-Z]/;

        if (upercase.test(password)) {
            console.log("Contains a upercase");
        } else {
            throw "Passwords Must have a upercase letter";
        }

        const symbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (symbol.test(password)) {
            console.log("Contains a symbol");
        } else {
            throw "Passwords Must have a symbol";
        }

        const confpassword = PasswordConfReg;

        if (confpassword === password) {
            console.log("Passwords Matched");
        } else {
            throw "Passwords Did Not Matched";
        }
    };

    const encryptPassword = () => {
        const bcrypt = require("bcrypt-nodejs");
        const saltRounds = 10;
        let passwordTemp = PasswordReg;

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(passwordTemp, salt, null, function (err, hash) { // Store hash in your password DB.
                Axios.post("http://localhost:4000/api/signup/user", {
                    UserFirstName: UserFirstNameReg,
                    UserLastName: UserLastNameReg,
                    EmailAddress: EmailAddressReg,
                    Password: hash,
                    NickName: NickNameReg
                }).then((response) => {
                    console.log(response);
                });

                // Refresh.
                window.location.reload();
            });
        });
    };

    // Function Remove the Token or Sign Out.
    const signout = () => {
        window.localStorage.removeItem("Token");
        window.location.href = "http://localhost:3000/";
    };

    if (localStorage.getItem("Token") != null) { // Logged In.
        var decoded = jwt_decode(localStorage.getItem("Token"));
        console.log("decoded: " + decoded.EmailAddressReg);

        return (
            <div className="App">
                {/* Testing.*/}

                <br/> {/* TextHeader.*/}
                <div className="Mainheader">
                    <Container>
                        <h1>Welcome {
                            decoded.EmailAddressReg
                        }</h1>
                    </Container>
                </div>
            </div>
        );
    } else { // Not Logged In.
        return (
            <div className="SignUp">
                {/* Testing.*/}

                <br/> {/* TextHeader.*/}
                <div className="mainheader">
                    <h1>Create an Account</h1>
                    <Container>
                        <p>
                            Fill in the fields below to create a GeekText account. If you
                                                                                                                                                                                                                                                                                                      already have an account, please.{" "}
                            <Alert.Link href="/signin">Sign In</Alert.Link>.
                        </p>
                    </Container>
                </div>

                <div className="Form">
                    {/* SignUp.*/}
                    <div>
                        <label> {/* FirstName.*/}
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">
                                        FirstName
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                    onChange={
                                        (e) => {
                                            setUserFirstNameReg(e.target.value);
                                        }
                                    }/>
                            </InputGroup>

                        {/* LastName.*/}
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">
                                    LastName
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                onChange={
                                    (e) => {
                                        setUserLastNameReg(e.target.value);
                                    }
                                }/>
                        </InputGroup>

                    {/* Email.*/}
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

                {/* Confirm Email.*/}
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                            Confirm Email
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                        onChange={
                            (e) => {
                                setEmailAddressConfReg(e.target.value);
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

        {/* Confirm Passsword.*/}
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                    Confirm Passsword
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type="password" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                onChange={
                    (e) => {
                        setPasswordConfReg(e.target.value);
                    }
                }/>
        </InputGroup>

    {/* Nickname.*/}
    <InputGroup size="sm" className="mb-3">
        <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
                Nickname
            </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            onChange={
                (e) => {
                    setNickNameReg(e.target.value);
                }
            }/>
    </InputGroup></label>{/* Buttons.*/}<div>
<Button variant="primary"
    onClick={register}>Sign Up</Button>
{" "}
<Button variant="secondary" href="/">
    Cancel</Button>
{" "} </div></div></div></div>
        );
    }
}

export default SignUp;
