//Creating a Models
const mongoose = require("mongoose");
//creating a user Schema

const ProductScehma = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    label: { type: String, unique: true },
    desc: { type: String, required: true },
    size: { type: String },
    cateogries: [
      {
        type: String,
      },
    ],
    color: { type: String },
    size: { type: String },
    price: { type: Number, required: true },
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

// Toys Data
//Name ==> label ==> optional
//Price
//Size in cm
//MAde of Plastic

//Image
//Desc
//cateogries

//Another Route for Most polpular as well
//One route to Show the offers ==> Work on it a bit
//one route for the onboarding screen
//
