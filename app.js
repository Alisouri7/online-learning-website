const express = require('express');

const cors = require('cors')
const path = require('path')
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/user')
const categoryRouter = require('./routes/category')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/courses/covers', express.static(path.join(__dirname,'public' , 'courses', 'covers')));

app.use('/auth', authRouter);
app.use('/users/', usersRouter);
app.use('/category', categoryRouter);

module.exports = app;