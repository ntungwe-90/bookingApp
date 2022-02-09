require('../models/mongooseConnection')
const FailedBooking = require("../models/failedBooking");
const Booking = require('../models/booking');
const Slot = require('../models/Slot')




exports.index = async(req, res) => {
    const failedBookings = await FailedBooking.find({})
     res.render('failedBookings/index', {failedBookings})
   
};

exports.add = async (req, res) => {
    // const failedBooking = await FailedBooking.find({});
    res.render("failedbookings/add");
  };

  

