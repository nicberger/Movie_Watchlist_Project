const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const UserModel = require("../models/User.model");
const {
    Types: { ObjectId },
} = require("mongoose");

const bcrypt = require("bcrypt");

const settingsRouter = Router();

settingsRouter.get("/", isLoggedIn, (req, res) => {
    res.render("settings/home");
});

// *******UPDATING USER **********
settingsRouter.get("/update-user", isLoggedIn, async (req, res) => {
    const user = await UserModel.findById(req.session.user._id);

    console.log("The User:", req.session.user);
    console.log(" 🔍 The req.session.userId is: ", req.session.user._id);

    if (!user) {
        return res.redirect("/");
    }
    res.render("settings/update-user", { user });
});

settingsRouter.post("/update-user", isLoggedIn, async (req, res) => {
    const { username = "", email = "" } = req.body;

    //The validation
    if (username.length < 4) {
        return res.status(400).render("settings/update-user", {
            usernameError:
                "Your username needs to be at least 4 characters long.",
            ...req.body,
        });
    }

    if (!email.includes("@")) {
        return res.status(400).render("settings/update-user", {
            emailError: "Please, enter a valid email address.",
            ...req.body,
        });
    }

    // We have to check if there is a user with the "new" Username and "new" email.
    const aSingleUser = await UserModel.findOne({
        $or: [{ username }, { email }],
        _id: { $ne: ObjectId(req.session.user._id) },
    });
    console.log("The User: ", aSingleUser);

    if (!aSingleUser) {
        await UserModel.findByIdAndUpdate(req.session.user._id, {
            username,
            email,
        });
        //return res.redirect("/");

        return res.redirect(`/user/${req.session.user._id}`);
    }

    res.status(400).render("settings/update-user", {
        errorMessage:
            "One of those is taken, please rewrite either the username or email",
    });
});

//*******UPDATING PASSWORD **********
settingsRouter.get("/update-password", isLoggedIn, async (req, res) => {
    console.log("The User:", req.session.user);
    console.log(" 🔍 The req.session.userId is: ", req.session.user._id);
    const user = await UserModel.findById(req.session.user._id);
    if (!user) {
        return res.redirect("/");
    }

    res.render("settings/update-password", { user });
});

settingsRouter.post("/update-password", isLoggedIn, async (req, res) => {
    const user = await UserModel.findById(req.session.user._id);
    console.log("The User🌿 :", req.session.user);
    console.log("The User Id🌿 :", req.session.user._id);

    if (!user) {
        return res.redirect("/");
    }

    const {
        currentPassword = "",
        newPassword = "",
        confirmNewPassword = "",
    } = req.body;

    if (
        !currentPassword ||
        newPassword.length < 8 ||
        confirmNewPassword.length < 8 ||
        newPassword !== confirmNewPassword
    ) {
        return res.status(400).render("settings/update-password", {
            user,
            errorMessage: "Fill every input correctly",
        });
    }

    if (currentPassword === newPassword) {
        return res.status(400).render("settings/update-password", {
            user,
            errorMessage: "Please write a new password",
        });
    }

    const isSamePassword = bcrypt.compareSync(currentPassword, user.password);

    if (!isSamePassword) {
        return res.status(400).render("settings/update-password", {
            user,
            errorMessage: "That is not your password",
        });
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.redirect(`/user/${req.session.user._id}`);
});

module.exports = settingsRouter;
