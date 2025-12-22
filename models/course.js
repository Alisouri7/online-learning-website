const mongoose = require('mongoose')


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
        description: {
        type: String,
        required: true
    },
        cover: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
        support: {
        type: String,
        required: true
    },
        href: {
        type: String,
        required: true
    },
        status: {
        type: String,
        required: true
    },
        discount: {
        type: Number,
        required: true
    },
        categoryID: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
} , { timestamps: true});

const model = mongoose.model('Course', schema);

module.exports = model;