const courseModel = require('./../models/course');
const sessionModel = require('./../models/session');
const courseValidator = require('./../validators/course');
const mongoose = require('mongoose');


exports.create = async (req, res) => {
    const {
        name,
        description,
        price,
        support,
        href,
        status,
        discount,
        categoryID
    } = req.body;

    const isSameTitleOrHrefExist = await courseModel.findOne({
        $or: [{ name }, { href }]
    });

    if (isSameTitleOrHrefExist) {
        return res.status(409).json({ message: 'There is a course with same title or href' })
    };


    const isCourseValid = courseValidator.check(req.body)

    if (isCourseValid !== true) {
        console.log(isCourseValid);
        return res.status(422).json({ isCourseValid })
    };

    const isCategoryIDValid = mongoose.Types.ObjectId.isValid(categoryID)

    if (!isCategoryIDValid) {
        return res.json({ message: 'categoryid is not valid' })
    };

    const course = await courseModel.create({
        name,
        description,
        price,
        support,
        href,
        status,
        discount,
        categoryID,
        creator: req.user._id,
        cover: req.file.filename
    });

    const mainCourse = await courseModel.findById(course._id).populate('creator', '-password');
    return res.status(201).json({ mainCourse })
};

exports.createSession = async (req, res) => {
    const courseId = req.params.id;
    const { title, time, free } = req.body;

    console.log(sessionModel);
    
    const session = await sessionModel.create({
        title,
        time,
        free,
        video: req.file.filename,
        course: courseId
    });

    return res.status(201).json(session)
}

exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}, '-__v').populate('course', 'name').lean();

    return res.status(200).json(sessions)
}