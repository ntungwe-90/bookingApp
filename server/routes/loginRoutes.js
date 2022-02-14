const router =  require("express").Router();
const passport = require("passport");
const localStrategy = require("passport-local");
const controller = require("../controllers/loginController")


passport.use(
new localStrategy(function verify(username, password,cb) {
    const user = {};
    return cb(null, user)
})
);

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
    return cb(null, user.id);
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});

router.get('/login', controller.login)
router.post('/login', controller.authlogin)


module.exports = router