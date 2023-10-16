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
            enum: { values: ["produce", "live plant", "seed"], description: "Must be either produce, live plant, or seed"}
        },  
        dateexpires: {
            type: Date,
            default: new Date(),
            expires: 604800 //expires in 7 days
        }
    },
    { timestamps: true }  //Creates an update and created at pathway 
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
