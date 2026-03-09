const articleModel = require('./../models/article');


exports.create = async (req, res) => {
    const { title, description, body, href, categoryID, author } = req.body;

    console.log(req.file);
    res.end()
    // const article = await articleModel.create({
    //     title, 
    //     description, 
    //     body, 
    //     href, 
    //     categoryID, 
    //     author,
    // })
};

exports.getAll = async (req, res) => {
    const articles = await articleModel.find({}).lean();
    res.json(articles)
};