const express = require('express')
const router = express.Router()
const userController = require('./../controllers/user')
const authMiddleware = require('./../middlewares/auth')
const isAdminMiddleware = require('./../middlewares/isAdmin')

router.route('/ban/:id').post(authMiddleware, isAdminMiddleware, userController.banUser);

router.route('/')
    .get(authMiddleware, isAdminMiddleware, userController.getAll)
    .put(authMiddleware, userController.updateUser);

router.route('/delete/:id').delete(authMiddleware, isAdminMiddleware, userController.deleteUser);

router.route('/role').put(authMiddleware, isAdminMiddleware, userController.changeRole);

module.exports = router