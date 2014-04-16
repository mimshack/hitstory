$(document).ready(function() {
		chrome.runtime.sendMessage({msg: "capture"}, function(response) {
	  	// alert(response.imgSrc);
	  	// window.open(response.imgSrc);
	  	console.log(response.imgSrc);
	});
});

