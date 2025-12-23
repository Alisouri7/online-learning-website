const courseModel = require('./../models/course');

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
    }

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