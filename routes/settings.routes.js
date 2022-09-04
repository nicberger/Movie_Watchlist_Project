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
  const { username, email } = req.body;

  //The validation
  if (!username) {
    return res.status(400).render("settings/update-user", {
      usernameError: "Please, add a username.",
      ...req.body,
    });
  }

  if (username.length < 4) {
    console.log("ERRROR!!!!!!");
    return res.status(400).render("settings/update-user", {
      usernameError: "Your username needs to be at least 4 characters long.",
      ...req.body,
    });
  }

  if (!email) {
    return res.status(400).render("settings/update-user", {
      emailError: "Please, add an email.",
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
  // console.log("The User: ", aSingleUser);

  if (!aSingleUser) {
    await UserModel.findByIdAndUpdate(req.session.user._id, {
      username,
      email,
    });
    //return res.redirect("/");

    // return res.redirect(`/user/${req.session.user._id}`);
    return res.render("settings/update-user", {
      sucessMessage: "Saved Changes!",
    });
  }

  res.status(400).render("settings/update-user", {
    errorMessage:
      "One of those is taken, please rewrite either the username or email",
  });
});

//************************UPDATING PASSWORD *****************************

settingsRouter.get("/update-password", isLoggedIn, async (req, res) => {
  // console.log("The User:", req.session.user);
  // console.log(" 🔍 The req.session.userId is: ", req.session.user._id);
  const user = await UserModel.findById(req.session.user._id);
  if (!user) {
    return res.redirect("/");
  }

  res.render("settings/update-password", { user });
});

settingsRouter.post("/update-password", isLoggedIn, async (req, res) => {
  const user = await UserModel.findById(req.session.user._id);
  // console.log("The User🌿 :", req.session.user);
  // console.log("The User Id🌿 :", req.session.user._id);

  if (!user) {
    return res.redirect("/");
  }

  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).render("settings/update-password", {
      user,
      errorPassword: "Please write your current password",
    });
  }

  if (newPassword.length < 8 || confirmNewPassword.length < 8) {
    return res.status(400).render("settings/update-password", {
      user,
      errorPassword:
        "Your new password needs to be at least 8 characters long.",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).render("settings/update-password", {
      user,
      errorPassword: "The password confirmation doesn't match.",
    });
  }

  if (currentPassword === newPassword) {
    return res.status(400).render("settings/update-password", {
      user,
      errorPassword: "Please write a new password",
    });
  }

  const isSamePassword = bcrypt.compareSync(currentPassword, user.password);

  if (!isSamePassword) {
    return res.status(400).render("settings/update-password", {
      user,
      errorPassword: "That is not your password",
    });
  }

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

  // res.redirect(`/user/${req.session.user._id}`);
  return res.render("settings/update-password", {
    sucessMessage: "Saved Changes!",
  });
});

//******* DELETE ACCOUNT **********

settingsRouter.get("/delete-account/:_id", isLoggedIn, async (req, res) => {
  // console.log("The User:", req.session.user);
  // console.log(" 🔍 The req.session.userId is: ", req.session.user._id);
  const user = await UserModel.findById(req.session.user._id);
  if (!user) {
    return res.redirect("/");
  }

  res.render("settings/delete-account", { user });
});

// settingsRouter.post("/delete-account", isLoggedIn, async (req, res) => {
//   const user = await UserModel.findById(req.session.user._id);

//   if (!user) {
//     return res.redirect("/");
//   }

//   const { confirmPassword } = req.body;

//   if (!confirmPassword) {
//     return res.status(400).render("settings/delete-account", {
//       user,
//       errorMessage: "Please provide your password.",
//     });
//   }

//   const isSamePassword = bcrypt.compareSync(confirmPassword, user.password);

//   if (!isSamePassword) {
//     return res.status(400).render("settings/delete-account", {
//       user,
//       errorMessage: "Wrong Credentials",
//     });
//   }

//   await UserModel.findByIdAndDelete(ObjectId(req.session.user._id));
// });

// settingsRouter.delete("/delete-account", isLoggedIn, async (req, res) => {
//   const user = await UserModel.findById(req.session.user._id);

//   if (!user) {
//     return res.redirect("/");
//   }

//   const { confirmPassword } = req.body;

//   if (!confirmPassword) {
//     return res.status(400).render("settings/delete-account", {
//       user,
//       errorMessage: "Please provide your password.",
//     });
//   }

//   const isSamePassword = bcrypt.compareSync(confirmPassword, user.password);

//   if (!isSamePassword) {
//     return res.status(400).render("settings/delete-account", {
//       user,
//       errorMessage: "Wrong Credentials",
//     });
//   }

//   await UserModel.findByIdAndDelete(ObjectId(req.session.user._id));
// });

// settingsRouter.post("/delete-account", isLoggedIn, async (req, res) => {
//   const user = await UserModel.findById(req.session.user._id);

//   const { password } = req.body;

//   if (!user) {
//     return res.status(400).render("settings/delete-account", {
//       errorMessage: "Please provide your password.",
//     });
//   }

//   const isSamePassword = bcrypt.compareSync(password, user.password);

//   if (!isSamePassword) {
//     return res.status(400).render("settings/delete-account", {
//       user,
//       errorMessage: "That is not your password",
//     });
//   }

// bcrypt.compare(password, user.password).then((isSamePassword) => {
//   console.log("Is the same password?", isSamePassword);
//   if (!isSamePassword) {
//     return res.status(400).render("auth/login", {
//       errorMessage: "Wrong credentials.",
//     });
//   }
// });

// const user = await UserModel.findByIdAndDelete(req.session.user._id);

module.exports = settingsRouter;
