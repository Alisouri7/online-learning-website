
const categoryModel = require('./../models/cateory');
const categoryValidator = require('./../validators/cateory')

exports.create = async (req, res) => {
    const {title, href} = req.body;
    const validationResult = categoryValidator.check(req.body);

    if (!validationResult) {
        return res.status(400).json({message: 'category information is not valid'})
    };

    const isCategoryExist = await categoryModel.find({
        $or: [{title}, {href}]
    })
    if (isCategoryExist) {
        return res.status().json({message: 'there is a category with same name or href'})
    };
    
    const category = await categoryModel.create({
        title,
        href
    });
    return res.status(201).json(category)
}

exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({}).lean();
    return res.status(200).json(categories);
}

exports.remove = async (req, res) => {

}

exports.update = async (req, res) => {

}