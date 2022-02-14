require("../models/mongooseConnection");
const Login = require("../models/login");

exports.login = async (req, res) => {
  res.render("login/login");
};

exports.authlogin = async (req, res) => {};
