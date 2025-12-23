const courseModel = require('./../models/course');

exports.create = async (req, res) => {
    const {
        title,
        description,
        price, support,
        href,
        status,
        discount,
        categoryID
    } = req.body;

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