var last_ten = [];


//use: var l = new LastTen(url_link, class_name, duration); last_ten.push(l)
function LastTen(url_link, class_name, duration) {
    this.url_link = url_link;
    this.class_name = class_name;
    this.duration = duration;
}

function readableTime(x) {
    x = ms / 1000;
    var seconds = x % 60;
    x /= 60;
    var minutes = x % 60;
    x /= 60;
    var hours = x % 24;
    return hours + "hrs " + minutes + "min " + seconds + "sec";
}

function setClassName(time) {
    var class_name = "duration";
    var now = new Date();
    now = now.getTime();
    time = (now - time) / 1000;
    //convert from milisec to sec
        if (time<60)
            class_name += "1";
        else if (time<180)
            class_name += "2";
        else if  (time<300)
            class_name += "3";
        else if  (time<1800)
            class_name += "4";
        else if  (time>1800)
            class_name += "5";
        else alert(time);
    //console.log(class_name);
    return class_name;
}

function init_popup() {
    var url_link, class_name, duration;
    var interation = (page_data.length > 10) ? 10 : page_data.length;
	var check = 0;
    for (i = 0; i < interation; i++) {
    	if (check == interation) break;
    try{
        class_name = setClassName(page_data[i].created);
        url_link = page_data[i].url;
        var j = url_link.indexOf("//");
        //console.log("***********"+page_data[i].url);
        if (page_data[i].url.indexOf("chrome-extension")==-1){
        	page_data[i].title  = (page_data[i].title)? page_data[i].title : 'No title';	
        	$('.hitstory .wrapper ul').prepend('<li class="' + class_name + '"><img src="'+page_data[i].img_url+'" width=20px; height=20px; style="float:left;"><a target="_blank" href="' + url_link + '">' + page_data[i].title + '</a></li>');
        }
        else{
        	i--;
        	check++;
        } 
       }
       catch(Exception){
       	console.log("page data["+i+"] not exist");
       }
    }
    $('.hitstory .wrapper').removeClass('spinner');
}

function updateLastTen(url) {
    if (last_ten.length < 10)
        last_ten[9] = url;
    else
        last_ten.push(url);
}

function getStorage() {
	chrome.storage.local.get('page_data', function(result) {
		page_data = result.page_data;
		setTimeout(function() {
		}, 3000);
	});
	return page_data;
}
$(document).ready(function() {
page_data = getStorage();
setTimeout(function() {
    init_popup();
}, 3000);
}); 