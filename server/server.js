/* Imports. */
const express = require("express");
const apiRouter = require("./routes");
const app = express();

/* Initialization. */
app.use(express.json());

/* URIS. */
app.use("/api/users", apiRouter); /* Testing. */
app.use("/api/signup", apiRouter); /* Pending. */
app.use("/api/account", apiRouter); /* Pending. */
app.use("/api/account/manage/settings", apiRouter); /* Pending. */
app.use("/api/account/manage/shipping_address", apiRouter); /* Pending. */
app.use("/api/account/manage/payment", apiRouter); /* Pending. */

/* Port Listen Number. */
app.listen(process.env.PORT || "3000", () => {
  console.log("Server is running on port: ${process.env.PORT || '3000'}");
});
