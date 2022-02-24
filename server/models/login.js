const mongoose = require("mongoose");
require("./mongooseConnection");

const schema = new mongoose.Schema({
  username: {
    type: String,
  },
 
  password: {
    type: String,
  },

  active :{
    type:Boolean,
    default:true,
  },

  role:{
    type:String,
    default:'user'
  }

});

module.exports = mongoose.model("login", schema);
