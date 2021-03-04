import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

// Boostrap.
import 'bootstrap/dist/css/bootstrap.min.css'; // Necessary For ReactBootsrap.
import Button from 'react-bootstrap/Button'; // Button ReactBootsrap.
import InputGroup from 'react-bootstrap/InputGroup'; // Input ReactBootsrap.
import FormControl from 'react-bootstrap/FormControl' // Form ReactBootsrap.
import Navbar from 'react-bootstrap/Navbar' // NavBar ReactBootsrap.
import Nav from 'react-bootstrap/Nav' // Nav ReactBootsrap.
import NavDropdown from 'react-bootstrap/NavDropdown' // NavDropDown ReactBootsrap.
import Jumbotron from 'react-bootstrap/Jumbotron' // Jumbotron ReactBootsrap.
import Container from 'react-bootstrap/Container' // Container ReactBootsrap.
import Alert from 'react-bootstrap/Alert' // Alert ReactBootsrap.

function App() {
  const [EmailAddressReg, setEmailAddressReg] = useState("");
  const [PasswordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/signup/test", {
      EmailAddress: EmailAddressReg,
      Password: PasswordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (        
    <div className="App">
      {/* Testing.*/}

      {/* NavBar.*/}
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">GeekText</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Sign In</Nav.Link>
            <Nav.Link href="#pricing">Sign Up</Nav.Link>
            <NavDropdown title="Manage" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Shipping Address</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Shipping Address New</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Payment</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Payment New</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Contact Us</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />     

      {/* TextHeader.*/}
      <div className="mainheader">
    
          <Container>
            <h1>Create an Account</h1>
            <p>
            Fill in the fields below to create a Barnes & Noble.com account.
            If you already have an account, please. <Alert.Link href="#">Sign In</Alert.Link>.
            </p>
          </Container>
  
      </div>

      <div className="signup">
        {/* SignUp.*/}
        <div>
          <label>
            {/* Fullname.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Fullname</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>

            {/* Email.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e) => {setEmailAddressReg(e.target.value);}}/>
            </InputGroup>

            {/* Confirm Email.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Confirm Email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>

            {/* Passsword.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Passsword</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e) => {setPasswordReg(e.target.value);}}/>
            </InputGroup>

            {/* Confirm Passsword.*/}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Confirm Passsword</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>          
          </label>

          {/* Buttons.*/}
          <div>
            <Button variant="primary"  onClick={register}>Sign Up</Button>{' '}
            <Button variant="secondary">Cancel</Button>{' '}
          </div>        
        </div>
      </div>
    </div>
  );
}

export default App;
