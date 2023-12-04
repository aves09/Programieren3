const express = require("express");
const app = express();


app.use(express.static("../"));
app.get("/game", function(req, res){
    res.redirect("../Aubschlussproject.html")
});

app.get("/", function(req, res){
    res.send("<h1>hello my</h1><p>no way</p>")
});
app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello" + name + "</h1>");
});

app.get("/google/:name1", function(req, res){
    let name1 = req.params.name1
   
    res.redirect('https://www.google.com/search?q='+name1)
});

app.get("/*", function(req, res){
    let name1 = req.params.name1
   
    res.send("<h1>File not Found</h1>")
});




app.listen(3000, function(){
    console.log("lssd")
});