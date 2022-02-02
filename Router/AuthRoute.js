//handling the Authentication Route

const router = require("express").Router();
//getting user model
const User = require("../Models/UserModel");

//Registring the User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });

  try {
    const savedUser = await newUser.save();
    //sending the Response
    res.status(201).json({
      message: "Success",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
      error,
    });
    // console.log(error);
  }
});

module.exports = router;
