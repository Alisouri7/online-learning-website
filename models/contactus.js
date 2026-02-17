const { request } = require('express');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('Contactus', schema);
module.exports = model;