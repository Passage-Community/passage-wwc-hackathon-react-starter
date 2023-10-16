const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
    {
        title: { type: String },
        text: { type: String },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        category: {
            type: String, 
            enum: ["produce", "live plant", "seed"]  
        },  
        expireAt : {
            type: Date,
            default: new Date(new Date().setDate(new Date().getDate() + 7)) //expires in 7 days
        }
    },
    { timestamps: true }  //Creates an update and created at pathway 
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
