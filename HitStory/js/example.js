$( "p" ).click(function() {
  $( this ).toggleClass( "make-red" );
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
function saveHistory() {
var d = new Date();
var n = d.getTime();
	chrome.storage.local.set({
		n : 'first',
		'key2' : 'second',
		'key3' : 'third',
		'key4' : 'fourth',
		'key5' : 'fifth'
	}, function() {
		// Notify that we saved.
		console.debug('Settings saved');
	});

	
	var storageSize=1;
	var total = 0;
	for (var x in localStorage) {
		storageSize++;
		var amount = (localStorage[x].length * 2) / 1024 / 1024;
		total += amount;
		console.log(x + "=" + amount.toFixed(2) + " MB");
	}
	console.log("Total: " + total.toFixed(2) + " MB");
	alert(storageSize);

var getItems = [];
	for (var i = 0; i<=storageSize; i++) {
		getItems.push('key' + i);
	}
	
	chrome.storage.local.get(getItems, function(items) {
		var keys = Object.keys(items);
		for (var i = 0, end = keys.length; i < end; i++) {
			var key = keys[i];
			console.debug(key + ' => ' + items[key]);
		}
	});

    
}


