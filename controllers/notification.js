const notificationModel = require('./../models/notification');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    const {message, admin} = req.body;

    const isAdminIDValid = mongoose.Types.ObjectId.isValid(admin);

    if (!isAdminIDValid) {
        return res.json({message: 'admin id is not valid'})
    }
    
    const notification = await notificationModel.create({
        message, admin
    });

    return res.status(201).json(notification)
}

exports.get = async (req, res) => {
    
}

exports.see = async (req, res) => {
    
}