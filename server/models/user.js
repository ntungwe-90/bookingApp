const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone_number: {
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
    default:"user"
  },
  force_change_password:{
    type:Boolean,
    default:false
  }

 
});

module.exports = mongoose.model('User', schema);
