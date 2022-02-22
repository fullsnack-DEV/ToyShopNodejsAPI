const Order = require("../Models/CartModel");

const {
  VerifyTokenandAuthrozation,
  VerifyTokenandAdmin,
} = require("../Middleware/VerifyToken");

const router = require("express").Router();

//create Ord
router.post("/", async (req, res) => {
  //We are getting the new product
  //Create a new product in the Schema

  const newOrder = new Order(req.body);

  //Get the newproduct schema
  //we are savong the product

  try {
    //saving product in the saveprodyct
    const savedOrder = await newOrder.save();
    res.status(200).json({
      message: "Success",
      data: {
        product: savedOrder,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      Errror: error,
    });
  }
});

//Update Order

router.put("/:id", VerifyTokenandAuthrozation, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
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
      data: {
        updateOrder,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",

      error: error,
    });
  }
});

//delete Order
router.delete("/:id", VerifyTokenandAuthrozation, async (req, res) => {
  try {
    //deleteing the user
    //find the user

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product has been deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: "failed to remove the Account ",
    });
  }
});

// //get user oder

router.get("/find/:userid", VerifyTokenandAdmin, async (req, res) => {
  try {
    const Order = await Order.find({ userid: req.params.id });

    res.status(200).json({
      message: "Success",
      Product: Order,
    });
  } catch (err) {
    res.status(500).json({
      message: "failded",
      Error: err,
    });
  }
});

// // //get all Orders

router.get("/", VerifyTokenandAdmin, (req, res) => {
  try {
    const allOrders = Order.find();
    res.status(200).json({
      message: "Success",
      data: {
        allOrders,
      },
    });
  } catch (error) {}
});

module.exports = router;
