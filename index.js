/* dependancies verklaren en ophalen */
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const $       = require('jquery');
const bodyParser = require('body-parser');
const fs = require('fs');

const urlencodedParser = bodyParser.urlencoded({ extended: false});

/* INITIALISEN VAN APP */
const port = process.env.PORT || 5002;

var missions = [];
var missionCounter = 0;

app.use(express.static('public'));
app.use(express.static('_includes'));
app.use('_includes', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


  app.post('/index', urlencodedParser, function(req, res){

    /* data is already JSON! */
    let data = req.body;

    /* HANDLE RES DATA HERE */
    let d = new Date();
    data['date'] = ( d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear() );
    data['id'] = missionCounter;

    missions[missionCounter] = data;
    missionCounter++;

    console.log(missions);

    socket.emit('updateMissionBoard', missions);

    res.sendFile('index.html', {"root": __dirname+'/public/admin/'});

  });



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
