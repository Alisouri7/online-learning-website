const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true                 //the email must be unique in DB
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
    role: {
        type: String,
        default: 'USER',                 //default, no need to required
        enum: ['ADMIN', 'USER']           //enumareted, property must be one of this words
    },
},
    { timestamps: true }                        //timestamps option, add createdAt and updatedAt to document!
)

const model = mongoose.model('User', schema)
module.exports = model