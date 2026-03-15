const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    media: [{
        type: String,
        required: false
    }],
    href: {
        type: String,
        required: true
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    published: {
        type: Number,              //0-1
        required: true
    },
}, { timestamps: true });

const model = mongoose.model('Article', schema);
module.exports = model;