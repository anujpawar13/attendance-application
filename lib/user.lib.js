var async = require("async");
const user = require("../models/user");

function findbyId(filter,cb){
    user.find(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

module.exports={
    findbyId:findbyId,
}