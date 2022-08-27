const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: String,
        watchlist: [{ type: Schema.Types.ObjectId, ref: "Watchlist" }],
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
