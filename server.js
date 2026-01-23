const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const port = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('db connected');
})()

app.get('/', (req, res) => {
    console.log('token: ', req.header('Authorization').split(' ')[1]);
    console.log(jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET));

    res.status(200).json({ message: 'ok' })
})

app.listen(port, () => {
    console.log(`server run on port ${port}`);
})
