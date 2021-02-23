import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

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
      <div className="registration">
        <h1>Registration</h1>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailAddressReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Registration</h1>
        <input type="text" placeholder="Username..." />
        <input type="text" placeholder="Password..." />
        <button>Register</button>
      </div>
    </div>
  );
}

export default App;
