const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const commentController = require('./../controllers/comment');

router.route('/').post(authMiddleware, commentController.create);

router.route('/:id').get(authMiddleware, isAdminMiddleware, commentController.getCommentInfo);

module.exports = router;