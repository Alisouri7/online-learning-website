const userModel = require('./../models/user');
const banModel = require('./../models/ban-phone')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerValidator = require('./../validators/register')

exports.register = async (req, res) => {
    const validationResult = registerValidator.check(req.body);
    if (validationResult !== true) {
        return res.status(422).json({ validationResult });
    }

    const { username, name, email, password, phone } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });
    if (isUserExist) {
        return res.status(409).json({ message: 'userame or email has used before!' });
    }

    const isUserBanned = await banModel.findOne({ phone: phone }).lean();

    if (isUserBanned) {
        return res.status(409).json({ message: 'user has been banned.' })
    };

    const countOfUsers = await userModel.countDocuments({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
        email,
        username,
        name,
        phone,
        password: hashedPassword,
        role: countOfUsers ? 'USER' : 'ADMIN'
    });
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30 day'
    });

    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, 'password')
    return res.status(201).json({ userObject, token: accessToken })
};

exports.login = async (req, res) => {
    const { identifier, password } = req.body;                       //data that we can identify user like email or username
    const user = await userModel.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
        return res.status(401).json({ message: 'There is no user with this email or username.' })
    };

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ mesage: 'password is not correct' })
    };

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30 day'
    });
    console.log(accessToken);
    return res.json({ accessToken })
};

exports.getMe = async (req, res) => {

};