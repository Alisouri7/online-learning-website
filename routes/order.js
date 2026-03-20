//this router dont need model, use course-user model
const express = require('express');
const authMiddleware = require('./../middlewares/auth');
const router = express.Router();
const orderController = require('./../controllers/order');

router.route('/').get(authMiddleware, orderController.getAll);

router.route('/:id').get(authMiddleware, orderController.getOne);

module.exports = router;