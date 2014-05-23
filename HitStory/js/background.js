var tabIsOpened = false;
var tabIsClosed = false;
var tabIsChanged = false;
var tabIsRefreshed = false;
var tabID = 0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// get tab id
	chrome.tabs.getSelected(null, function(tab) {
		tabID = tab.id;
	});
	chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) {
		sendResponse({
			imgSrc : dataUrl,
			tabId : tabID,
			tabInfoOpen : tabIsOpened,
			tabInfoClose : tabIsClosed,
			tabInfoChange : tabIsChanged,
			tabInfoRefresh : tabIsRefreshed
		});
	});
	//remember that captureVisibleTab() is a statement
	return true;
});
// on tab created
chrome.tabs.onCreated.addListener(function(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		tabID = tab.id;
	});
	tabIsOpened = true;
});
// on tab onRemoved
chrome.tabs.onRemoved.addListener(function(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		tabID = tab.id;
	});
	tabIsClosed = true;
});
// tabs change to another
chrome.tabs.onActiveChanged.addListener(function(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		tabID = tab.id;
	});
	tabIsChanged = true;
});
// tabs replaced -- refreshed
chrome.tabs.onReplaced.addListener(function(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		tabID = tab.id;
	});
	tabIsRefreshed = true;
});
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    // if(changeInfo && changeInfo.status == "complete"){
        // chrome.tabs.executeScript(tabId, {file: "js/underscore.min.js"}, function(){
            // chrome.tabs.executeScript(tabId, {file: "js/underscore.min.js"});
        // });
    // }
// });
//var notification = webkitNotifications.createNotification('48.png', 'Tab Alert', 'tab is changed');
//notification.show();