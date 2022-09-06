const router = require("express").Router();

/* GET home page */

router.get("/", (req, res) => {
  const user = req.session.user;

  console.log(user);

  res.render("index", user);
});

module.exports = router;

// const router = require("express").Router();

// const isLoggedIn = require("../middleware/isLoggedIn");

// /* GET home page */
// router.get("/", (req, res, next) => {
//   const isLoggedIn = req.session.user ? true : false;

//   console.log("this is logged in", isLoggedIn);ss
//   res.render("index", isLoggedIn);
// });

// module.exports = router;
