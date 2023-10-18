const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        fromUserID: { type: String },
        toUserID: { type: String },
        text: { type: String },
        sendAt : {
            type: Date,
            default: new Date() 
        },
        readByToUser:{type:Boolean,default:false}

    },
    { timestamps: true }  //Creates an update and created at pathway 
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;