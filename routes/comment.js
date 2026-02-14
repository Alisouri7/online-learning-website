const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const commentController = require('./../controllers/comment');

router.route('/').post(authMiddleware, commentController.create);

router.route('/:id').get(authMiddleware, isAdminMiddleware, commentController.getCommentInfo);

router.route('/:id').put(authMiddleware, isAdminMiddleware, commentController.isAccept);           //send req.query named (accept) with 0(remove) or 1(accept)

router.route('/:id/answer').post(authMiddleware, isAdminMiddleware, commentController.answer);     //reply to comments through admin - id : that comment has been replied to

router.route('/').get(authMiddleware, isAdminMiddleware, commentController.getAll);

module.exports = router;