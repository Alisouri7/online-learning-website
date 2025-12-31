const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const courseController = require('./../controllers/course');
const multer = require('multer');
const multerCoverStorage = require('../utils/coverUploader');
const multerVideoStorage = require('./../utils/videoUploader');


router.route('/')
.post(authMiddleware, 
    isAdminMiddleware, 
    multer({ storage: multerCoverStorage, limits: { fileSize: 10000000 } }).single('cover'), 
    courseController.create);


router.route('/:id/sessions').post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerVideoStorage, limits: { fileSize: 100000000 }}).single('video'),
    courseController.createSession
);

router.route('/sessions').get(authMiddleware, isAdminMiddleware, courseController.getAllSessions);


router.route('/:href/:sessionID').get(courseController.getSessionInfo);            //href: course href

module.exports = router;