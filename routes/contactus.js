const express = require('express');
const contactusController = require('./../controllers/contactus');
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');
const router = express.Router();

router.route('/')
                .post(contactusController.create)
                .get(authMiddleware, isAdminMiddleware, contactusController.getAll);
                

router.route('/:id').delete(authMiddleware, isAdminMiddleware, contactusController.remove);

router.route('/answer').post(authMiddleware, isAdminMiddleware, contactusController.answer);

module.exports = router;