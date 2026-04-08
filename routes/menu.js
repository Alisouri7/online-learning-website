const express = require('express');
const router = express.Router();
const menuController = require('./../controllers/menu');
const authMiddlware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');

router.route('/')
                .post(authMiddlware, isAdminMiddleware, menuController.create)
                .get(menuController.getAll);

router.route('/all').get(authMiddlware, isAdminMiddleware, menuController.getAllInPanel);

router.route('/:id').delete(authMiddlware, isAdminMiddleware, menuController.remove);

module.exports = router;
