const router =  require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const controller = require("../controllers/loginController");
const User = require("../models/login")


router.use(passport.initialize());
router.use(passport.session());

// user verification
passport.use(
new LocalStrategy( async function verify(username, password, cb) {
    const user = await User.findOne({name: username})
    if(user){
        if (user.password === password){
            return cb(null, user)  
        }
    }
   
    return cb(null, false)
    // {
    //     id :1,
    //     name :'pam',
    //     role :'admin',
    //     phone_number : '096432198',
    //     email : 'pam@gmail.com',
    //     password:'123',
    //     address :'accra',
    //     createdAt: new Date().toDateString()
    // };

    // if(user.name === username && user.password === password ) {
        // success v
        // return cb(null, user)
  
    //failed v
//    return cb (null, false); 
})
);



passport.serializeUser(function (user, cb) {
    return cb(null, user.id);
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});



router.get('/login', controller.login)

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/login'}), 
 controller.authlogin)

router.get('/profile', controller.profile)



module.exports = router