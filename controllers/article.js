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
    const { id, title, description, body, href, categoryID, author } = req.body;       //if each entity send empty(exept id) means dont want to change or update it, the entity remain on last value

    const isArticleIDValid = mongoose.Types.ObjectId.isValid(id);

    if (!isArticleIDValid) {
        return res.json({ messae: 'id is not valid' })
    }

    const mainArticle = await articleModel.findOne({ _id: id }).lean();

    let mediasArray = mainArticle.media;
    
    req.files.forEach((media) => {
        mediasArray.push(media.filename)
    })
    
    
    let mediasSet = new Set(mediasArray);


    const updatedArticle = await articleModel.findOneAndUpdate({ _id: id }, {
        title: title ? title : mainArticle.title,
        description: description ? description : mainArticle.description,
        body: body ? body : mainArticle.body,
        href: href ? href : mainArticle.href,
        categoryID: categoryID ? categoryID : mainArticle.categoryID,
        author: author ? author : mainArticle.author,
        media: [...mediasSet]
    })


    return res.json(updatedArticle)
}