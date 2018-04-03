/* dependancies verklaren en ophalen */
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var $       = require('jquery');
var bodyParser = require('body-parser');
var fs = require('fs');

/* INITIALISEN VAN APP */
var port = process.env.PORT || 5002;

var missions = [];

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

io.on('connection', function (socket) {

  setTimeout(function(){
    /* send FRONTEND data to FRONT */
    socket.emit('init_frontendBoard', missions);

  },1000);






  socket.on('auth', function(keycode){
    var checklogincode = 0;
    var loginrank = 0;
    console.log('authentication code received: '+keycode);

    for (var i in valid_accounts) {

      if(valid_accounts[i].logincode == keycode) {
        checklogincode = 1;
        loginrank = valid_accounts[i].loginrank;
      }
    }

    if(checklogincode == 1) {
      socket.emit('authTrue', keycode, loginrank);
    } else {
      socket.emit('authFalse');
    }
  });

});



/* code for accounts */
function accountObj(logincode,loginrank) {
  this.logincode = logincode;
  this.loginrank = loginrank;
}
var valid_accounts = [];

valid_accounts[0] = (new accountObj('61021','1'));
