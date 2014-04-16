var databaseSize= {
	size:0
};

$(document).ready(function() {
	prePageLoad();
	saveHistory();
});

function prePageLoad(){
		chrome.storage.local.get(databaseSize, function(result) {
			console.log("get db size "+result['databaseSize']);		
		if (result['databaseSize'] != 0 && result['databaseSize'] != null )
			databaseSize.size = result['databaseSize']+1;
		else databaseSize.size = 0;
		});
}
function changeDBsize(){
	chrome.storage.local.set({
		databaseSize : databaseSize
	}, function() {
		// you can use strings instead of objects
		// if you don't  want to define default values
		console.log("DB SIZE SAVED "+databaseSize.size);
	});
}


// store data in chrome DB
function saveHistory() {
	var jsonName = databaseSize.size;
	
	// save json type
	var jsonName = {
		url : "avishay",
		name : "hajbi"
	};
	
	
	// store into data base
	chrome.storage.local.set({
		jsonName : databaseSize
	}, function() {
		// you can use strings instead of objects
		// if you don't  want to define default values
		changeDBsize();
		console.log("SAVED");
	});

	// read from data base
	for (var i = 0; i < databaseSize.size; i++) {
		chrome.storage.local.get(i, function(result) {
			console.log(result['i'].url);
			console.log(result.i.name);
		});
	}
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

