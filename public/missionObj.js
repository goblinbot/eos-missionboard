/*< =========================================== >
  |
  >
  |
  <
  |
  >
  |
  < =========================================== >*/

function mission(id, priority, type, goal, title, authorisedBool, authorisedBy, debriefAgent, agentsJoined, agentsRequested, date, xo, reminderBool, reminderReason, additional ) {
  this.title = id;
  this.priority = priority; /* 0-5? */
  this.type = type; /* type = bijv. combat, research, diplo. Kleuren/class baseren op deze types. */
  this.goal = goal; /* max 20 woorden. */
  this.title = title;
  this.authorisedBool = authorisedBool; /* Y/N */
  this.authorisedBy = authorisedBy;
  this.debriefAgent = debriefAgent; /* de arme persoon die het moet debriefen. */
  this.agentsJoined = agentsJoined;
  this.agentsRequested = agentsRequested;
  this.date = date;
  this.xo = xo;
  this.reminderBool = reminderBool; /* Reminder? */
  this.reminderReason = reminderReason; /* en waarom dan? */
  this.additional = additional; /* opmerkingen veld */
}

/* Systeem */
var testdefault = new mission();
testdefault['xo'] = 'meme';
