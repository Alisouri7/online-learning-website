const articleModel = require('./../models/article');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    const { title, description, body, href, categoryID, author } = req.body;

    let medias = [];

    req.files.forEach(media => {
        medias.push(media.filename)
    });

    const article = await articleModel.create({
        title,
        description,
        body,
        href,
        categoryID,
        author,
        media: medias,
        published: 0
    })

    return res.json(article)
};

exports.getAll = async (req, res) => {
    const articles = await articleModel.find({}).lean();
    return res.json(articles)
};

exports.getOne = async (req, res) => {
    const { href } = req.params;
    const article = await articleModel.findOne({ href }).lean();
    return res.json(article)
};

exports.remove = async (req, res) => {
    const isArticleIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isArticleIDValid) {
        return res.json({ messae: 'id is not valid' })
    }
    const removedArticle = await articleModel.findOneAndDelete({ _id: req.params.id });

    res.json(`ARTICLE: ${removedArticle} DELETED!`)
}

exports.saveDraft = async (req, res) => {
    const isArticleExist = await articleModel.findOne({ _id: req.params.id });
    if (isArticleExist) {

    } else {
        const { title, description, body, href, categoryID, author } = req.body;

        let medias = [];

        req.files.forEach(media => {
            medias.push(media.filename)
        });

        const article = await articleModel.create({
            title,
            description,
            body,
            href,
            categoryID,
            author,
            media: medias,
            published: 0
        })

        return res.json(article)
    }
}