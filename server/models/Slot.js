const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  slot_date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Slot", schema);
