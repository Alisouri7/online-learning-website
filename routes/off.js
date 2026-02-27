const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const offController = require('./../controllers/off');
const auth = require('./../middlewares/auth');

router.route('/')
                .get(authMiddleware, isAdminMiddleware,offController.getAll)
                .post(authMiddleware, isAdminMiddleware, offController.create);

router.route('/all').post(authMiddleware, isAdminMiddleware, offController.setOnAll);

router.route('/:code').post(authMiddleware, offController.getOne);

router.route('/:code').delete(authMiddleware,isAdminMiddleware, offController.remove);

module.exports = router