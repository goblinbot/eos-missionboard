function navigateADM(target) {

  $('#admin-panel').empty().load('/admin/' + target + '.html');

}

function parseMissionsADM(missions) {

	let d = new Date();
	let currentdate = (d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear());
	let prevdate = ((d.getDay()-1) + "-" + d.getMonth() + "-" + d.getFullYear());
	let board = $('#missions');

	if(missions.length > 0) {

		board.empty();

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
