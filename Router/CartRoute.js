const Cart = require("../Models/CartModel");

const {
  VerifyTokenandAuthrozation,
  VerifyTokenandAdmin,
} = require("../Middleware/VerifyToken");

const router = require("express").Router();

//create Cart
router.post("/", async (req, res) => {
  //We are getting the new product
  //Create a new product in the Schema

  const newCart = new Cart(req.body);

  //Get the newproduct schema
  //we are savong the product

  try {
    //saving product in the saveprodyct
    const savedCart = await newCart.save();
    res.status(200).json({
      message: "Success",
      data: savedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      Errror: error,
    });
  }
});

//Update Cart

router.put("/:id", VerifyTokenandAuthrozation, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Success",
      data: updateCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",

      error: error,
    });
  }
});

router.delete("/:id", VerifyTokenandAuthrozation, async (req, res) => {
  try {
    //deleteing the user
    //find the user

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product has been deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: "failed to remove the Account ",
    });
  }
});

// //get user Cart

router.get("/find/:userid", VerifyTokenandAuthrozation, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userid: req.params.id });

    res.status(200).json({
      message: "Success",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      message: "failded",
      Error: err,
    });
  }
});

// // //get all Cart

router.get("/", VerifyTokenandAdmin, (req, res) => {
  try {
    const allcart = Cart.find();
    res.status(200).json({
      message: "Success",
      data: allcart,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed",
      Error: error,
    });
  }
});

module.exports = router;

//Todo
// 1> Make the Json data for the Toys > Change the Schema Add the price title image field
// 2 > Make one route for the onboarding screen Data
// 3 > If possible then add the Add to cart fucntinaloti in Backend As well
