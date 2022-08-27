// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

// const MONGO_URI = require("../utils/consts");
const MONGO_URL =
  "mongodb+srv://nicberger:pallmall356@cluster0.4smeofm.mongodb.net/?retryWrites=true&w=majority" ||
  "mongodb://localhost:27017";

mongoose.connect(MONGO_URL).then((connection) => {
  console.log("Connected to Mongo" + MONGO_URL);
});

// mongoose
//   .connect(MONGO_URI)
//   .then((x) => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo: ", err);
//   });
