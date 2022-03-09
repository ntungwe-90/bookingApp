/** 
 * @param {*} req
 * @param {*} res
 * @param {Array} roles
 * @returns
 */

const User = require("../models/User")

exports.checkAuthorization = (req, res, roles)=>{
    if(!roles.includes(req.user.role)){
      return res.redirect("user/unauthorise")
    }
  
  }
 exports .getuser = async(phone_number)=>{
   let user = await User.findOne({phone_number:phone_number})
   if(!user){
     user= new User({
       phone_number:phone_number
     })
     await user.save()
   }return user;
 }
  