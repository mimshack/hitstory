var database = {
	size : 0
};

$(document).ready(function() {
	prePageLoad();
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

