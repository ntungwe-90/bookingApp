require("../models/mongooseConnection");
const User = require("../models/User");
const util = require("./common");
const bcrypt = require("bcrypt")

exports.unauthorise = async (req, res) => {
  res.render("user/unauthorise", { title: "unauthorise user" });
};

exports.profile = async (req, res) => {
  res.render("user/profile", {title:"profile", activeNav:"profile"});
};

exports.changePassword = async (req, res) => {
  res.render("user/change-password", { title: "change password" });
};

exports.force_change = async (req, res) => {
  res.render("user/force_change_password", {title:"force change password"});
}
exports.confirmforce_change= async (req, res) => {
  const user = await User.updateOne({_id:req.params.id},{password:newPassword,force_change_password:false})
  res.redirect("/user", {title:"force change password"});
}

exports.forgot_password = async (req, res) => {
  res.render("user/forgot_password", {title:"forgort password"})
}


 //condition to check if the phone_number
  // inputed is found in our database
  //if not it will throw an error
exports.forgot_password_confirm = async (req,res) =>{
  // const user = await User.find()
  // console.log(user)
  // if(user){
  //  res.render("user/forgot_password_confirm", {title:"forgot confirm password"})
  //  console.log('user verified')
  // }else{
  //   res.local.message ="wrong phone_number"
  //   res.render("user/forgot_password", {title:"forgot password"})
  //   console.log("user not found")
  // }
  res.render("user/forgot_password_confirm", {title:"forgot-password-confirm"})
  
}



// condition to check if the current password matches, if yes
//it changes to new one else it will throw an error
// checkingif old password matches with new password

exports.confirmPassword = async (req, res) => {
    const currentPassword = await bcrypt.compare(req.body.current_password,req.user.password);
    if (currentPassword){
        // const confirmPassword = req.body.new_password === req.body.confirm_password
        // if(confirmPassword){
          if(req.body.new_password === req.body.confirm_password){
            try {
              const newPassword = await bcrypt.hash(req.body.confirm_password, 10);
              const user = await User.findById(req.user._id);
              user.password = newPassword
              await user.save()
              return res.redirect(302, "/user/profile")
            } catch(error){
              console.error(error)
              res.locals.message="please try saving password again"
            }
        } else{
            res.render("user/change-password", {message:"incorrect current message"})
        }
    } else{
        console.log("incorrect password")
    }
  res.render("user/change-password", {message: "incorrect current password", title:"change-password"});
}
// };

exports.index = async (req, res) => {
  //  prevent users from accessing
  //other routes when they type on the taskbar
  const authorizedRoles = ["admin"];
  // util.checkAuthorization(req, res, authorizedRoles)

  const users = await User.find({});
  res.render("user/index", { title: "users", users });
};

exports.add = async (req, res) => {
  res.render("user/add", { title: "user" });
};

exports.save = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password,10)
  const user = new User({
    name: req.body.name,
    phone_number:req.body.phone_number,
    password: hashedPassword,
    role: "admin",
  });
  await user.save();
  res.redirect("/user");
};

exports.edit = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("user/edit", { title: "user", user });
};

exports.update = async (req, res) => {
  const user = await User.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      phone_number:req.body.phone_number,
    }
  );

  res.redirect("/user");
};

exports.cofirmdelete = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.render("/user/delete", { title: "delete", user })
};

exports.delete = async (req, res) => {
  const user = await User.deleteOne(
    { _id: req.params.id })
    res.redirect("/user");
  

  
};
