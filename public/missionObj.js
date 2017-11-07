/*< =========================================== >
  | Author: Thijs Boerma
  > Mission board : mission object structure.
  |
  <
  |
  >
  |
  < =========================================== >*/

function mission(id, priority, type, goal, title, authorisedBool, authorisedBy, debriefAgent, agentsJoined, agentsRequested, date, xo, reminderBool, reminderReason, additional ) {

  var dt = new Date();
  var currentHours   = dt.getHours ( );
  var currentMinutes = dt.getMinutes ( );
  var currentSeconds = dt.getSeconds ( );
    currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  currentTime = currentHours + ":" + currentMinutes + ":" + currentSeconds;

  this.title = id;
  this.priority = 3; /* 0-5? */
  this.type = 'combat'; /* type = bijv. combat, research, diplo. Kleuren/class baseren op deze types. */
  this.goal = ''; /* max 20 woorden. */
  this.title = 'title';
  this.authorisedBool = 'N'; /* Y/N */
  this.authorisedBy = 'none';
  this.debriefAgent = ''; /* de arme persoon die het moet debriefen. */
  this.agentsJoined = 0;
  this.agentsRequested = 0;
  this.date = '13-03-240NT';
  this.time = currentTime;
  this.xo = 'XO';
  this.reminderBool = 'false'; /* Reminder? */
  this.reminderReason = ''; /* en waarom dan? */
  this.additional = ''; /* opmerkingen veld */
}

/* Test missie: heen en weer converten van. Hoezee. */
var testMISS = new mission();
  testMISS['xo'] = 'Maati';
  testMISS['title'] = "TestMission";
  testMISS['goal'] = "Testing the mission objects";
  testMISS['priority'] = 4;

var testMISSJSON = JSON.stringify(testMISS);
var testMISSPARSE = JSON.parse(testMISSJSON);
