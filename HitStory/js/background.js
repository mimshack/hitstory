var tabIsOpened= false;
var tabIsClosed=false;

// capture page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) {
		sendResponse({
			imgSrc : dataUrl,
			tabInfoOpen : tabIsOpened,
			tabInfoClose : tabIsClosed
		});
	});
	//remember that captureVisibleTab() is a statement
	return true;
});

/************ DON'T CHANGE THE FUNCTION OREDER ************/

// // tabs change to another
// chrome.tabs.onActiveChanged.addListener(function(){
	// console.log("**** tab wad unselected ****");
// 
	// tabIsOpened = false;
	// var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'tab is changed' );
	    // //notification.show();
// });
// 
// // tabs replaced -- refreshed
// chrome.tabs.onReplaced.addListener(function(){
	// console.log("**** tab was replaced ****");
// 
	// tabIsOpened = false;
	// var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'tab is replaced' );
	    // //notification.show();
// });

// on tab created
chrome.tabs.onCreated.addListener(function(){
	console.log("**** new tab has been created ****");
	tabIsOpened = true;
	var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'new tab created' );
	    //notification.show();
});

// on tab onRemoved
chrome.tabs.onRemoved.addListener(function(){
	console.log("**** tab was removed ****");
	tabIsClosed= true;
	var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'tab was removed' );
	    //notification.show();
});
