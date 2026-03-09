const express = require('express');
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const articleController = require('./../controllers/article');
const multer = require('multer');
const multerCoverStorage = require('./../utils/articleCoverUploader');
const multerVideoStorage = require('../utils/articleVideoUploader');

const router = express.Router();

router.route('/')
    .get(articleController.getAll)
    .post(authMiddleware, isAdminMiddleware, multer({ storage: multerCoverStorage, limits: { fileSize: 10000 } }).single('cover'), multer({ storage: multerVideoStorage, limits: { fileSize: 100000 } }).single('video'), articleController.create);

// router.route('/:href').get(articleController.getOne);
// router.route('/:id').get(articleController.remove);
// router.route('/draft').post(authMiddleware, isAdminMiddleware, multer({storage: multerCoverStorage, limits: {fileSize: 10000}}).single('cover'), multer({storage: multerVideoStorage, limits: {fileSize: 100000}}).single('video'),articleController.saveDraft);

