const express = require("express");
require('dotenv').config()


// const csrf = require('csurf')
const expressLayouts = require("express-ejs-layouts");

 const session = require('express-session')
//  const cookieParser = require('cookie-parser')

const app = express();

// using our express session and cookie on our slots
app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
 
// app.use(cookieParser())

// const csrfProtection = csrf({cookie:true})
// app.use(csrfProtection)
app.use(session({
    secret: process.env.SECRET,
    reserve: true,
    saveUninitialized: true,
    cookie:{secure: false}
})
)

// cookie parser
// app.use(cookieParser())
// cookie-session
// app.use(cookieSession({
//     name : 'session',
//     keys : process.env.KEYS,
// }))

const route = require("./server/routes/pagesRoute");
app.use("/", route);

const bookingRoute = require("./server/routes/bookingRoutes");
app.use("/bookings", bookingRoute);

const slotRoute = require("./server/routes/slotRoutes");
app.use("/slots", slotRoute);


const loginRoute = require("./server/routes/loginRoutes");
const { cookie } = require("express/lib/response");
app.use("/", loginRoute)

// const failedBooking = require("./server/routes/failedBookingRoutes");
// app.use("/failedBookings", failedBooking);


const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`server running`));

