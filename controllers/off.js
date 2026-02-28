const courseModel = require('./../models/course');

exports.setOnAll = async (req, res) => {
    const {discount} = req.body;

    await courseModel.updateMany({},{discount});

    return res.json({message: 'discount set on all courses successfully'})
}
