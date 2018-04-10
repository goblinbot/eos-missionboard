function navigateADM(target) {

  $('#admin-panel').empty().load('/admin/' + target + '.html');

  setTimeout(function(){
    if(target == 'adminpanel') {
      socket.emit('requestMissions');
    }
  },500);

}

function parseMissionsADM(missions) {

  console.log(missions);

	let d = new Date();
	let currentdate = (d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear());
	let prevdate = ((d.getDay()-1) + "-" + d.getMonth() + "-" + d.getFullYear());
	let board = $('#missions');

	if(missions.length > 0) {

		board.empty();

    $(missions).each(function(counter) {

      var entry = missions[counter];

      /* check for status */
      if(entry.status != 'done') {

        let printresult = "<form >"
        + "<div class=\"entry\">"

          + "<div class=\"rows "+entry.colour+"\"><i class=\"fas fa-cog\"></i></div>"

          + "<div class=\"rows title\">"
            +"<div class=\"col\"><label>Title:</label><input type=\"text\" name=\"updateMission["+entry.id+"][title]\" value=\"" + entry.title + "\"/></div>"
            +"<div class=\"col\"><label>Goal:</label><input type=\"text\" name=\"updateMission["+entry.id+"][goal]\" value=\"" + entry.goal + "\"/></div>"
            +"<div class=\"col\"><label>XO:</label><input type=\"text\" name=\"updateMission["+entry.id+"][XO]\" value=\"" + entry.XO + "\"/></div>"
          +"</div>"

          + "<div class=\"rows title\">"
            +"<div class=\"col\"><label>Departs:</label><input type=\"time\" name=\"updateMission["+entry.id+"][startTime]\" value=\"" + entry.startTime + "\"/></div>"
            +"<div class=\"col\"><label>Est. return:</label><input type=\"time\" name=\"updateMission["+entry.id+"][endTime]\" value=\"" + entry.endTime + "\"/></div>"
          +"</div>"

          + "<div class=\"rows\"><div class=\"col\"><input class=\"button blue\" type=\"submit\" value=\"Edit\" /></div></div>";

        printresult += "</div></form>";

        board.append(printresult);

      }


    });

	} else {

    noMissionMessage();

  }

}


// Internet's meest generieke, gecopypaste en gestolen functie allertijden :
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
    }
  return "";
}


function logout() {
  setCookie('auth','false','-1');
  location.href = "/admin/index.html";
}
