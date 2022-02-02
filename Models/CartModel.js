//Creating a Models
const mongoose = require("mongoose");
//creating a user Schema

const CartScehma = new mongoose.Schema(
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
  },
  { timestamps: true }
);

//exporting the Model
//mongoose.model will create a model on the basis of the UserSchema
module.exports = mongoose.model("Cart", CartScehma);
