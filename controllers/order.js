const courseUserModel = require('./../models/course-user');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
    const orders = await courseUserModel.find({ user: req.user._id })
        .populate('course', 'name href')
        .lean();

    return res.json(orders)
}
exports.getOne = async (req, res) => {
    const isOrderIDValid = mongoose.Types.ObjectId.isValid(req.params);

    if(!isOrderIDValid) {
        return res.json({message: 'id is not valid'})
    }
    const order = await courseUserModel.findOne({ _id: req.params.id })
    .populate('course')
    .lean();

    return res.json(order)
}