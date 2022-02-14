const passport = require("passport")
const router = require = require("express").Router();
const localStrategy = require("passport-local")


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