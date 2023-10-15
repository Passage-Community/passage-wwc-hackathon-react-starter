const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
   firstname: {type: String, required: true},
   lastname: {type: String, required: true },
   email: {type: String},
   passageToken: {type: String},
   zipcode: {type: String},
   favoritepeople: {type: String},
   favoritelistings: {type: String},
   listings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Listing",
    },
  ]}
  ,

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;