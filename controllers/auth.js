const model = require('./../models/user');

const registerValidator = require('./../validators/register')

exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body);
    if (!validationResult) {
        return res.status(422).json(validationResult);
    }
};

exports.login = async (req, res) => {

};

exports.getMe = async (req, res) => {

};