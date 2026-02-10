const mongoose = require('mongoose');

const schema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isAccept: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 5,
        enum: [1,2,3,4,5]
    },
    isAnswer: {                                                //if the comment is not a base comment this is 1
        type: Number,
        required: true
    },
    isReply: {                                                 //if the comment be a reply to answer this is 1, otherwise 0
        type: Number,
        required: true
    },
    mainCommentID: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }
}, { timestamps: true });

const model = mongoose.model('Comment', schema);

module.exports = model;