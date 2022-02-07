const express = require('express');
const controller = require('../controllers/pagesController');
const router = express.Router();


router.get("/", controller.home)
// router.get("/booking", controller.booking)
// router.get("/slots", controller.slot)


 module.exports = router