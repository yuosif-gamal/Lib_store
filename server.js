// server

var express = require('express');
var cors = require('cors');
var app = express();
var parser = require('body-parser');
var storeRoute = require("./router/storeRoute");
var bookRoute = require("./router/bookRoute");
var userRoute = require("./router/userRoute");
var authorRoute = require("./router/authorRoute");

app.use(cors())

app.use(parser.urlencoded({extended : false}));
app.use(parser.json());

app.get('/', function (req, res) {
  res.send('Server Start......');
})

app.use("/api/v1" ,storeRoute)
app.use("/api/v1" ,bookRoute)
app.use("/api/v1" ,userRoute)
app.use("/api/v1" ,authorRoute)


app.listen(3000,()=>{
    console.log('server start......');
});