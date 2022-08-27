const { Router } = require("express");

const UserModel = require("../models/User.model");

const userRoutes = Router();

userRoutes.get("/:userId", (req, res) => {
    UserModel.findById(req.params.userId)
        .then((user) => {
            if (!user) {
                return res.redirect("/");
            }

            res.render("user/personal", {
                user: user,
                userId: req.params.userId,
            });
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).redirect("/");
        });
});

module.exports = userRoutes;
