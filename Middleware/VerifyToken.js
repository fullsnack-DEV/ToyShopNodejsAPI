//Verification of jwt Middleware
const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const authheader = req.headers.token;
  if (authheader) {
    const token = authheader.split(" ")[1];

    //if token preset then we will Match it to our user token
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not Valid! ");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not Authenticated ",
    });
  }
};

const VerifyTokenandAuthrozation = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isadmin) {
      next();
    } else {
      res.status(403).json({
        message: "you are not allowed",
      });
    }
  });
};

const VerifyTokenandAdmin = (req, res, next) => {
  //   console.log(req.headers.token);
  VerifyToken(req, res, () => {
    // console.log(req.headers.token, "2");
    // console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "you are not allowed fool!",
      });
    }
  });
};

module.exports = {
  VerifyToken,
  VerifyTokenandAuthrozation,
  VerifyTokenandAdmin,
};
