const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookingsController')


router.get('/', controller.index)
router.get('/add', controller.add)
router.post('/add', controller.save)
router.get('/edit/:booking_id', controller.edit)
router.post('/edit/:booking_id', controller.update)
router.get('/delete', controller.delete)

module.exports = router