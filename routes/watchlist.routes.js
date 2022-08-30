const { Router } = require("express");
// const { isValidObjectId } = require("mongoose");
// const isLoggedIn = require("../middleware/isLoggedIn.middleware");
// const WatchlistModel = require("../models/Watchlist.model");

const watchlistRouter = Router();

watchlistRouter.get("/", (req, res) => {
  //   WatchlistModel.find({}).then((films) => {
  res.render("user/watchlist");
  // console.log("Test message",req)
  //   });
});

module.exports = watchlistRouter;
