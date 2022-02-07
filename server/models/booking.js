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
  
  slot: {
    type: { type: mongoose.Types.ObjectId, ref: "Slot" },
  },
});

module.exports = mongoose.model("Booking", schema);
