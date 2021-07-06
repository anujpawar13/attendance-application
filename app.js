var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    Attendance              = require("./models/attendance"),
    LocalStrategy           = require("passport-local"),
    attendanceLib           = require("./lib/attendance.lib.js"),
    userLib                 = require('./lib/user.lib.js'),  
    DateLib               = require('./lib/date.js'),  
    async                   = require("async"),
    passportLocalMongoose   = require("passport-local-mongoose");

var _= require("lodash");
const moment = require("moment");
const attendance = require("./models/attendance");
  
const PORT=process.env.PORT||2000;
const MONGO_URL=process.env.MONGODB_URI||"mongodb://localhost/attendance";
var app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({extended:true}));
app.use("/public", express.static("public"));
app.use(require("express-session")({
    secret:"sam and negi",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("login");
});

app.get("/home",isLoggedIn, function(req, res){
  
let filter={};
filter={
    'username':req.user.username,
}
   attendanceLib.find(filter,function(err,docs){
      if(err){
          return res.send(err)
      }else if(_.isEmpty(docs)){

        return res.render("home",{"attendanceData":"",username:req.user.username, moment:moment});
      }

      else{
      //    console.log(moment(docs[0].attendance_date).format("DD/MM/YYYY"));
        return res.render("home",{attendanceData:docs,username:req.user.username, moment:moment});
        // return res.json(docs)
      }
   });


   

});



app.get("/home/:id/details",isLoggedIn, function(req, res){
    const filter ={
        _id: req.params.id
    }
    attendanceLib.findbyId(filter, function(err, attendance){
        if(err){
            console.log(err);
            return res.json(err);
        }else{
           //  console.log(moment(attendance[0].attendance_date).format("DD/MM/YYYY"));
          return  res.render("meetDetails", {attendanceDataID: attendance[0], moment:moment});
        }
    })
    
});

app.post("/home/:id/addParticipant",isLoggedIn, function(req, res){
if(1){
    const filter ={
    _id: req.params.id
}
let new_data = [];
async.series([
    (callback)=> {
attendanceLib.findbyId(filter, function(err, attendance){
    if(err){
        console.log(err);
        return callback(err);
    }else{
        new_data = attendance[0].data;       
        return callback(null);
    }
});
},
(callback)=> {
    new_data.push(req.body.name);
const newVal={
   data: new_data
}
attendanceLib.updateOne(filter,  newVal, function(err){
    if(err){
        callback(err);
    }else{
        return callback(null);
    }
});

}
],
(err)=> {
    if(err){
        return console.log(err)//
    }
    else{
      return  res.redirect("/home/"+req.params.id+"/details");//change this to normal
    }
});
}
else{
    res.send("empty body");
}
});


app.post("/home/:id/details/delete/:idx",isLoggedIn, function(req, res){
    const filter ={
        _id: req.params.id
    }
    var new_data = [];
    async.series([
        (callback)=> {
    attendanceLib.findbyId(filter, function(err, attendance){
        if(err){
            return callback(err);
           // return res.json(err);
        }else{
         //  console.log(attendance);
            new_data = attendance[0].data;
            return callback(null);
        }
    });
},
(callback)=> {
    
    const index = req.params.idx;
    new_data.splice(index,1);
    
    const newVal={
       data: new_data
    }
    
    attendanceLib.updateOne(filter,  newVal, function(err){
        if(err){
            return callback(err);
        }else{
             return callback(null);
        }
    });
}
],
(err)=> {
    if(err){
        return console.log(err)//
    }
    else{
      return res.redirect("/home/"+req.params.id+"/details");
    }
});
});

app.post("/home/:id/delete", isLoggedIn,function(req, res){
    const filter ={
        _id: req.params.id
    }
    attendanceLib.deleteOne(filter, function (err) {
        if(err){
            return res.json(err);
        }else{
            return res.redirect("/home");
        }
    });
})

app.post("/home/edit", isLoggedIn,function(req, res){
    const filter ={
        _id:req.body.atten_id
    }
    const newVal={
        attendance_date: DateLib.getDate(req),
        taker:req.body.entered_taker

    }
    attendanceLib.updateOne(filter, newVal, function(err){
        if(err){
            return res.json(err);
        }else{
            return res.redirect("/home");
        }
    });
})


app.post("/home",isLoggedIn, function(req, res){
 //   console.log(req.body);
    
    const Attendance = {
        username:req.body.user_name,
        attendance_date:DateLib.getDate(req),
        data:[],
        url:req.body.meet_url,
        taker:req.body.entered_taker,
       
    };
    attendanceLib.save(Attendance,function(err){
        if(err){
           return res.json(err);
        }else{
           return res.redirect("/home"); 
        }
    });

    
}); 

app.post("/username/:user/password/:pass/save",function(req,res){
  //  console.log(req.body)
    if(1){//
            let result={};
            let filter={
                userFilter:{
                username:req.params.user,
                },
                attendanceFilter:{
        
                },
            };
            async.series([
                (callback)=> {
                    userLib.findbyId(filter.userFilter,function(err,docs){
                        if(err){
                            console.log(err);
                            return callback(err);
                        }
                        else{
                            result.user=docs;
                            return callback(null,result);
                        }
                    });
                },
                (callback)=> {

                    let attendees = req.body.data.split("@");
                    attendees.pop();

                    let new_attendance={
                        username:req.params.user,
                        attendance_date:req.body.date,
                        data:attendees,
                        url:req.body.url,
                        taker:req.body.taker,
                        you: req.body.you,
                        
                    };    
              //     console.log(new_attendance);
                    attendanceLib.save(new_attendance,function(err){
                        if(err){
                            console.log(err);
                            return callback(err);
                        }
                        else{
                            return callback(null);
                        }
                    });
                }
            ],
            (err)=> {
                if(err){
                    return console.log(err)//
                }
                else{
                  return res.redirect("https://dtu-attendance.herokuapp.com/");//change this to normal
                }
            });
    }
    else{
        res.send("empty body");
    }

  
       

});
// Auth Routes


//handling user sign up
app.post("/signup", function(req, res){
User.register(new User({username:req.body.username}),req.body.password, function(err, user){
       if(err){
            console.log(err);
            return res.render('signup');
        } //user stragety
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home"); //once the user sign up
       }); 
    });
});

// Login Routes

app.get("/login", function(req, res){
    res.render("login");
})

app.get("/signup", function(req, res){
    res.render("signup");
})

// middleware
app.post("/login", passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/login"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(PORT, function(){
    console.log("connected to "+PORT);
});


