const userModel = require('./../models/user');

const registerValidator = require('./../validators/register')

exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body);
    if (!validationResult) {
        return res.status(422).json(validationResult);
    }

    const {username, name, email, password, phone} = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{username}, {email}]
    });
    if (isUserExist) {
        return res.status(409).json({message: 'userame or email ha used before!'})
    }
};

exports.login = async (req, res) => {

};

exports.getMe = async (req, res) => {

};