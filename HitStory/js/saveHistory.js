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
var isChild = false;
var image_url = null;
var tabOpened = false;
var tabClosed = false;
var tabChanged = false;
var tabRefreshed = false;
var tabSelected = 0;
var checkGlobal = "i am global";
function addToStorage(add_data) {
	page_data.push(add_data);
	chrome.storage.local.set({
		'page_data' : page_data
	});
	//chrome.storage.sync();
}

function getStorage() {
	chrome.storage.local.get('page_data', function(result) {
		page_data = result.page_data;
		setTimeout(function() {
		}, 3000);
	});
	return page_data;
}

function displayStorage() {
	console.table(page_data);
	var where = _.findWhere(page_data, {
	    is_root : true,
	    tab_id : tabSelected,
        closed : false
	});
	console.log(_.indexOf(page_data,where));
	//getObjects(TestObj, 'is_root', 'A');
	console.log('where',where);
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
		getStorage();
		saveData();
	});
}

function saveChild() {
	// check if it's a child
	var where = _.findWhere(page_data, {
		is_root : "true",
		tab_id : tabSelected,
		closed : false
	});
	if (where) {
		if (window.location.href.indexOf("chrome-extension") != -1)
			return;
		if (window.location.href == "www.google.co.il" || window.location.href == "www.google.com")
			return;
		if (getPageIcon())
			image_url = getPageIcon();
		isChild = createTabClass(tabSelected, new Date().getTime(), "active_time", false, document.title, window.location.href, false, false, image_url);
		console.log(where); // *** BROBLEM *** 'where' didn't execute 
		//where.children.push(isChild);
		console.log(isChild);
		return true;
	} else
		return false;

}

function saveData() {
	saveChild();
	if (window.location.href.indexOf("chrome-extension") != -1)
		return;
	if (window.location.href == "www.google.co.il" || window.location.href == "www.google.com")
		return;
	if (getPageIcon())
		image_url = getPageIcon();
	var add_data = createTabClass(tabSelected, new Date().getTime(), "active_time", tabClosed, document.title, window.location.href, tabOpened, children, image_url);
	page_data.push(add_data);
	//the DB is still empty
	chrome.storage.local.set({
		'page_data' : page_data
	}, function(result) {
		addToStorage(add_data);
		displayStorage();
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

// look at createTabClass() to know how to get the correct vars
$(document).ready(function() {
	capture_image_url();
});

