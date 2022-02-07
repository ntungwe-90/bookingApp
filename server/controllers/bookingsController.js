require("../models/mongooseConnection");
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");


// booking routes
exports.index = async (req, res) => {
  const bookings = await Booking.find({});
  res.render("bookings/index", { bookings });
};

exports.add = async (req, res) => {
  const slot = await Slot.find({});
  res.render("bookings/add", { slot });
};
exports.save = async (req, res) => {
  // checking for bookingdate
const booking_date = req.body.booking_date

// checking the date
const next_Date = new Date(booking_date)
next_Date.setDate(next_Date.getDate()+1)
// codition to check if date in slots and the input are 

   // we check if the slot is greater than the date filled on the for
    // also checks if the quantity we have is thesame to what is demmanded

const slots = await Slot.find({
  slot_Date:{
    $gte :new Date(booking_date),
    $lt : new Date(next_Date)
 },
  quantity:{$gt:0}
})
if (slots.length > 0){
  let slot = slots[0]
  console.log("booking date availabe")
}else{
  console.log("booking is not available")
}
}
    



exports.edit = async (req, res) => {
 
  res.render("bookings/edit")
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
