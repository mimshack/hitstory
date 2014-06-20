$(document).ready(function() {
	$(".slidingSpaces").ferroSlider({
		easing : 'snap',
		container : "#container3",
		createMap : true,
		createSensibleAreas : true,
		mapPosition : 'bottom_center'
	});

	if ($.fn.ferroSlider.getActualSlideId() == "#div2") {
		$.fn.ferroSlider.disableSwipe(true);
	} else {
		$.fn.ferroSlider.disableSwipe(false);
	}

	$(document).bind("startslide", function() {
		startConsole($.event.moveFrom);
	});

	$(document).bind("endslide", function() {
		endConsole($.event.moveTo);
	});
});

function startConsole(moveFrom) {
	$("#console_content").prepend("[ " + getNow() + " ] Slide started from element with id '" + moveFrom.id + "' (row: " + moveFrom.row + ", column: " + moveFrom.column + ", offsetX: " + moveFrom.offsetX + ", offsetY: " + moveFrom.offsetY + ")<br/>");
}

function endConsole(moveTo) {
	if ($.fn.ferroSlider.getActualSlideId() == "#div2") {
		$.fn.ferroSlider.disableSwipe(true);
	} else {
		$.fn.ferroSlider.disableSwipe(false);
	}
	$("#console_content").prepend("[ " + getNow() + " ] Slide ended to element with id '" + moveTo.id + "' (row: " + moveTo.row + ", column: " + moveTo.column + ", offsetX: " + moveTo.offsetX + ", offsetY: " + moveTo.offsetY + ")<br/>");
}

function getNow() {
	var data = new Date();

	var hr = data.getHours().toString();
	var min = data.getMinutes().toString();
	var ss = data.getSeconds().toString();
	var ms = data.getMilliseconds().toString();

	if (hr.length < 2) {
		hr = "0" + hr;
	}
	if (min.length < 2) {
		min = "0" + min;
	}
	if (ss.length < 2) {
		ss = "0" + ss;
	}
	if (ms.length < 2) {
		ms = "0" + ms;
	}

	return hr + ":" + min + ":" + ss + ":" + ms;
}