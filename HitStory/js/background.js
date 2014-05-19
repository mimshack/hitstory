var newTabIsOpened= false;

// capture page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) {
		sendResponse({
			imgSrc : dataUrl,
			tab : newTabIsOpened
		});
	});
	//remember that captureVisibleTab() is a statement
	return true;
});


/************ DON'T CHANGE THE FUNCTION OREDER ************/

// tabs change to another
chrome.tabs.onActiveChanged.addListener(function(){
	console.log("**** tab wad unselected ****");
	newTabIsOpened = false;
	var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'tab is changed' );
	    //notification.show();
});

// tabs replaced -- refreshed
chrome.tabs.onReplaced.addListener(function(){
	console.log("**** tab was replaced ****");
	newTabIsOpened = false;
	var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'tab is replaced' );
	    //notification.show();
});

// on tab created
chrome.tabs.onCreated.addListener(function(){
	console.log("**** new tab has been created ****");
	newTabIsOpened = true;
	var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'new tab created' );
	    //notification.show();
});

// on tab onRemoved
chrome.tabs.onRemoved.addListener(function(){
	console.log("**** tab was removed ****");
	newTabIsOpened = false;
	var notification = webkitNotifications.createNotification( '48.png',	 'Tab Alert',	 'tab was removed' );
	    //notification.show();
});
