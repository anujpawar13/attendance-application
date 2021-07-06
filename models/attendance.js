var mongoose = require("mongoose");
var AttendanceScehma = new mongoose.Schema({
    username:String,
    attendance_date:{type:Date,default:Date.now()},
    data:[],
    url:String,
    taker:String,
    you:String
});

module.exports = mongoose.model("attendance",AttendanceScehma);