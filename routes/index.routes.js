const { request, response } = require("../app");

const router = require("express").Router();

// Here is the implementation of the middleware
// The middleware can make changes on every object, both on the request and the response.
router.use((req, res, next) => {
  console.log("REQUEST RECEIVED!!!!!!!!!👏👏👏");
  // res.render("index");
  req.test = "Testing the middleware";
  next();
});

// /* GET home page */
// router.get("/", (req, res, next) => {
//   console.log("res.test:", req.test);
//   console.log("INSIDE THE BASE ROUTER GET ON HOME PAGE❤️❤️❤️");
//   res.render("index");
// });

/* GET home page */
router.get("/", (req, res, next) => {
  const isLoggedIn = req.session.user ? true : false;
  console.log("this is logged in", isLoggedIn);
  res.render("index", { isLoggedIn });
});

module.exports = router;
