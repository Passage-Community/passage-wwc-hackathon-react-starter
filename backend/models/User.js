const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true },
        email: {type: String},
        passage_id: {
            type: String,
            unique: true
        },
        zipcode: {type: String},
        username: {type: String, unique: true},
        favoritepeople:  [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        ],
        favoritelistings: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Listing"
            }
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;