exports.login = async (req, res) => {
  const message = req.flash().message
  // res.locals.csrfToken = req.csrfToken()
  res.render("user/login", {title:"users",  message});
};

exports.authlogin = async (req, res) => {
  res.redirect('/')
};

exports.profile = async (req, res) => {
res.render("user/profile", {title:"profile"})
}

exports.logOut = async(req,res) => {
  req.logOut()
  res.render("user/logOut",{title:"logout"})
}