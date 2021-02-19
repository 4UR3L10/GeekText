import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="App">
      <div className="registration">
        <div>
          <div>
            <h2 id="dialog-title">Sign in or Create an Account</h2>
          </div>
          <div>
            <div>
              Email:
              <input
                name="TextBoxEmail"
                type="text"
                id="TextBoxEmail"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              />
            </div>
            <div>
              Password:
              <input
                name="TextBoxPassword"
                type="password"
                id="TextBoxPassword"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
            </div>
            <div>
              <div>
                <input
                  onClick={register}
                  type="submit"
                  name="ButtonSignIn"
                  value="Sign In"
                  id="ButtonSignIn"
                />
                <input
                  type="submit"
                  name="ButtonCancel"
                  value="Cancel"
                  id="ButtonCancel"
                />
              </div>
            </div>
          </div>
          <div>
            <p>
              By signing in you are agreeing to our{" "}
              <a href="#" class="link--underline">
                Terms of Use
              </a>{" "}
              and our{" "}
              <a href="#" class="link--underline">
                Privacy Policy
              </a>
            </p>
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <a href="#" class="link--underline">
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
