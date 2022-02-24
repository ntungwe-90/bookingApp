const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const controller = require("../controllers/loginController");
const User = require("../models/login");
const flash = require('connect-flash');

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

// user verification
passport.use(
  new LocalStrategy({ passReqToCallback:true},
    async function verify(req, username, password, cb) { 
  //  const user = await User.findOne({ where: { username: username } });
   const user = {
      username: "pam",
      password: "123"
    };
    if (user){
    if (!user.active) {
      //CHECKING FOR LOGIN INFORMATION
      if (user. username === username && password === password  ) {
        return cb(null, user);
       }
    }else{
      return cb(null, false, req.flash('message', "account has been blocked"));
    }
  }
//throw this error if login is wrong
 loginTracker(req, user);
    return cb(null, false, req.flash("message", "Invalid username or password"));
  
  })
);




passport.serializeUser(function (user, cb) {
  return cb(null, user);
});

passport.deserializeUser(function (user, cb, ) {
  return cb(null, user);
});

// const whiteListed ="/"
// set timer for mmultiple failed login
const loginTracker = async (req, user) => {
  const session= req.session;
  if(!session.maxfailedAttempts){
    session.maxfailedAttempts = 3;
  }else{
    session.maxfailedAttempts -= 1;

    const maxfailedAttempts =  session.maxfailedAttempts;
    if(maxfailedAttempts <= 1){
      user.active = false;
      await user
      // .save()
    }
  }
 
  console.log(req.session.maxfailedAttempts)

}
//whitelist our homepage
const authLoggedIn = (req, res, next) => {
  res.locals.loggedIn = false;
  if (req.isAuthenticated()) {
    res.locals.loggedIn = true;
    next();
  } else {
    return res.redirect("/login");
  }
};


const ensureAuthenticated = (req, res, next) => {
  res.locals.isAuthenticated = false;
  res.locals.whiteListed = false;
  if (req.path === "/") {
    res.locals.whiteListed = true;
    if (req.isAuthenticated()) {
       res.locals.isAuthenticated = true;
      res.locals.isloggedIn = true
    }
  } else {
    if (req.isAuthenticated()) {
       res.locals.isAuthenticated = true;
      res.locals.isloggedIn = true
    } else {
    return  res.redirect("/login");
    }
  }
  res.locals.user = req.user || {} ;
// console.log(req.user.role)
next();
 
};

router.get("/login", controller.login);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  controller.authlogin
);


//middleware function for user navigation
const userNavigation = (req, res, next) =>{
  res.locals.user = req.user || {};
  if(req.user) {
    if(req.user.role === "user"){
      let userNav = {href:"/booking", name:"Booking"};
      navigations.push()
    }else{
      let adminNav =[{href:"/booking", name:"Booking"},{href:"/slot"},{href:"/add_user", name:"Users"}]
      navigations = navigations.concat(adminNav);
    }
  }
  if(req.isAuthenticated()){
    navigations.push({href:"/logout", name:"logout"});
  }else{
    navigations.push({href:"/login", name:"login"});
  }
  res.locals.navigations = navigations
}

//profile bypass login
// user has to be loggedin to be able to view anypage in the system
router.use(authLoggedIn);
router.use(ensureAuthenticated);
router.get("/profile", controller.profile);
router.get("/logOut", controller.logOut);

router.post(
  "/login",
  passport.authenticate("local", {
      failureFlash: true,
      successRedirect: "/",
      failureRedirect: "/login"

  })
);
module.exports = router;




