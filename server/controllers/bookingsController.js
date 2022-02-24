require("../models/mongooseConnection");
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const FailedBooking = require("../models/FailedBooking");
const failedBooking = require("../models/FailedBooking");
const user = require("../models/user");

// booking routes
exports.index = async (req, res) => {
  const bookings = await Booking.find({});
  // console.log(bookings)
  res.render("bookings/index", { bookings });
};

exports.add = async (req, res) => {
  const slot = await Slot.find({});
  res.render("bookings/add", { slot });
};


exports.save = async (req, res) => {
 
  // checking for bookingdate
  const booking_date = req.body.booking_date;
  // checking the date
  const next_Date = new Date(booking_date);
  next_Date.setDate(next_Date.getDate() + 1);
  console.log(next_Date)
  // codition to check if date in slots and the input are thesame
  // we check if the slot is greater than the date filled on the form
  // also checks if the quantity we have is thesame to what is demmanded
  const slot = await Slot.findOne({
    slot_date: {
      $gte: new Date(booking_date),
      $lt: next_Date,
      
    },
    quantity:{ $gte:0}
    });
   console.log(slot)
  if (slot) {
    const booking = new Booking({
      user:user._id,
      email:req.body.email,
      services:req.body.services,
      slot:slot._id
    })
  
   await booking.save()
   console.log(booking)
  
   slot.quantity -=1
   await slot.save()

   // condition to check if user name doesnt exist then displa
   if (!user.name) {
     res.render('booking/user')
   }else{
   res.redirect(302,'/bookings')
   } 

   
    // console.log("booking date availabe");
  } else {
    const failedBooking = new FailedBooking({
      user:user._id,
      email:req.body.email,
      services:req.body.services,
      booking:booking_date
    })
    await failedBooking.save()
    // console.log("booking is not available");

    
  }
};

exports.edit = async (req, res) => {
  res.render("bookings/edit");
};
exports.update = async (req, res) => {
  res.redirect("/bookings");
};

exports.comfirmdelete = async (req, res) => {
  res.render("bookings/delete");
};
exports.delete = async (req, res) => {
  res.redirect("/bookings");
};
