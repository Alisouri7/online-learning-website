const courseModel = require('./../models/course');
const sessionModel = require('./../models/session');
const courseValidator = require('./../validators/course');
const courseUserModel = require('./../models/course-user');
const categoryModel = require('./../models/cateory');
const commentModel = require('./../models/comment');
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

exports.register = async (req, res) => {
    const isUserAlreadyRegistered = await courseUserModel.findOne({ user: req.user._id, course: req.params.id }).lean();

    if (isUserAlreadyRegistered) {
        return res.status(409).json({ message: 'user has aready registered in this course' })
    }

    const register = await courseUserModel.create({
        user: req.user._id,
        course: req.params.id,
        price: req.body.price
    });

    return res.status(201).json({ message: 'you registered to course successfully' })
}

exports.getOne = async (req, res) => {
    const course = await courseModel
        .findOne({ href: req.params.href })
        .populate('creator', '-password')
        .populate('categoryID');

    const sessions = await sessionModel.find({ course: course._id }).lean();                           //virtual relation
    const comments = await commentModel.find({ course: course._id, isAccept: 1 })                       //virtual relation
        .populate('course', 'name')
        .populate('creator', 'username name')
        .lean();

    let commentsWithAnswers = [];                                                                             //push each comment(as an object) with its answers
    let answerComments = [];

    comments.forEach((comment) => {

        if (comment.isAnswer === 0) {

            for (let i = 0; i < comments.length; i++) {

                if (String(comment._id) === String(comments[i].mainCommentID)) {
                    comments[i].answers = [];
                    answerComments.push(comments[i]);
                }

            }

            commentsWithAnswers.push(comment);

            commentsWithAnswers[commentsWithAnswers.indexOf(comment)].answers = [];
            
            commentsWithAnswers[commentsWithAnswers.indexOf(comment)].answers.push(...answerComments);
            
            answerComments = [];

        }

    });


    const courseStudentsCount = await courseUserModel.countDocuments({ course: course._id });         //counting number of course students

    const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({                         // this signs (!!)  change result to boolean - this constant will show to front end to show course to user or not
        course: course._id,
        user: req.user._id
    }));

    return res.status(200).json({ course, sessions, commentsWithAnswers, courseStudentsCount, isUserRegisteredToThisCourse })
}

exports.getCoursesByCategory = async (req, res) => {
    const { href } = req.params;
    const category = await categoryModel.findOne({ href }).lean();

    if (category) {
        const courses = await courseModel.find({ categoryID: category._id });

        return res.status(200).json(courses)
    } else {
        return res.status(404).json({ message: 'caetgory not found' })
    }
}

exports.remove = async (req, res) => {

    const isObjectIdValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isObjectIdValid) {
        return res.json({ message: 'id is not valid' })
    }

    const course = await courseModel.findOneAndDelete({ _id: req.params.id });
    return res.json({ message: `${course} deleted successfully.` })
};

exports.getRelated = async (req, res) => {
    const { href } = req.params;

    const course = await courseModel.findOne({ href: href });

    if (!course) {
        return res.json({ message: 'course not found' })
    };

    let relatedCourses = await courseModel.find({ categoryID: course.categoryID });

    relatedCourses = relatedCourses.filter((course) => {                            //this filter returns all courses in category exept course sent in params
        course.href !== href
    });

    return res.json(relatedCourses)
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
};

exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}, '-__v').populate('course', 'name price').lean();

    return res.status(200).json(sessions)
};

exports.getSessionInfo = async (req, res) => {
    const course = await courseModel.find({ href: req.params.href }).lean();
    console.log(course);

    const session = await sessionModel.findOne({ _id: req.params.sessionID }).lean();

    const sessions = await sessionModel.find({ course: course[0]._id }).lean();

    return res.status(200).json({ session, sessions });
};

exports.removeSession = async (req, res) => {
    const session = await sessionModel.findOneAndDelete({
        _id: req.params.id
    });

    if (!session) {
        return res.status(404).json({ message: 'couldnt remove session!' })
    };

    return res.status(204).json(session)
};