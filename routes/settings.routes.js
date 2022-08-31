const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const UserModel = require("../models/User.model");
const {
  Types: { ObjectId },
} = require("mongoose");

const settingsRouter = Router();

settingsRouter.get("/", isLoggedIn, (req, res) => {
  res.render("settings/home");
});

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

  //*********The validation*************
  if (username.length < 4) {
    return res.status(400).render("settings/update-user", {
      usernameError: "Your username needs to be at least 4 characters long.",
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

module.exports = settingsRouter;
