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
        image: {
            type: String
        },
        price: {
            type: Number,
        },
        unit: {
            type: String,
            enum: ["lb", "gram", "ounce"]
        },
        zipCode: {type: String},
        zipCoords: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            }
        },
        expireAt : {
            type: Date,
            default: new Date(new Date().setDate(new Date().getDate() + 7)) //expires in 7 days
        }
    },
    { timestamps: true }  //Creates an update and created at pathway 
);

ListingSchema.index({zipCoords: '2dsphere'});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
