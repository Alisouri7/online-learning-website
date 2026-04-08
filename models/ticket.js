const mongoose = require('mongoose');

const schema = mongoose.Schema({
    departmentID: {
        type: mongoose.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    departmentSubID: {
        type: mongoose.Types.ObjectId,
        ref: 'DepartmentSub',
        required: true
    },
    priority: {
        type: Number,        //1-2-3
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer: {                //wheather the ticket has been answered or not
        type: Number,        //0-1
        required: true
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: false
    },
    parentID: {
        type: mongoose.Types.ObjectId,
        ref: 'Ticket',
        required: false
    },
    isAnswer: {                 //Is a user ticket or admin answer
        type: Number,           //0 - 1
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('Ticket', schema);

module.exports = model;