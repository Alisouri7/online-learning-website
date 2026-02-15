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
        isAccept: 0,
        isAnswer: 0,
    });

    return res.status(201).json(comment)
};

exports.getCommentInfo = async (req, res) => {
    const isCommentIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isCommentIDValid) {
        return res.json({ message: 'id is not valid' })
    }
    const comment = await commentModel.findOne({ _id: req.params.id }).populate('course').populate('creator').lean();

    return res.json(comment)
}

exports.isAccept = async (req, res) => {

    const isCommentIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isCommentIDValid) {
        return res.json({ message: 'id is not valid' })
    };

    let comment = await commentModel.findOne({ _id: req.params.id });

    if (!comment) {
        return res.status(404).json({ message: 'there is not exist comment with this id' });
    }

    const query = Number(req.query.accept);


    if (query === 1) {

        const mainComment = await commentModel.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                isAccept: 1
            }
        })
        return res.json(mainComment);

    } else if (query === 0) {

        await commentModel.findOneAndDelete({ _id: req.params.id })

        return res.json({ message: 'comment removed' });
    } else if (query > 1 || query < 0) {

        return res.json({ message: 'req query must be 0(not accept and remove) or 1(accept)' })

    }

};

exports.answer = async (req, res) => {

    const isCommentIDValid = mongoose.Types.ObjectId.isValid(req.params.id);
    const { body } = req.body;

    if (!isCommentIDValid) {
        return res.json({ message: 'id is not valid' })
    };


    const mainComment = await commentModel.findOne({ _id: req.params.id, isAccept: 1 });

    if (!mainComment) {
        return res.status(404).json({ message: 'main comment not found' })
    };

    const answerComment = await commentModel.create({
        body,
        course: mainComment.course,
        creator: mainComment.creator,
        isAccept: 1,
        isAnswer: 1,
        mainCommentID: req.params.id
    });

    return res.status(201).json(answerComment)
};

exports.getAll = async (req, res) => {
    const comments = await commentModel.find({}).populate('course').populate('creator', '-password').lean();

    let mainComments = [];

    comments.forEach(comment => {
        if (comment.isAccept === 0 || 1 && comment.isAnswer === 0) {
            mainComments.push(comment)
            mainComments[mainComments.indexOf(comment)].answers = [];
            comments.forEach((answerComment) => {
                if (String(comment._id) === String(answerComment.mainCommentID)) {
                    answerComment.answers = [];
                    comment.answers.push(answerComment)
                }
            })
        } else if (comment.isReply === 1) {
            comment.answers = [];

            comments.forEach((answerComment) => {
                if (String(comment.mainCommentID) === String(answerComment._id)) {
                    answerComment.answers.push(comment)
                }
            })
        }
    });
    return res.status(200).json(mainComments)
}