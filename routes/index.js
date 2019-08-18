var express = require("express");
var router = express.Router();

router.get("/", function(req,res,next){
    //res.send("INDEX page");
    res.render("index", {title: "EXPRESS MONGO"})
});
var button = document.createElement("button");
button.innerHTML = "Student Details";
button.addEventListener ("click", function() {
    location.href="client\show.html";
  });
module.exports = router;