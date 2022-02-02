const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send({
    message: "User test us successful",
  });
});

module.exports = router;
