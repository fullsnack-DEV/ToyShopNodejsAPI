const Product = require("../Models/ProductModel");

const { VerifyTokenandAdmin } = require("../Middleware/VerifyToken");

const router = require("express").Router();

const cloudinary = require("../Cloud/index");
const multer = require("../Middleware/multer");

router.post(
  "/",
  VerifyTokenandAdmin,

  //parsing the data
  (req, res, next) => {
    const { cateogries } = req.body;
    if (cateogries) req.body.cateogries = JSON.parse(cateogries);
    next();
  },

  multer.single("img"),
  async (req, res) => {
    //We are getting the new product
    //Create a new product in the Schema
    // console.log(req.file, "THis is the REq body");
    const { file } = req;
    const { title, desc, cateogries, size, price, img } = req.body;

    const newProduct = new Product({
      title,
      desc,
      cateogries,
      size,
      price,
      img,
    });

    if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path
      );

      newProduct.img = { url: url, public_id };
    }
    t;

    try {
      const savedproduct = await newProduct.save();
      console.log(savedproduct.cateogries, "From Saved Product");

      res.status(200).json({
        message: "Success",
        data: {
          product: savedproduct,
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

router.put("/:id", VerifyTokenandAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
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
        updateProduct,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",

      error: error,
    });
  }
});

router.delete("/:id", VerifyTokenandAdmin, async (req, res) => {
  try {
    //deleteing the user
    //find the user

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product has been deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: "failed to remove the Account ",
    });
  }
});

//get product

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      message: "Success",
      Product: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "failded",
      Error: err,
    });
  }
});

// //get all Products

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let product;
    if (qNew) {
      product = await Product.find()
        .sort({
          createdAt: -1,
        })
        .limit(5);
    } else if (qCategory) {
      product = await Product.find({
        cateogries: {
          $in: [qCategory],
        },
      });
    } else {
      product = await Product.find();
    }

    res.status(200).json({
      message: "Success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "failded",
      Error: err,
    });
  }
});

module.exports = router;
