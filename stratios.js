/*< =========================================== >
  | Author: Thijs Boerma
  > Mission board : backend
  |
  < =========================================== >*/

/* dependancies */
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const $       = require('jquery');
const bodyParser = require('body-parser');
const fs = require('fs');

const urlencodedParser = bodyParser.urlencoded({ extended: false});

/* INITIALISE THE APPLICATION */
const port = process.env.PORT || 5005;

var missions = [];
var missionCounter = 0;

app.use(express.static('public'));
app.use(express.static('_includes'));
app.use('_includes', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // turns FORM SUBMIT data into JSON from the get go.

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


  app.post('/admin/new', urlencodedParser, function(req, res){

    /* data is already JSON! */
    let data = req.body;

    /* HANDLE RES DATA HERE */
    let d = new Date();
    let fulldate = (d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear());

    data['colour'] = parseColour(data['colourcode']);

    /* easter egg when setting one of the dates to 08:08 */
    if(data['startTime'] == '08:08' || data['endTime'] == '08:08') {
      data['colour'] = 'yellow gubat';
    }

    data['date'] = fulldate;
    data['id'] = missionCounter;
    data['status'] = 'prep';


    missions.push(data);
    missionCounter++;

    console.log('mission added.');
    console.log(data);

    io.emit('updateMissionBoard', missions);

    res.sendFile('index.html', {"root": __dirname+'/public/admin/'});

  });

  app.post('/admin/edit', urlencodedParser, function(req, res){
    let postdata = req.body;
    let data = postdata['updateMission'];

    if(data['id']) {
      let i = data['id'];

      if(missions[i]) {

        /* override the old mission fields. Yes, this is not the most secure method. I'm aware. */
        for (var x in data) {
          missions[i][x] = data[x];
        }

        missions[i]['colour'] = parseColour(data['colourcode']);

        if(data['status'] == 'done') {
          missions[i].length = 0;
        }
      }

      console.log(missions);
      io.emit('updateMissionBoard', missions);
    }

    res.sendFile('index.html', {"root": __dirname+'/public/admin/'});

  });

  /* send missions on reconnect */
  socket.on('requestMissions', function() {
    socket.emit('init_frontendBoard', missions);
  });

  socket.on('auth', function(keycode){
    var checklogincode = 0;
    var loginrank = 0;
    console.log('authentication code received: '+keycode);

    for (let i in valid_accounts) {

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
valid_accounts[1] = (new accountObj('34471','1'));


/* parse colourcodes into colours */
function parseColour(input) {

  // 10 GRAY | 20 BLUE | 30 GREEN | 40 YELLOW | 50 ORANGE | 60 RED
  switch(input) {
    case '10':
    default:
      var output = 'gray';
      break;
    case '20':
    var output = 'blue';
      break;
    case '30':
      var output = 'green';
      break;
    case '40':
      var output = 'yellow';
      break;
    case '50':
      var output = 'orange';
      break;
    case '60':
      var output = 'red';
      break;
  }

  return output;
}
