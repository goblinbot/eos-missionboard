var socket = io();





/*function checkGridSupport() {
	var result;

		try {
			result = CSS.supports("display", "grid");
		}
		catch(err) {
			$('.account').html('<p style="font-size:1.7rem;font-weight:bold;" class="text-center">You are using a <u>severely outdated</u> browser. <br/>Please upgrade to a modern browser, like Firefox or Chrome.</p>');
		}

	if(result == false) {
		$('.account').html('<p style="font-size:1.7rem;font-weight:bold;" class="text-center">Your current browser does not support CSS grids. Please upgrade to a modern browser (i.e. Chrome/Firefox).</p>');
	} else {
		console.log('[[[ Grid support detected : Thank you for using a real browser! ]]]');
	}
}*/



/* CLOCK */
function updateClock() {
	var currentTime = new Date();

  	var currentHours   = currentTime.getHours ( );
  	var currentMinutes = currentTime.getMinutes ( );
  	var currentSeconds = currentTime.getSeconds ( );

	/* Pad the minutes and seconds with leading zeros, if required */
	currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

	/* Compose the string for display */
	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + "&nbsp;ECT";

  var dow;
  var dd = currentTime.getDate();
  var mm = currentTime.getMonth()+1;

  if(dd < 10){
    dd='0'+dd;
  }

  if (dd == 10) {
    dd    = '13';
    dow   = 'FRI';
  } else if (dd == 11) {
    dd    = '14';
    dow   = 'SAT';
  } else if (dd == 12) {
    dd    = '15';
    dow   = 'SUN';
  } else {
    dd    = '13';
    dow   = 'FRI';
  }
  $("#dd").html(dd);
  $("#dow").html(dow);

 	$("#clock").html(currentTimeString);
}
$(document).ready(function() {
  updateClock();
  setInterval('updateClock()', 1000);
});
