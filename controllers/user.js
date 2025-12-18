const userModel = require('./../models/user');
const banModel = require('./../models/ban-phone');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
    if (!mainUser) {
        return res.status(204).json({ message: 'user has banned and deleted from DB' })
    }
    const banUserResult = await banModel.create({
        phone: mainUser.phone
    });
    if (banUserResult) {
        await userModel.deleteOne({ _id: mainUser._id })
        return res.status(200).json({ message: 'user banned successfully' })
    }
    return res.status(500).json({ message: 'server error in ban user' })
}

exports.getAll = async (req, res) => {
    const users = await userModel.find({}, '-password -__v').lean();      //remove password and __v properties in response

    return res.json(users)
}

exports.deleteUser = async (req, res) => {
    const isValidUserId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidUserId) {
        return res.status(409).json({ message: 'user id is not valid' })
    };

    const removedUser = await userModel.findByIdAndDelete(req.params.id);

    if (removedUser) {
        return res.status(204).json({ message: 'user successfully removed' })
    };
    return res.status(404).json({ message: 'user not  found in DB' });
}

exports.changeRole = async (req, res) => {
    const isValidUserId = mongoose.Types.ObjectId.isValid(req.body.id);

    if (!isValidUserId) {
        return res.status(409).json({ message: 'user id is not valid' })
    };

    const user = await userModel.findById(req.body.id);

    let newRole = user.role === 'ADMIN' ? 'USER' : "ADMIN";

    const updatedUser = await userModel.findByIdAndUpdate(req.body.id, {
        role: newRole
    })

    if (updatedUser) {

        return res.status(200).json({ message: 'user role changed successfully' })
    }

    return res.status(400).json({ message: 'user role changed failed' })

}

exports.updateUser = async (req, res) => {
    const {name, username, email, password, phone} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.findOneAndUpdate({_id: req.user._id}, {
        name,
        username,
        email,
        password: hashedPassword,
        phone
    }).select('-password').lean();

    return res.json({user})
}