const Cryptojs = require("crypto-js");
const User = require("../Models/UserModel");

const {
  VerifyTokenandAuthrozation,
  VerifyTokenandAdmin,
} = require("../Middleware/VerifyToken");

const router = require("express").Router();

router.put("/:id", VerifyTokenandAuthrozation, async (req, res) => {
  if (req.body.password) {
    req.body.password = Cryptojs.AES.encrypt(
      req.body.password,
      process.env.SECRET_MESSAGE
    ).toString();
  }

  try {
    //update the usetr
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Suucess",
      data: updateduser,
    });
  } catch (error) {
    res.status(500).json({
      message: Error,
      error,
    });
  }
});

router.delete("/:id", VerifyTokenandAuthrozation, async (req, res) => {
  try {
    //deleteing the user
    //find the user

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User has been deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: "failed to remove the Account ",
    });
  }
});

router.get("/find/:id", VerifyTokenandAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({
      message: "Success",
      ...others,
    });
  } catch (err) {
    res.status(500).json({
      message: "failded",
      Error: err,
    });
  }
});

//get all user

router.get("/", VerifyTokenandAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json({
      message: "Success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "failded",
      Error: err,
    });
  }
});

module.exports = router;

//Acces token
