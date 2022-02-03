//Creating a Models
const mongoose = require("mongoose");
//creating a user Schema

const UserScehma = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //also one for the Admin
    isadmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//exporting the Model
//mongoose.model will create a model on the basis of the UserSchema
module.exports = mongoose.model("User", UserScehma);
