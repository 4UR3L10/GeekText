// Imports.
const express = require("express");
const signUpRoute = require("./routes/signup");
const signInRoute = require("./routes/signin");
const ManageSettingsRoute = require("./routes/mngsettings");
const ShippingAddressRoute = require("./routes/shipaddress");
const PaymentRoute = require("./routes/payment");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");

// Json form send data , you need to use URL enoded request bodies.
app.use(express.json());
app.use(cors());

// Testing Token Cookies.
app.use(cookieParser());

// HTML form send data , you need to use URL enoded request bodies.
app.use(express.urlencoded({ extended: false }));

// Call SignUp Section.
app.use("/signup", signUpRoute);

// Call SignIn Section.
app.use("/signin", signInRoute);

// Call ManageSettings Section.
app.use("/mngsettings", ManageSettingsRoute);

// Call Manage Shipping Address Section.
app.use("/shipaddress", ShippingAddressRoute);

// Call Manage Payment Section.
app.use("/payment", PaymentRoute);

// Run the Server PORT 3001.
app.listen(3001, () => {
  console.log("Server is running on port: 3001");
});
