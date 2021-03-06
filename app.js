const express = require("express");
require("dotenv").config();
const path = require("path");
// const cookieParser = require("cookie-parser")
// const csrf = require('csurf')
const expressLayouts = require("express-ejs-layouts");
const flash = require('connect-flash');
const session = require("express-session");
//  const cookieParser = require('cookie-parser')

const app = express();

// to parse json data from request object
app.use(express.json())

// using our express session and cookie on our slots
 
app.use(express.static("public"));
app.use(expressLayouts);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//  app.use(cookieParser())

// const csrfProtection = csrf({cookie:true})
// app.use(csrfProtection)
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge:30 * 60* 1000, secure: false },
  })
);

// cookie parser
// app.use(cookieParser())
// cookie-session
// app.use(cookieSession({
//     name : 'session',
//     keys : process.env.KEYS,
// }))
const loginRoute = require("./server/routes/loginRoutes");
app.use("/", loginRoute);

const route = require("./server/routes/pagesRoute");
app.use("/", route);

const bookingRoute = require("./server/routes/bookingRoutes");
app.use("/bookings", bookingRoute);

const slotRoute = require("./server/routes/slotRoutes");
app.use("/slots", slotRoute);

// const failedBooking = require("./server/routes/failedBookingRoutes");
// app.use("/failedBookings", failedBooking);

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`server running`));
