const mongoose = require("mongoose");
require("./mongooseConnection");

const schema = new mongoose.Schema({
  email: {
    type: String,
  },
services: {
  type:String,
},
  booking_date:{
type:Date
  },
  
  slot: {
      type: mongoose.Types.ObjectId, ref: "Slot" 
  },
  user: {
    type: mongoose.Types.ObjectId, ref:"User"
  }
});

module.exports = mongoose.model("Booking", schema);
