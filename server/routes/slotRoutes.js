const express = require ('express');
const controller = require('../controllers/slotsController')

const router = express.Router();

router.get('/', controller.index)
router.get('/add',controller.add)
router.post('/add', controller.save)
router.get('/edit',controller.edit)
router.get('/delete', controller.delete)

module.exports = router