const express = require('express');
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const articleController = require('./../controllers/article');
const multer = require('multer');
const multerMediaStorage = require('../utils/articleMediaUploader');

const router = express.Router();

router.route('/')
    .get(articleController.getAll)
    .post(authMiddleware, isAdminMiddleware, multer({ storage: multerMediaStorage, limits: { fileSize: 100000000 } }).array('media', 50), articleController.create);

router.route('/:href').get(articleController.getOne);

router.route('/:id').get(articleController.remove);

router.route("/draft/:id?").post(authMiddleware, isAdminMiddleware, multer({ storage: multerMediaStorage, limits: { fileSize: 100000000 } }).array('media', 50), articleController.saveDraft);   //optional parameter - if article created before use id to update it

module.exports = router;