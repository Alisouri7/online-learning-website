const courseModel = require('./../models/course');
const offModel = require('./../models/off');
const mongoose = require('mongoose');

exports.setOnAll = async (req, res) => {
    const { discount } = req.body;

    await courseModel.updateMany({}, { discount });

    return res.json({ message: 'discount set on all courses successfully' })
}

exports.getAll = async (req, res) => {
    const offs = await offModel.find({}, '-__v').populate('course', 'name href').populate('creator', 'name').lean();
    return res.json(offs)
}

exports.create = async (req, res) => {
    const { code, percent, max, course } = req.body;

    const isCodeUnique = await offModel.find({ code }).lean();

    if (!isCodeUnique) {
        return res.status(409).json({ message: 'this code already exist!' })
    }

    const off = await offModel.create({
        code,
        percent,
        max,
        uses: 0,
        course,
        creator: req.user._id
    })
    return res.json(off)
}

exports.useOne = async (req, res) => {
    const { code, courseID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(code) || mongoose.Types.ObjectId.isValid(courseID)) {
        return res.json({ message: 'id is not valid' })
    }

    const off = await offModel.findOne({ code, courseID });

    if (off) {
        if (off.uses < off.max) {
            await offModel.findOneAndUpdate({ code, courseID }, { $inc: { uses: 1 } })
            return res.json({ message: 'code successfully submited' })
        } else {
            return res.json({ message: 'code expired' })
        }
    } else {
        return res.json({ message: 'code not exist' })
    }
}

exports.remove = async (req, res) => {
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isObjectIDValid) {
        return res.json({ message: 'id is not valid' })
    }
    const off = await offModel.findOneAndDelete({ _id: req.params.id })
    return res.json(off)
}
