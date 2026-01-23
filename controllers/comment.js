const commentModel = require('./../models/comment');
const coursemodel = require('./../models/course');
const mongoose = require('mongoose');

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

exports.getCommentInfo = async (req, res) => {
    const isCommentIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isCommentIDValid) {
        return res.json({message: 'id is not valid'})
    }
    const comment = await commentModel.findOne({_id: req.params.id}).populate('course').populate('creator').lean();

    return res.json(comment)
}