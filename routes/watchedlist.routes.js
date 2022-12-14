const WatchedModel = require("../models/Watched.model");
const UserModel = require("../models/User.model");
const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");

const watchedlistRouter = Router();

watchedlistRouter.get("/create", (req, res) => {
    console.log("request", req.query, req.session.user._id);
    WatchedModel.create({
        user_id: req.session.user._id,
        movieID: req.query.id,
        title: req.query.original_title,
        poster_path: req.query.poster_path,
    });
    res.redirect("/watchedlist");
});

watchedlistRouter.get("/", async (req, res) => {
    const allFilms = await WatchedModel.find({
        user_id: req.session.user._id,
    });
    console.log(allFilms);
    res.render("user/watchedlist", { allFilms });
});

// ######################### DELETE ENTRY ################################

watchedlistRouter.get("/delete", isLoggedIn, async (req, res) => {
    await WatchedModel.findByIdAndDelete(req.query.id);
    res.redirect("/watchedlist");
});

module.exports = watchedlistRouter;
