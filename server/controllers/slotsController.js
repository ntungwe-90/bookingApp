
const Slot = require('../models/Slot')

exports.index = async(req, res) => {
    const slots = await Slot.find({})
    // console.log(slots)
     res.render('slots/index', {slots})
   
};

exports.add = async(req, res) =>{
    await res.render('slots/add')
};

exports.save = async(req, res) =>{
    console.log(req.body)
    const slot = new Slot({
        slot_date: new Date(req.body.slot_date),
        quantity:req.body.quantity

    })

    await slot.save()
    res.render('slots/add')
}

exports.edit = async(req, res) => {
  await  res.render("slots/edit")
};


exports.delete = async (req, res) =>{
 await   res.render("slots/delete")
}