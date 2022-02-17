const express = require("express");

const app = express();

const dotenv = require("dotenv");

//importing Routes
const UserRoute = require("./Router/UserRoute");
//Auth Router
const AuthRouter = require("./Router/AuthRoute");

//product Router
const ProductRouter = require("./Router/ProductRoute");
//order Router
const OrderRouter = require("./Router/OrderRoute");

//env config
dotenv.config();

//gettig momgoose to connect to the db
const mongoose = require("mongoose");
//Playing with the Router
// Stop the Procstination
//Connecting application to the Mongo db Atlas Server

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Success db Connection"))
  .catch((err) => console.log(err));

//middleware

app.use(express.json());
//AuthbLayer
app.use("/api/auth", AuthRouter);
//User Layer
app.use("/api/user", UserRoute);
//Product Layer
app.use("/api/product", ProductRouter);
//ODer Layer
app.use("api/order/", OrderRouter);

//listining
app.listen(process.env.PORT_NO || 5000, () => {
  console.log("Listning from Backend . . .");
});
