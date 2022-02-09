require("../models/mongooseConnection");
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const FailedBooking = require("../models/FailedBooking")

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
  console.log(req.body)
  // checking for bookingdate
  const booking_date = req.body.booking_date;
  // checking the date
  const next_Date = new Date(booking_date);
  next_Date.setDate(next_Date.getDate() + 1);
  console.log(next_Date)
  // codition to check if date in slots and the input are thesame
  // we check if the slot is greater than the date filled on the form
  // also checks if the quantity we have is thesame to what is demmanded
  const slots = await Slot.find({
    slot_date: {
      $gte: new Date(booking_date),
      $lt: next_Date,
    },
    });
  console.log(slots)
  if (slots.length > 0) {
    let slot = slots[0];
    const booking = new Booking({
      name:req.body.name,
      phone:req.body.phone,
      email:req.body.email,
      services:req.body.services,
      booking_date:req.body.booking_date
    })
   await booking.save()
// saving our failed booking 
   const failedBooking = new FailedBooking({
    name:req.body.name,
    phone:req.body.phone,
    email:req.body.email,
    services:req.body.services,
    booking_date:req.body.booking_date
   })

   var decrement = slots.quantity -1
   await Slot.updateOne({_id:slots._id})
   res.render('bookings/index')

   
    // console.log("booking date availabe");
  } else {
    
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
