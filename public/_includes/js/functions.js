var socket = io();
var clockCache = "";
var ddCache = "";
var dowCache = "";


function checkGridSupport() {
	var result;

	if($(window).width() > 768) {
			try {
				result = CSS.supports("display", "grid");
			}
			catch(err) {
				$('#board').html('<p style="font-size:1.7rem;font-weight:bold;" class="text-center">You are using a <u>severely outdated</u> browser. <br/>Please upgrade to a modern browser, like Firefox or Chrome.</p>');
			}

		if(result == false) {
			$('#board').html('<p style="font-size:1.7rem;font-weight:bold;opacity:0.8;" class="text-center">Your current browser does not support CSS grids. Please upgrade to a modern browser (i.e. Chrome/Firefox).</p>');
		} else {
			console.log('checkGridSupport => Thank you for using a real browser!');
		}
	} else {
		console.log('checkGridSupport => Mobile resolution detected.');
	}


}

function openTab(target) {

	return false;

	if(target) {
		let board = $('#board');
		board.find('tabs').removeClass('active');

		if($('#'+target).length > 0) {
			$('#'+target).addClass('active');
		} else {
			$('#missions').addClass('active');
		}

	}



}

function showSpinner() {

	$('body').prepend('<div class="transitionOverlay"><i class="fas fa-sync fa-spin"></i></div>');

	setTimeout(function(){
		let overlay = $('body').find('.transitionOverlay');
		overlay.empty().remove();
	},750)

}

/* PARSE THE JSON/ARRAY CONTAINING ALL MISSIONS, BY DATE AND TIME! */
function parseMissions(missions) {

	let d = new Date();
	let currentdate = (d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear());
	let board = $('#board').find('#missions');

	if(missions.length > 0) {

		board.empty().html('<h2 class="center-center terminaltext">Processing..</h2>');

    console.log('<> Operations detected. Initialising phase one.');

		$(missions).each(function(entry) {





		});

		/* FOR EACH MISSION... */

	} else {
    noMissionMessage();
  }

}

/* Print a NO ACTIVE MISSIONS message. This is a function for re-using. */
function noMissionMessage() {

	$('#board').find('#missions').html('<h2 class="center-center"><i class="fas fa-check"></i> No active or planned missions. Please stand by.</h2>');
	return false;

}


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
  /*var mm = currentTime.getMonth()+1;*/

  if(dd < 10){
    dd='0'+dd;
  }

  if (dd == 20) {
    dd    = '20';
    dow   = 'FRI';
  } else if (dd == 21) {
    dd    = '21';
    dow   = 'SAT';
  } else if (dd == 22) {
    dd    = '22';
    dow   = 'SUN';
  } else {
    dd    = '20';
    dow   = 'FRI';
  }
	/* put the target HTML elements into a var we can keep reusing; that way the function will only need to look up each element ONCE. */
	if(clockCache == ""){ clockCache = $("#clock"); }
	if(ddCache == ""){ ddCache = $("#dd"); }
	if(dowCache == ""){ dowCache = $("#dow"); }

	/* apply clock to cached element. */
	clockCache.html(currentTimeString);
	ddCache.html(dd);
	dowCache.html(dow);
}

$(document).ready(function() {
  updateClock();
	checkGridSupport()

  setInterval('updateClock()', 1000);
});
