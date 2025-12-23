const courseModel = require('./../models/course');
const courseValidator = require('./../validators/course');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    const {
        title,
        description,
        price,
        support,
        href,
        status,
        discount,
        categoryID
    } = req.body;

    const isSameTitleOrHrefExist = await courseModel.findOne({
        $or: [{ title }, { href }]
    });

    if (!isSameTitleOrHrefExist) {
        return res.status(409).json({message: 'There is a course with same title or href'})
    };


    const isCourseValid = courseValidator(req.body);

    if (!isCourseValid) {
        return res.json({isCourseValid})
    };

    const isCategoryIDValid = mongoose.Types.ObjectId.isValid(categoryID)

    if (!isCategoryIDValid) {
        return res.json({message: 'categoryid is not valid'})
    };
    
    const course = await courseModel.create({
        title,
        description,
        price,
        support,
        href,
        status,
        discount,
        categoryID,
        creator: req.user._id,
        cover: req.file.filename
    })
}