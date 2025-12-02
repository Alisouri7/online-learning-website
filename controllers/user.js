const userModel = require('./../models/user');
const banModel = require('./../models/ban-phone');

exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({_id: req.params.id}).lean();
    const banUserResult = await banModel.create({
        phone: mainUser.phone
    });
    if (banUserResult) {
        await userModel.deleteOne({_id: mainUser._id})
        return res.status(200).json({message: 'user banned successfully'})
    }
    return res.status(500).json({message: 'server error in ban user'})
}