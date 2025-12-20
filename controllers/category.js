const mongoose = require('mongoose');
const categoryModel = require('./../models/cateory');
const categoryValidator = require('./../validators/cateory');

exports.create = async (req, res) => {
    const { title, href } = req.body;
    const validationResult = categoryValidator.check(req.body);

    if (!validationResult) {
        return res.status(400).json({ message: 'category information is not valid' })
    };

    const isCategoryExist = await categoryModel.findOne({
        $or: [{ title }, { href }]
    })
    if (isCategoryExist) {
        return res.status(409).json({ message: 'there is a category with same name or href' })
    };

    const category = await categoryModel.create({
        title,
        href
    });
    return res.json(category)
}

exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({}).lean();
    return res.status(200).json(categories);
}

exports.remove = async (req, res) => {
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(req.params.id)

    if (!isObjectIdValid) {
        return res.json({ message: 'category id is not valid' })
    };

    const isCategoryExist = await categoryModel.findOne({ _id: req.params.id })
    if (isCategoryExist) {
        const category = await categoryModel.findOneAndDelete({ _id: req.params.id })

        return res.status(200).json(category)
    };
    return res.status(404).json({ message: 'this category is not exist!' });

}

exports.update = async (req, res) => {
    const { title, href } = req.body;
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isObjectIdValid) {
        return res.json({ message: 'category id is not valid' })
    };

    const isTitleOrHrefExist = await categoryModel.findOne({
        $or: [{ title }, { href }]
    });

    if (isTitleOrHrefExist) {
        return res.json({ message: 'there is a title or href like your req.body' })
    };

    await categoryModel.findOneAndUpdate({ _id: req.params.id }, {
        title,
        href
    })

    const category = await categoryModel.findOne({_id: req.params.id})
    return res.status(200).json(category);
}