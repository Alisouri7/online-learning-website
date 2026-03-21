const express = require('express');

const ticketController = require('./../controllers/ticket');
const authMiddleware = require('./../middlewares/auth');
const isAdminMiddleware = require('./../middlewares/isAdmin');

const router = express.Router();

router.route('/')
    .get(authMiddleware, isAdminMiddleware, ticketController.getAll)
    .post(authMiddleware, ticketController.create);

router.route('/user').get(authMiddleware, ticketController.userTickets);

router.route('/departments').get(ticketController.departments);

router.route('/departments-sub/:id').get(ticketController.departmentsSubs);

router.route('/answer').post(authMiddleware, isAdminMiddleware, ticketController.setAnswer);

router.route('/:id/answer').post(authMiddleware, ticketController.getAnswer);

module.exports = router;