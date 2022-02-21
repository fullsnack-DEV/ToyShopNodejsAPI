//Creating a Models
const mongoose = require("mongoose");
//creating a user Schema

const DiscountScehma = new mongoose.Schema(
  {
    desc: { type: String, required: true },

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

module.exports = mongoose.model("Discount", DiscountScehma);
