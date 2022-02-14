require('../models/mongooseConnection')
// const FailedBooking = require("../models/failedBooking");
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

  xports.save = async (req, res) => {
    // const failedBooking = await FailedBooking.find({});
    res.render("/add");
  };
 

//   exports.save = async(req, res) =>{
//     console.log(req.body)
//     const failedBooking = new FailedBooking({
//        name: req.body.name,
//         phone:req.body.phone,
//         email:req.body.email,
//         booking_date: new Date(req.body.booking_date),

//     })

//     await failedBooking.save()
//     res.render('failedBookings/add')
// }

// exports.edit = async(req, res) => {
//   await  res.render("failedBookings/edit")
// };


// exports.delete = async (req, res) =>{
//  await   res.render("failedBookings/delete")
// }
  

