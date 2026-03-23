const express = require('express');
const departmentSubController = require('./../controllers/department-sub');
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');

const router = express.Router();