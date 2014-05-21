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
var tabOpened = false;
var tabClosed = false;
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
	//console.log(page_data);
}

function capture_image_url() {
	chrome.runtime.sendMessage({
		msg : "capture"
	}, function(response) {
		console.log("capture image"+response.imgSrc);
		image_url = response.imgSrc;
		console.log("if new tab created "+response.tabInfoOpen);
		tabOpened = response.tabInfoOpen;
		console.log("tab closed "+response.tabInfoClose);
		tabClosed = response.tabInfoClose;
		getStorage();
		calculateTimes();
		saveData();
	});
}

function calculateTimes(){
	// here we will calculate 'active time' , children and more...
}

function saveData() {
	if (window.location.href.indexOf("chrome-extension")!=-1) return;
	if (getPageIcon()) image_url=getPageIcon();
	var add_data = createTabClass(new Date().getTime(), "active_time", tabClosed, document.title, window.location.href, tabOpened, children,  image_url);
	page_data.push(add_data);
	//the DB is still empty
	chrome.storage.local.set({
		'page_data' : page_data
	}, function(result) {
		addToStorage(add_data);
		// another call to DB and now it success
		displayStorage();
	});
	
	// init to false because they keep their value
	tabOpened=false;
	tabClosed=false;
	tabIsOpened=false;
	tabIsClosed=false;
}

function getPageIcon(){
	var links = document.head.getElementsByTagName('link');
for(var link in links){
    if(links.hasOwnProperty(link)){
        var l = links[link];
        if(l.rel === 'shortcut icon'){
        	console.log("shortcut icon "+l.href);
          return l.href;
        }
    }
}
}

// look at createTabClass() to know how to get the correct vars
$(document).ready(function() {
	capture_image_url();
});


