// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URL = require("../utils/consts");

mongoose.connect(MONGO_URL).then((connection) => {
  console.log("Connected to Mongo" + MONGO_URL);
});
