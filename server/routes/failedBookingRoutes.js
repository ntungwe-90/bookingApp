const express = require('express')
const router = express.Router()
const controller = require('../controllers/failedBookingController')



router.get('/', controller.index)
router.get('/add', controller.add)
router.post('/add', controller.save)
// router.get('/edit/:failedBooking_id', controller.edit)
// router.post('/edit/:failedBooking_id', controller.update)
// router.get('/delete', controller.delete)
