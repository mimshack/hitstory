var database = {
	size : 0
};


// takes 6 params returns 1 json type class
function createTabClass(created,active_time,closed,title,url,is_root,children){
    
    var tab_class = {
        created :created, // check javasacript Date()
        active_time: active_time,//chrome events onActivated
        closed: closed, //chrome events onRemoved
        title:title, //get from $('title').html()
        url:"url", //document.location.href
        is_root:"is?", //if this is opend from google, or blank new tab
        children:"dd", //add array of the childrens id's 
        img_url:"", //chrome events captureVisibleTab
    };
    return tab_class;
}

/* Using underscore js to find stuff - http://underscorejs.org/ */
//var where = _.where(page_data, {name: "andy", price: 50});
//var where = _.where(page_data, {id: 1});

function addToStorage(add_data)
{
    var page_data = getStorage();
    page_data.push(add_data);
    chrome.storage.local.set({'page_data': page_data});
    //chrome.storage.sync();
}

function getStorage() {
    var page_data;
    chrome.storage.local.get('page_data', function (result) {
        page_data = result.page_data;
        console.table(page_data);
        console.log( page_data);
    });
    return page_data;
} 


// look at createTabClass() to know how to get the correct vars
$(document).ready(function() {
    /*
    var add_data = createTabClass('created','active_time','closed','title','url','is_root','children');
    addToStorage(add_data);
    add_data = createTabClass('created2','active_time2','closed2','title2','url2','is_root2','children2');
    addToStorage(add_data);
    */
    var page_data = [];
   
    var add_data = createTabClass('created','active_time','closed','title','url','is_root','children');
    page_data.push(add_data);
    add_data = createTabClass('created2','active_time2','closed2','title2','url2','is_root2','children2');
    page_data.push(add_data);
    chrome.storage.local.set({'page_data': page_data});
    getStorage(); //this hapens async so if you put stuff after it , it will excute before.. need to do a callback function if you want to do sync..
	//prePageLoad();
	//console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
	
	
});

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

