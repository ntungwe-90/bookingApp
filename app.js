const express = require("express");
const PORT = process.env.PORT || 6001;
require('dotenv').config()
// const csurf = require('csurf')
const expressLayouts = require("express-ejs-layouts");
// const session = require('express-session')

const app = express();

app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret:process.env.SECRETE,
//     reserve:true,
//     saveUninitialized:true,
//     cookie:{secure:false}
// })
// )



app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const route = require("./server/routes/pagesRoute");
app.use("/", route);

const bookingRoute = require("./server/routes/bookingRoutes");
app.use("/bookings", bookingRoute);

const slotRoute = require("./server/routes/slotRoutes");
app.use("/slots", slotRoute);

app.listen(PORT, () => console.log(`server running`));

//   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
