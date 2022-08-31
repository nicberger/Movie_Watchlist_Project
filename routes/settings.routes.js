const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");

const settingsRouter = Router();

settingsRouter.get("/", isLoggedIn, (req, res) => {
  res.render("settings/home");
});

module.exports = settingsRouter;
