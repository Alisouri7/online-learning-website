const newsletterModel = require('./../models/newsletter');

exports.getAll = async (req, res) => {
    const newsletters = await newsletterModel.find({}).lean();
    return res.json(newsletters)
}

exports.create = async (req, res) => {
    const { email } = req.body;
    if (email.match(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm)) {
        const newEmail = await newsletterModel.create({
            email: email
        })
        return res.json(newEmail)
    }

     return res.json({message: 'email s not valid'})
}