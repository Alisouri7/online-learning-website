const express = require('express');
const router = express.Router();
const authMiddleware  = require('./../middlewares/auth');
const isAdminMiddleware  = require('./../middlewares/isAdmin');
const notificationController = require('./../controllers/notification');

router.route('/')
                .post(authMiddleware, isAdminMiddleware, notificationController.create)
                .get(authMiddleware, isAdminMiddleware, notificationController.getAll);

router.get('/:admins', notificationController.get);
router.put('/:id/see', authMiddleware, isAdminMiddleware, notificationController.see);

module.exports = router;