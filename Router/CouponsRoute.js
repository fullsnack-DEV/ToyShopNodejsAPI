const Discount = require("../Models/DiscountModel");

const router = require("express").Router();

//need only Admin acess to upload the Discount Copuons
const { VerifyTokenandAdmin } = require("../Middleware/VerifyToken");

const cloudinary = require("../Cloud/index");
const multer = require("../Middleware/multer");

//creating the Coupons

router.post(
  "/",
  //Check if Admin
  VerifyTokenandAdmin,
  //multer config
  multer.single("img"),

  async (req, res) => {
    const { file } = req;
    const { desc, img } = req.body;

    //Add it to Schema

    const newdiscount = new Discount({
      desc,
      img,
    });

    if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path
      );

      newdiscount.img = { url: url, public_id };
    }

    try {
      const saveddiscount = await newdiscount.save();

      res.status(200).json({
        message: "Success",
        data: {
          discount: saveddiscount,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed",
        Errror: error,
        message: "Failded Badly",
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let discount = await Discount.find();
    res.status(200).json({
      message: "Success",
      data: {
        discount,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
      Error: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);

    //sending response
    res.status(200).json({
      message: "Coupon has been Deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete the Account",
    });
  }
});

///deleteing the Product

//Also havr to add some Few products with different  
//Categories so that we can make the few lists in the frontend
//part with new listings 


module.exports = router;
