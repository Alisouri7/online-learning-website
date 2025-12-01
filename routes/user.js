const express = require('express')
const router = express.Router()
const userController = require('./../controllers/user')

router.route('/ban/:id').post(userController.banUser)

module.exports = router