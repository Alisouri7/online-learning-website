const express = require('express');

const departmentController = require('./../controllers/department');
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');

const router = express.Router();

router.route('/')
                .get(authMiddleware, isAdminMiddleware, departmentController.getAll)
                .post(authMiddleware, isAdminMiddleware, departmentController.create)

module.exports = router;