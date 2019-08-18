var express = require("express");
var mongojs = require('mongojs'); // import mongodb
var config = require('../config'); //import config file
var db = mongojs(config.database, ['students']);

var router = express.Router();

router.get("/students", function(req,res,next){
    //res.send("STUDENTS API");
    db.students.find((err, data)=>{
        if(err)
            res.send(err);
        
        res.json(data);
    })
});

//get single student
router.get("/students/:id", (req,res,next)=>{
    db.students.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, data){
     if(err){
        res.send(err);   
     }
     res.json(data);   
    });
});

// create student
router.post("/students", function(req,res,next){
    var student =req.body;
    if(!student.StartDate){
        student.StartDate= new Date();
    }
    if(!student.FirstName || !student.LastName || !student.School){
        res.status(400);
        res.json(
            {"error":"Bad data, could not be inserted"}
        )
    } else {
        db.students.save(student, function(err,data){
            if(err) {
                res.send(err);
            }
            res.json(data);
        })
    }
});

//delete student
router.delete("/student/:id", function(req,res, next){
    db.students.remove({_id: mongojs.ObjectId(req.params.id)},function(err, data){
        if(err){
            res.send(err);   
         }
         res.json(data); 
    });
});

router.put("/student/:id", function(req,res, next){
    var student= req.body;
    var changedStudent = {};

    if(student.FirstName){
        changedStudent.FirstName = student.FirstName;
    }

    if(student.LastName){
        changedStudent.LastName = student.LastName;
    }

    if(student.School){
        changedStudent.School = student.School;
    }

    if(student.StartDate){
        changedStudent.StartDate = student.StartDate;
    }

    if(!changedStudent){
        res.status(400);
        res.json(
            {"error": "Bad Data"}
        )
    } else {
        db.students.update({_id: mongojs.ObjectId(req.params.id)}, changedStudent,{},function(err,data){
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }
});
module.exports = router;