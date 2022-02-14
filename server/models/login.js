const mongoose = require("mongoose");
require("./mongooseConnection");

const schema = new mongoose.Schema({
  username: {
    type: String,
  },
 
  password: {
    type: String,
  },

  

});

module.exports = mongoose.model("login", schema);
