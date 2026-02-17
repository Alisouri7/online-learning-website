const express = require('express');

const cors = require('cors')
const path = require('path')
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const courseRouter = require('./routes/course')
const commentRouter = require('./routes/comment');
const contactusRouter = require('./routes/contactus');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/courses/covers', express.static(path.join(__dirname,'public' , 'courses', 'covers')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/courses', courseRouter);
app.use('/comments', commentRouter);

module.exports = app;