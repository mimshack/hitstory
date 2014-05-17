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
    console.log(class_name);
    return class_name;
}

function init_popup() {
    var url_link, class_name, duration;
    var interation = (page_data.length > 10) ? 10 : page_data.length;

    for (i = 0; i < interation; i++) {
    try{
        class_name = setClassName(page_data[i].created);
        url_link = page_data[i].url;
        var j = url_link.indexOf("//");
        $('.hitstory .wrapper ul').prepend('<li class="' + class_name + '"><a target="_blank" href="' + url_link + '">' + url_link.substr(j + 2, 30) + '</a></li>');
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


$(document).ready(function() {
setTimeout(function() {
    init_popup();
}, 5000);
}); 