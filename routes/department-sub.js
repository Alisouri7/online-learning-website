const express = require('express');

const departmentSubController = require('./../controllers/department-sub');
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const auth = require('./../middlewares/auth');

const router = express.Router();

router.route('/')
                .get(authMiddleware, isAdminMiddleware, departmentSubController.getAll)
                .post(authMiddleware, isAdminMiddleware, departmentSubController.create);
                
module.exports = router;