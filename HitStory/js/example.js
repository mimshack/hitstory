$("p").click(function() {
	$(this).toggleClass("make-red");
});

$(document).ready(function() {
	saveHistory();
});
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

// store data in chrome DB
function saveHistory() {
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

	/*	// dispaly DB size in MB
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

	/*	// chrome storage array example
	var links = {'one': 1, 'two': 2 };
	var setstr = JSON.stringify(links);
	localStorage.setItem('strlinks', setstr);
	var getstr = localStorage.getItem('strlinks');
	console.log(getstr+"*******************************"); //Returns what's expected - '{"one":1, "two":2}'
	for (var x in getstr)
	console.log(getstr[x]+"**************");
	*/

	// try to save a json type -- not working as needed
	var userKeyIds = [{
		"url" : "avishay",
		"name" : "hajbi"
	}];
	chrome.storage.local.set({
		userKeyIds : []
	}, function() {
		// you can use strings instead of objects
		// if you don't  want to define default values
		console.log("SAVED"); 
	});
	chrome.storage.local.get('userKeyIds', function(result) {
		console.log(result.userKeyIds[0]);
		console.log(result.userKeyIds.name);
		console.log(result.name);
		console.log(result[0]);
	});
}

