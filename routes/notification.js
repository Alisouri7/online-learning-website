const express = require('express');
const router = express.Router();
const authMiddleware  = require('./../middlewares/auth');
const isAdminMiddleware  = require('./../middlewares/isAdmin');
const notificationController = require('./../controllers/notification');

router.post('/', authMiddleware, isAdminMiddleware, notificationController.create);
router.get('/:adminID', notificationController.get);
router.put('/:id/see', authMiddleware, isAdminMiddleware, notificationController.see);

module.exports = router;