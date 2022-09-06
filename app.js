//helpers

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerHelper("click", function () {
  console.log("clicked");
});

const app = express();
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "Movie_Watchlist_Project";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const api = require("./api");
app.use("/api", api);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const watchlistRoutes = require("./routes/watchlist.routes");
app.use("/watchlist", watchlistRoutes);

const watchedlistRoutes = require("./routes/watchedlist.routes");
app.use("/watchedlist", watchedlistRoutes);

const settingsRouter = require("./routes/settings.routes");
app.use("/settings", settingsRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// Make everything inside of public/ available
app.use(express.static("public"));

module.exports = app;

//test
//test2

// // ℹ️ Gets access to environment variables/settings
// // https://www.npmjs.com/package/dotenv
// require("dotenv/config");

// // ℹ️ Connects to the database
// require("./db");

// // Handles http requests (express is node js framework)
// // https://www.npmjs.com/package/express
// const express = require("express");

// // Handles the handlebars
// // https://www.npmjs.com/package/hbs
// const hbs = require("hbs");

// const app = express();

// // ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require("./config")(app);

// const capitalized = require("./utils/capitalized");
// const projectName = "Movie_Watchlist_Project";

// app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// // Make everything inside of public/ available
// app.use(express.static("public"));

// // 👇 Start handling routes here
// const index = require("./routes/index.routes");
// app.use("/", index);

// const api = require("./api");
// app.use("/api", api);

// const authRoutes = require("./routes/auth.routes");
// app.use("/auth", authRoutes);

// const userRoutes = require("./routes/user.routes");
// app.use("/user", userRoutes);

// // ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require("./error-handling")(app);

// module.exports = app;
