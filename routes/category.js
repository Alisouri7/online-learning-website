const express = require('express');
const authMiddlware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const categoryController = require('./../category.js')

const router = express.Router();

router.route('/')
                .post(authMiddlware, isAdminMiddleware, categoryController.create)
                .get(categoryController.getAll);
