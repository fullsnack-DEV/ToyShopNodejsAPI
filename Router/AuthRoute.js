//handling the Authentication Route

const router = require("express").Router();
//getting user model
const User = require("../Models/UserModel");
//using crypto js to crypt the password
const CryptoJS = require("crypto-js");
//jwt
const jwt = require("jsonwebtoken");

//Registring the User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(500).send("Please Enter the Credentials");
  }

  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_MESSAGE
    ).toString(),
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

//login Function
router.post("/login", async (req, res) => {
  //   console.log(req.body);
  const { username } = req.body;

  try {
    //Something here
    //1 >  we will find the user in the database
    const user = await User.findOne({ username });

    //if user is not present in the database then send
    //the negative response

    !user &&
      res.status(401).json({
        message: "Invalid Credentials",
      });

    //then we willl get the password and dcrypt it

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_MESSAGE
    );

    //convert password into string
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // impelemt JWT
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isadmin,
      },
      process.env.JWT_SEC, //secret Key
      { expiresIn: "3d" }
    );

    // checking the pass word with the user req password

    console.log(req.body.password);

    OriginalPassword !== req.body.password &&
      res.status(500).json({
        message: " Invalid Credential!",
      });

    const { password, ...others } = user._doc;

    //if everything is Okay then return the user

    res.status(200).json({
      message: "Success",
      data: {
        ...others,
        accessToken,
      },
    });
  } catch (err) {
    res.status(200).json({
      message: "Failed some Error",
      err,
    });
  }
});

module.exports = router;

//Build the API of Toy shop
//minimal fea ture should be the Auth and then cart section
//then in the front end build the Admin Panel
//Fetch the Api at the React Native app and then
// make the good front end design at the fromt end ofthe app
// make use of  context api as well
// some Reanimated 2 animtion would also looks good
// implement the protect route

//---->  Work Hard in Silence, Let your Success Make a Noise --->
