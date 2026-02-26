const notificationModel = require('./../models/notification');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    const { message, admin } = req.body;

    const isAdminIDValid = mongoose.Types.ObjectId.isValid(admin);

    if (!isAdminIDValid) {
        return res.json({ message: 'admin id is not valid' })
    }

    const notification = await notificationModel.create({
        message, admin
    });

    return res.status(201).json(notification)
}

exports.get = async (req, res) => {

    const { _id } = req.user;

    const adminNotifications = await notificationModel.find({ admin: _id });

    return res.json(adminNotifications)
}

exports.see = async (req, res) => {
    const { id } = req.params;

    const isNotoficationIDValid = mongoose.Types.ObjectId.isValid(id);

    if (!isNotoficationIDValid) {
        return res.json({message: 'id is not valid'})
    }

    const notification = await notificationModel.findOneAndupdate({_id: id}, {see: 1});
    return res.json(notification)
}

exports.getAll = async (req, res) => {
    const notifications = await notificationModel.find({}).lean();

    return res.json(notifications)
}