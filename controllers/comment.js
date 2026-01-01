const commentModel = require('./../models/comment');
const coursemodel = require('./../models/course');

exports.create = async (req, res) => {
    const { body, href, score } = req.body;

    const course = await coursemodel.findOne({ href });

    const comment = await commentModel.create({
        body,
        course: course._id,
        score,
        creator: req.user._id,
        isAccept:0,
        isAnswer:0,
    });

    return res.status(201).json(comment)
};