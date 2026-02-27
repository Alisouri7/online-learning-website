const mongoose = require('mongoose');

const schema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    max: {                                    //maximum uses of code
        type: Number,
        required: true
    },
    uses: {                                   //number of uses
        type: Number,                         
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const model = mongoose.model('Off', schema);
module.exports = model;