require('../models/mongooseConnection')
const FailedBooking = require("../models/failedBooking");




exports.index = async(req, res) => {
    const failedBookings = await FailedBooking.find({})
     res.render('failedBooking/index', {failedBookings})
   
};

