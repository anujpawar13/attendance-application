var async = require("async");
const attendance = require("../models/attendance");

function findbyId(filter,cb){
    attendance.find(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

function find(filter,cb){
    attendance.find(filter).sort({attendance_date: -1}).exec(function(err, docs) {
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

function save(data,cb){
    let new_attendance=new attendance(data);
    new_attendance.save(data,function(err){
        if(err){
            cb(err)
        }
        else{
          cb(null)
        }
     });
}

function deleteOne(filter, cb){
    attendance.deleteOne(filter, function (err) {
        if(err){
            cb(err)
        }
        else{
          cb(null)
        }
    });
}

function Updateone(filter, newVal, cb){
attendance.findByIdAndUpdate(filter, {$set: newVal}, function(err){
    if(err){
        cb(err)
    }
    else{
      cb(null)
    }
});
}

module.exports={
    findbyId:findbyId,
    save:save,
    deleteOne:deleteOne,
    updateOne:Updateone,
    find:find
}