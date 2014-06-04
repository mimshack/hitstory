function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

// takes 6 params returns 1 json type class

function createTabClass(tab_id, created, active_time, closed, title, url, is_root, children, image_url) {
	var tab_class = {
	    id:page_data.length,
		tab_id : tab_id,
		created : created, // check javasacript Date()
		active_time : active_time, //chrome events onActivated
		closed : closed, //chrome events onRemoved
		title : title, //get from $('title').html()
		url : url, //document.location.href
		is_root : is_root, //if this is opend from google, or blank new tab
		children : children, //add array of the childrens id's
		img_url : image_url, //chrome events captureVisibleTab
	};
	return tab_class;
}

/* Using underscore js to find stuff - http://underscorejs.org/ */
//var where = _.where(page_data, {name: "andy", price: 50});
//var where = _.where(page_data, {id: 1});
//GLOBAL variables
var page_data = [];
var children = [];
var loc;
var isChild = false;
var image_url = null;
var tabOpened = false;
var tabClosed = false;
var tabChanged = false;
var tabRefreshed = false;
var tabSelected = 0;
function addToStorage(add_data) {
	page_data.push(add_data);
	chrome.storage.sync.set({
		'page_data' : page_data
	});
	displayStorage();
}
function addChildToStorage(add_data) {
	page_data[loc].children.push(add_data);
	chrome.storage.sync.set({
		'page_data' : page_data
	});
	displayStorage();
}

function getStorage() {
	chrome.storage.sync.get('page_data', function(result) {
		page_data = result.page_data;
	});
	displayStorage();
	return page_data;
}

function displayStorage() {
	console.table(page_data);
}

function capture_image_url() {
	chrome.runtime.sendMessage({
		msg : "capture"
	}, function(response) {
		console.log("capture image " + response.imgSrc);
		if (response.imgSrc != null)
			image_url = response.imgSrc;
		console.log("tab ID " + response.tabId);
		tabSelected = response.tabId;
		console.log("if new tab created " + response.tabInfoOpen);
		tabOpened = response.tabInfoOpen;
		console.log("tab closed " + response.tabInfoClose);
		tabClosed = false; //response.tabInfoClose; // temporary
		console.log("tab changed " + response.tabInfoChange);
		tabChanged = response.tabInfoChange;
		console.log("tab refreshed " + response.tabInfoRefresh);
		tabRefreshed = response.tabInfoRefresh;
		if (!page_data){
		var where = _.findWhere(page_data, {
		is_root : true,
		tab_id : tabSelected,
		closed : false
		});
		if (where) saveChild();
		else saveData();
		}
		else saveData();
	});
}

function saveChild() {
	// check if it's a child
	var where = _.findWhere(page_data, {
		is_root : true,
		tab_id : tabSelected,
		closed : false
	});
	loc= _.indexOf(page_data,where)+1;
	if (where) {
		if (window.location.href.indexOf("chrome-extension") != -1)
			return;
		if (window.location.href == "www.google.co.il" || window.location.href == "www.google.com")
			return;
		if (getPageIcon())
			image_url = getPageIcon();
		isChild = createTabClass(tabSelected, new Date().getTime(), "active_time", false, document.title, window.location.href, false, false, image_url);
		page_data[loc].children.push(isChild);
	chrome.storage.sync.set({
		'page_data' : page_data
	}, function(result) {
		addChildToStorage(isChild);
	});
	}
}

function saveData() {
	if (window.location.href.indexOf("chrome-extension") != -1)
		return;
	if (window.location.href == "www.google.co.il" || window.location.href == "www.google.com")
		return;
	if (getPageIcon())
		image_url = getPageIcon();
	var add_data = createTabClass(tabSelected, new Date().getTime(), "active_time", tabClosed, document.title, window.location.href, tabOpened, children, image_url);
	page_data.push(add_data);
	chrome.storage.sync.set({
		'page_data' : page_data
	}, function(result) {
		addToStorage(add_data);
	});
}

function getPageIcon() {
	var links = document.head.getElementsByTagName('link');
	for (var link in links) {
		if (links.hasOwnProperty(link)) {
			var l = links[link];
			if (l.rel === 'shortcut icon') {
				//console.log("shortcut icon "+l.href);
				return l.href;
			}
		}
	}
}
function initData(){
		console.log("init data");
		chrome.runtime.sendMessage({
		data : "data"
	}, function(response) {
		
		page_data = response.data;
		if (page_data){
			console.log("data is ready");
			capture_image_url();
		}
		else {
			console.log("data is not ready");
			setTimeout(function(){
				//initData();
			}, 3000);
		}
	});
}
$(document).ready(function() {
	initData();
});
