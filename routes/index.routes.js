const router = require("express").Router();
/* GET home page */
router.get("/", (req, res) => {
    const user = req.session.user;
    console.log(user);
    res.render("index", user);
});
module.exports = router;
