//Creating a Models
const mongoose = require("mongoose");
//creating a user Schema

const ProductScehma = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    size: { type: String },
    cateogries: [
      {
        type: String,
      },
    ],
    color: { type: String },
    price: { type: Number, required: true },
    img: {
      type: Object,

      url: {
        type: URL,
      },
      public_id: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
//done with the thon

//exporting the Model
//this is the product

//mongoose.model will create a model on the basis of the UserSchema
module.exports = mongoose.model("Product", ProductScehma);
