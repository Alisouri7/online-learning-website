const mongoose = require('mongoose')


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    free: {
        type: Number,
        required: true
    }
} , { timestamps: true});

const model = mongoose.model('Course', schema);

module.exports = model;