var express = require("express");
var HTTP_PORT = 8000;
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net";
let collection1,collection2,ur;


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.htm");

});
app.post("/intugine/:collection",(req,res)=>{
  collection1 = req.params.collection;
  ur= req.body.url;
  collection2 = req.query.collection2;
  let da = []
  MongoClient.connect(ur, function (err, db) {
    if (err) throw err;
    var dbo = db.db("__CONCOX__");
    let data = {}
      
    dbo.collection(collection1).find().limit(30).sort({ createdAt: -1 }).toArray(function (err, result) {
      
      for(let i=0;i<result.length;i++){    
dbo.collection(collection2).find({ 'device': result[i].id }).limit(50).toArray((error, devices) => {
  if(err){
    console.log("error")
  }
  
    data[result[i].id] = devices,
    
    
    console.log(i)
    if(i==(result.length-1)){
      
      res.json({'name':'nikhil purswani','email':'201752025@iiitvadodara.ac.in',data});
    }
  
  });
}
    
    
    
    
});

})


})
app.post('/map',(req,res)=>{
  
addresses = JSON.parse(req.body.address);

let da=[]

for(let i=0;i<addresses.length;i++){
  let myRequest = new XMLHttpRequest();
    myRequest.open('GET','https://maps.googleapis.com/maps/api/geocode/json?address='+addresses[i]+',+CA&key=AIzaSyA5bwbEsAOUMOI4RK2zXcIayG4vjuQSpcw'); 
    myRequest.onload = function() {
      let streamerInfo = JSON.parse(myRequest.responseText);
      da.push({"lat":streamerInfo.results[0].geometry.location.lat,"long":streamerInfo.results[0].geometry.location.lng});
      if(da.length==(addresses.length)){
        res.json(da)
      }    
    };
    
    myRequest.send();

  }
 
});


app.use(function (req, res, next) {
let err = new Error('Not Found');
err.status = 404;
next(err);
});
// handle errors
app.use(function (err, req, res, next) {
console.log(err);

if (err.status === 404)
    res.status(404).json({ message: "Not found" });
else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(process.env.PORT || HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
