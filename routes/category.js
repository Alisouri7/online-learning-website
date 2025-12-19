const express = require('express');
const authMiddlware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const categoryController = require('./../controllers/category')

const router = express.Router();

router.route('/')
                .post(authMiddlware, isAdminMiddleware, categoryController.create)
                .get(categoryController.getAll);


router.route('/:id')
                    .put(authMiddlware, isAdminMiddleware, categoryController.update)
                    .delete(authMiddlware, isAdminMiddleware, categoryController.remove);

module.exports = router;