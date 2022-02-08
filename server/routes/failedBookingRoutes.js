const express = require('express')
const router = express.Router()
const controller = require('../controllers/failedBookingController')



router.get('/', controller.index)
