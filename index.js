const express = require("express");

const app = express();

const dotenv = require("dotenv");

//importing Routes
const UserRoute = require("./Router/user");

//env config
dotenv.config();

//gettig momgoose to connect to the db
const mongoose = require("mongoose");

//Playing with the Router

//Connecting application to the Mongo db Atlas Server

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Success db Connection"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
//base Layer
app.use("/api/user", UserRoute);

//listining
app.listen(process.env.PORT_NO || 5000, () => {
  console.log("Listning from Backend . . .");
});
