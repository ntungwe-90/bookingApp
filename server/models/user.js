const mongoose = require("mongoose");
require("./mongooseConnection");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
phone_number: {
  type:String,
},
 
 password:{
     type:String
 } 
 
});

module.exports = mongoose.model("User", schema);
