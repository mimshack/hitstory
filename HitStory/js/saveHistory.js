// takes 6 params returns 1 json type class
function createTabClass(created, active_time, closed, title, url, is_root, children, image_url) {
	var tab_class = {
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
var image_url = null;
var newTabIsOpened = false;
var checkGlobal="i am global";
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
	console.log(page_data);
}

function capture_image_url() {
	chrome.runtime.sendMessage({
		msg : "capture"
	}, function(response) {
		console.log(response.imgSrc);
		image_url = response.imgSrc;
		console.log(response.tab);
		newTabIsOpened = response.tab;
		getStorage();
		calculateTimes();
		saveData();
	});
}

function calculateTimes(){
	// here we will calculate 'active time' children and more...
}

function saveData() {
	if (window.location.href.indexOf("chrome-extension")!=-1) return;
	var add_data = createTabClass(new Date().getTime(), "active_time", 'closed', document.title, window.location.href, newTabIsOpened, children, image_url);
	page_data.push(add_data);
	//the DB is still empty
	chrome.storage.local.set({
		'page_data' : page_data
	}, function(result) {
		addToStorage(add_data);
		// another call to DB and now it success
		displayStorage();
	});
}

// look at createTabClass() to know how to get the correct vars
$(document).ready(function() {
	capture_image_url();
});

/*
 var database = {
 size : 0
 };
 function prePageLoad() {

 chrome.storage.local.get('', function(result) {
 if (result.database == null || result.database == undefined)
 database.size = 1;
 else if (result.database.size == 0) {
 database.size += result.database.size;
 } else
 database.size = 1;
 });

 console.log("get db size " + database.size);

 saveHistory();
 }

 function changeDBsize() {
 database.size += 1;
 chrome.storage.local.set({
 database : database
 }, function() {
 console.log("DB SIZE SAVED " + database.size);
 });
 }

 function displayDataBase() {
 // read from data base
 for (var i = 1; i <= database.size; i++) {
 var obj = "key"+i.toString();
 chrome.storage.local.get(obj, function(result) {
 console.log("read dataBase: ");
 if (result.obj != null) {
 console.log(result.obj.url);
 console.log(result.obj.name);
 }
 });
 }
 }

 // store data in chrome DB
 function saveHistory() {
 var jsonName = "key"+database.size.toString();
 console.log("jsonName " + jsonName);
 // save json type
 var jsonName = {
 url : "avishay",
 name : "hajbi"
 };

 // store into data base
 chrome.storage.local.set({
 jsonName : jsonName
 }, function() {
 console.log("jason SAVED");
 });

 changeDBsize();

 displayDataBase();

 }
 */

/*	// display DB size in MB
 var storageSize = 1;
 var total = 0;
 for (var x in localStorage) {
 storageSize++;
 var amount = (localStorage[x].length * 2) / 1024 / 1024;
 total += amount;
 console.log(x + "=" + amount.toFixed(2) + " MB");
 }
 console.log("Total: " + total.toFixed(2) + " MB");
 */

/* another exmaples */

/*	// chrome storage array example
 var links = {'one': 1, 'two': 2 };
 var setstr = JSON.stringify(links);
 localStorage.setItem('strlinks', setstr);
 var getstr = localStorage.getItem('strlinks');
 console.log(getstr+"*******************************"); //Returns what's expected - '{"one":1, "two":2}'
 for (var x in getstr)
 console.log(getstr[x]+"**************");
 */

/*
 {
 "page" [
 { "url":"urlurl" },
 { "open":"openopen" },
 { "live":"livelive" },
 {"title":"titletitle" },
 { "parent":"parentparent" },
 { "children":"childrenchildren" }

 ];
 }
 */

/*
 var d = new Date();
 var n = d.getTime();
 var id = "id" + n;
 chrome.storage.local.set({
 'id0' : window.location.pathname,
 'id1' : n + 1,
 'id2' : n + 2,
 'id3' : n + 3
 }, function() {
 // Notify that we saved.
 console.debug('Settings saved');
 });
 */

/*
 // get items from chrome DB by tag name
 var getItems = [];
 for (var i = 0; i <= localStorage.length; i++) {
 getItems.push('id' + i);
 }

 // display the received array from chrome DB
 chrome.storage.local.get(getItems, function(items) {
 var keys = Object.keys(items);
 for (var i = 0, end = keys.length; i < end; i++) {
 var key = keys[i];
 console.debug(key + ' => ' + items[key]);
 }
 });
 */

