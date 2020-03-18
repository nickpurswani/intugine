var express = require("express");
var app = express();
var mongoose = require("mongoose");
// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect('mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net', {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));mongoose.set("useCreateIndex", true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
})
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");


app.listen(3000,function(){
    console.log("server has started at 3000");
})
