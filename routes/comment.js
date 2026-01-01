const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const commentController = require('./../controllers/comment');

router.route('/').post(authMiddleware, commentController);

module.exports = router;