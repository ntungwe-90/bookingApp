require("../models/mongooseConnection");
const Login = require("../models/login");

exports.login = async (req, res) => {
  const message = req.flash().message
  // res.locals.csrfToken = req.csrfToken()
  res.render("login/login", {message});
};

exports.authlogin = async (req, res) => {
  res.redirect('/')
};

exports.profile = async (req, res) => {
res.render("login/profile")
}

exports.logOut = async(req,res) => {
  req.logOut()
  res.render("login/logOut")
}