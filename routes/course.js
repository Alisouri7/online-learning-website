const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const courseController = require('./../controllers/course');
const multer = require('multer');
const multerCoverStorage = require('../utils/coverUploader');
const multerVideoStorage = require('./../utils/videoUploader');

router.route('/').post(
    authMiddleware, 
    isAdminMiddleware, 
    multer({ storage: multerCoverStorage, limits: { fileSize: 10000000 } }).single('cover'), 
    courseController.create
);


router.route('/:href').get(authMiddleware, courseController.getOne);

router.route('/category/:href').get(courseController.getCoursesByCategory);

router.route('/:id').delete(authMiddleware, isAdminMiddleware, courseController.remove);

router.route('/related/:href').get(courseController.getRelated);

router.route('/:id/sessions').post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerVideoStorage, limits: { fileSize: 100000000 }}).single('video'),
    courseController.createSession
);

router.route('/:id/register').post(authMiddleware, courseController.register)   //this route use for register a user to a course - id is user object id

router.route('/sessions').get(authMiddleware, isAdminMiddleware, courseController.getAllSessions);


router.route('/:href/:sessionID').get(courseController.getSessionInfo);            //href: course href

router.route('/sessions/:id').delete(authMiddleware, isAdminMiddleware, courseController.removeSession);

module.exports = router;