const { Router } = require("express");

const settingsRouter = Router();

settingsRouter.get("/", (req, res) => {
  res.render("settings/home");
});
