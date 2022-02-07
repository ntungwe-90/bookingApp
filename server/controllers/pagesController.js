require('../models/mongooseConnection')


exports.home = async(req, res) =>{
    res.render("pages/home", {title:"home"})
}


// exports.booking = async(req, res) =>{
//     res.render("pages/booking", {title:"booking"})
// }

// exports.slot = async(req, res) =>{
//     res.render("pages/slot",{title:"slot"})
// }