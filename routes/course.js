const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const courseController = require('./../controllers/course');
const multer = require('multer');
const multerStorage = require('./../utils/uploader');


router.route('/')
.post(authMiddleware, 
    isAdminMiddleware, 
    multer({ storage: multerStorage, limits: { fileSize: 10000000 } }).single('cover'), 
    courseController.create);


module.exports = router;