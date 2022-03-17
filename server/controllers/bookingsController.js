require("../models/mongooseConnection");
const Booking = require("../models/Booking");
const User = require("../models/User")
const Slot = require("../models/Slot");
const FailedBooking = require("../models/FailedBooking");
const bcrypt = require("bcrypt")
const Util = require("./common")


// booking routes
exports.index = async (req, res) => {
  const bookings = await Booking.find({}).populate('slot').populate( "user");
  res.render("bookings/index", {title:"bookings", bookings,  activeNav:"booking" });
 
};

exports.add = async (req, res) => {
  const slot = await Slot.find({});
  res.render("bookings/add", {title:"", slot });
};


exports.save = async (req, res) => {

  let phone_number = req.body.phone_number
  const user = await Util.getuser(phone_number)
  // checking for bookingdate
  const booking_date = req.body.booking_date;
  // checking the date
  const next_Date = new Date(booking_date);
  next_Date.setDate(next_Date.getDate() + 1);
  
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
  //  console.log(slot)
  if (slot) {
    const booking = new Booking({
      user:user._id,
      email:req.body.email,
      services:req.body.services,
      
      slot:slot._id
    })
  
   await booking.save()
  
  
   slot.quantity -=1
   await slot.save()

   // condition to check if user name doesnt exist then displa
   if (!user.name) {
     res.render("bookings/user",{title:"user",user})
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
    console.log("booking")
    await failedBooking.save()
    res.render("/",{message: "slot not availale"})
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

exports.updateUser = async(req,res)=>{
  let phone_number = req.body.phone_number;
  let hashedPassword = await bcrypt.hash(req.body.password, 10)
  const user =await User.findOne({phone_number:phone_number})
  user.name = req.body.name;
  user.password = hashedPassword
  await user.save()
  res.redirect(302,"/bookings")
};