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

// condition to check if the current password matches, if yes
//it changes to new one else it will throw an error
// checkingif old password matches with new password

exports.confirmPassword = async (req, res) => {
    const currentPassword = await bcrypt.compare(req.body.current_Password, req.user.password);
    if (currentPassword){
        const confirmPassword = req.body.new_password === req.body.confirm_password
        if(confirmPassword){
            let hashedPassword = await bcrypt.hash(req.body.confirm_password, 10)

            const user = await User.updateOne({_id: req.user._id},{
                password:hashedPassword
            })
                
        } else{
            console.log("no match found")
        }
    } else{
        console.log("incorrect password")
    }
  res.render("user/change-password", {title: "change password"});
};

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
  const user = new User({
    name: req.body.name,
    phone_number:req.body.phone_number,
    password: req.body.password,
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
