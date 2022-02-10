const mongoose = require("mongoose");
require("./mongooseConnection");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  booking_date:{
type:Date
  },
  services:{
    type:String
  }
 
});

module.exports = mongoose.model("failedBooking", schema);
