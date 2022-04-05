require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ntungwe:pose201@cluster0.k48si.mongodb.net/bookingapp?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect(process.env.MONGODB_URI_LOCAL, {})
 

const db = mongoose.connection;
db.once("open", () => {
  console.log("server connected") 
})