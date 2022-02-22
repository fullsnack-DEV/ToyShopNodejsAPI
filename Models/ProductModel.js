//Creating a Models
const mongoose = require("mongoose");
//creating a user Schema

const ProductScehma = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    dialogue: { type: String, unique: true },
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

//
//exporting the Model

//mongoose.model will create a model on the basis of the UserSchema
module.exports = mongoose.model("Product", ProductScehma);

//Resolve the error in uploading the product data 😊
//REact from in react native
//reat antive from the
