const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
const isLoggedIn = req.session.user ? true : false
// console.log("this is logged in", isLoggedIn)
  res.render("index",{isLoggedIn});
});

module.exports = router;

