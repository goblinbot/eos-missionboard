/* dependancies verklaren en ophalen */
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var $       = require('jquery');
var bodyParser = require('body-parser');
var fs = require('fs');

/* INITIALISEN VAN APP */
var port = 5002;

app.use(express.static('public'));
app.use(express.static('_includes'));
app.use('_includes', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

http.listen(port, function(){
  console.log('// MMI PROUDLY PRESENTS => EOSMISSIONBOARD \n WELCOME ::COLONIST::');
});



/* pathing / routing */
app.get('/', function(req, res){
  res.sendFile('index.html', {"root": __dirname+'/public/'});
});

app.get('/admin/', function(req, res){
  res.sendFile('index.html', {"root": __dirname+'/public/admin/'});
});

app.get('*', function(req, res){
  res.sendFile('404.html', {"root": __dirname+'/public/'});
});
