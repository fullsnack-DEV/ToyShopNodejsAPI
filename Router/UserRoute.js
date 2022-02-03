const Cryptojs = require("crypto-js");
const User = require("../Models/UserModel");

const { VerifyTokenandAuthrozation } = require("../Middleware/VerifyToken");

const router = require("express").Router();

router.put("/:id", VerifyTokenandAuthrozation, async (req, res) => {
  console.log(req.params.id);

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
      data: {
        updateduser,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: Error,
      error,
    });
  }
});
module.exports = router;

//Acces token
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmFjMzhmZGQ1NDBiMzYxMzM4MjRhZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDM4Nzk0MDUsImV4cCI6MTY0NDEzODYwNX0.4RH26thUpA_i6lNASLnVm1OIz2lY1M_eVCWOfhc4jto"
