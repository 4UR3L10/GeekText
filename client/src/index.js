import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import signin from "./components/signin";
import signup from "./components/signup";
import newpayment from "./components/newpayment";
import newshipaddress from "./components/newshipaddress";
import mngpayment from "./components/mngpayment";
import mngshipaddress from "./components/mngshipaddress";
import mngaccount from "./components/mngaccount";
import mngsettings from "./components/mngsettings";
import updateshipaddress from "./components/updateshipaddress";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={signin} />
      <Route exact path="/signup" component={signup} />
      <Route exact path="/newpayment" component={newpayment} />
      <Route exact path="/newshipaddress" component={newshipaddress} />
      <Route exact path="/mngpayment" component={mngpayment} />
      <Route exact path="/mngshipaddress" component={mngshipaddress} />
      <Route exact path="/mngaccount" component={mngaccount} />
      <Route exact path="/mngsettings" component={mngsettings} />
      <Route exact path="/updateshipaddress" component={updateshipaddress} />
      <App />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
