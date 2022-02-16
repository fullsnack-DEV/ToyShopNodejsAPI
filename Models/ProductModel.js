//Creating a Models
const mongoose = require("mongoose");
//creating a user Schema

const ProductScehma = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    size: { type: String, unique: true },
    cateogries: [
      {
        type: String,
      },
    ],
    color: { type: String },
    price: { type: Number },
    img: {
      type: Object,

      url: {
        type: URL,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

//exporting the Model
//mongoose.model will create a model on the basis of the UserSchema
module.exports = mongoose.model("Product", ProductScehma);

//product Schema
