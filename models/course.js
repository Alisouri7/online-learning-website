const mongoose = require('module')


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
} , { timestamps: true})