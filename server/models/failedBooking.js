const mongoose = require("mongoose");
require("./mongooseConnection");

const schema = new mongoose.Schema({
 
  user: {
    type: mongoose.Types.ObjectId, ref:"User"
  },
 
  booking_date:{
type:Date
  },
  services:{
    type:String
  }
 
});

module.exports = mongoose.model("FailedBooking", schema);
