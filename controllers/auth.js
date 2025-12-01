const userModel = require('./../models/user');
const bcrypt = require('bcrypt')

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
        return res.status(409).json({message: 'userame or email ha used before!'});
    }
    const countOfUsers = await userModel.countDocuments({})
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
        email,
        username,
        name,
        phone,
        password: hashedPassword,
        role: countOfUsers? 'USER':'ADMIN'
    });
};

exports.login = async (req, res) => {

};

exports.getMe = async (req, res) => {

};