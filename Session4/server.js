const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("du hast es geschaft dich zu lbamieren")
});

app.listen(3000, function(){
    console.log("lssd")
});