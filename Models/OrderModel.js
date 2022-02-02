//Creating a Models
const mongoose = require("mongoose");
//creating a order Schema

const OrderScehma = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

//exporting the Model
//mongoose.model will create a model on the basis of the UserSchema
module.exports = mongoose.model("Order", OrderScehma);
