
const passport = require("passport");
const LocalStrategy = require("passport-local");
const controller = require("../controllers/loginController");
const User = require("../models/User")
const bcrypt = require("bcrypt")
const appUser = require('../controllers/userController');
const router = require("express").Router();



//  router.use(userNav)

// user verification
passport.use(
  new LocalStrategy({ passReqToCallback:true},
    async function verify(req, username, password, cb) { 
    const user = await User.findOne({ name: username });
// console.log(user)
//  const  user ={
//    username:"icy",
//    password:"123"
//  }
    if (user){
      // return cb(null, user);
    if (user.active) {
    //   //CHECKING FOR LOGIN INFORMATION
    const passwordVerify = await bcrypt.compare(password ,user.password)
          if (passwordVerify  ) {
            // if(password == user.password){
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


// hashed password method




passport.serializeUser(function (user, cb) {
  return cb(null, user);
});

passport.deserializeUser(function (user, cb, ) {
  return cb(null, user);
});

router.use(passport.initialize());
router.use(passport.session());

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
      await user.save();
    }
  }
 
  // console.log(req.session.maxfailedAttempts)

}
//whitelist our homepage



const ensureAuthenticated = (req, res, next) => {
  res.locals.isloggedIn = false;
  res.locals.whiteListed = false;
  if (req.path === "/") {
    res.locals.whiteListed = true;
    if (req.isAuthenticated()) {
     
      res.locals.isloggedIn = true
    }
  } else {
    if (req.isAuthenticated()) {
     
      res.locals.isloggedIn = true
    } else {
    return  res.redirect("/user/login");
    }
  }

// console.log(req.user.role)
next();
 
};


//middleware function for user navigation
const userNav = (req, res, next) =>{
  let nav=[{href:'/',name :"home",active:"home"},{href:'/bookings/add',name:"Book Us"}]
  if(req.user) {
    if(req.user.role === "user"){
      let userNav = {href:'/bookings', name:"Booking",active:"booking"};
      nav.push(userNav)
    }else{
      let adminNav =[{href:'/bookings', name:"Booking",active:"booking"},{href:'/slots',name:"slot",active:"slot"},{href:'/user', name:"users",active:"user"}]
      nav = nav.concat(adminNav);
    }
  }
  if(req.isAuthenticated()){
    nav.push( {href:'/user/profile', name:"profile" , active:"profile"},{href:"/logout", name:"logout" },
    );
  }else{
    
    nav.push({href:"/user/login", name:"login"},
   
    );
  }
  res.locals.navigations = nav
  next()
}



router.get("/user/login", controller.login);


router.post(
  "/user/login",
  passport.authenticate("local", {
      failureFlash: true,
      successRedirect: "/",
      failureRedirect: "/user/login"

  })
);

//profile bypass login
// user has to be loggedin to be able to view anypage in the system
// router.use(authLoggedIn);

// forgot password routes whitelisted
router.get("/user/forgot_password", appUser.forgot_password)
router.post("/user/forgot_password", appUser.forgot_password_confirm)

 router.use(ensureAuthenticated);
router.use(userNav)

router.get('/user/unauthorise', appUser.unauthorise)
router.get("/user/profile", controller.profile);
router.get("/logOut", controller.logOut);
router.get("/user", appUser.index)
router.get("/user/add", appUser.add)
router.post("/user/add", appUser.save)
router.get('/user/edit/:id', appUser.edit)
router.post('/user/edit/:id', appUser.update)
router.get('/user/delete/:id', appUser.delete)
router.post('/user/delete/:id', appUser.cofirmdelete)
router.get("/user/change-password", appUser.changePassword)
router.post("/user/change-password", appUser.confirmPassword)
router.get("/user/force-change/:id", appUser.force_change)
router.post("/user/force-change/:id", appUser.confirmforce_change)



module.exports = router;




