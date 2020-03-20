var express = require("express");
var HTTP_PORT = 8000;
var app = express();
const fetch = require("node-fetch");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net";
var collection1,collection2,ur;


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");

});
app.post("/intugine/:collection",(req,res)=>{
  collection1 = req.params.collection;
  ur= req.body.url;
  collection2 = req.query.collection2;
  let da = []
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("__CONCOX__");
    let data = {}
    var myPromise = () => (
      
    dbo.collection(collection1).find().limit(30).sort({ createdAt: -1 }).toArray(function (err, result) {
      new Promise((resolve, reject) => {
      
      result.forEach(r => {
dbo.collection(collection2).find({ 'device': r.id }).limit(50).toArray((error, devices) => {
 
  err
  ? reject(err)
  : resolve(data[r.id] = devices,
    da.push(data),
    console.log(da[0])
    );

  
    })
    
    
    
}
);

})
}
));

var callMyPromise = async () => {
          
  var re = await (myPromise());
  //anything here is executed after result is resolved
  console.log(da[0]); 
  return re;
};
callMyPromise().then(function(re) {
  
    client.close();
    res.json({'name':'nikhil purswani','email':'201752025@iiitvadodara.ac.in'},da[0]);
  console.log(da[0]);
  }); 
})
})



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
