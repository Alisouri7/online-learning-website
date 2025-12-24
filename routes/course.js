const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const courseController = require('./../controllers/course');
const multer = require('multer');
const multerCoverStorage = require('../utils/coverUploader');


router.route('/')
.post(authMiddleware, 
    isAdminMiddleware, 
    multer({ storage: multerCoverStorage, limits: { fileSize: 10000000 } }).single('cover'), 
    courseController.create);


module.exports = router;