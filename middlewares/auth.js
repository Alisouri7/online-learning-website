const userModel = require('./../models/user')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization.split(' ')

    if (authHeader.length !== 2) {
        return res.status(403).json({ message: 'please login and recieve access token ' })
    }

    const token = authHeader[1]

    try {

        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(jwtPayload.id)
        
    } catch (err) {
        return res.json(err)
    }
}