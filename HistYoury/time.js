$('body').prepend('<h1 style="text-align:center" class="get-time"></h1>');

$('.get-time').ready(function(){
var date = new Date();
var year    = date.getFullYear();
var month   = date.getMonth()+1;
var day     = date.getDate();
var hour    = date.getHours();
var minute  = date.getMinutes();
var seconds = date.getSeconds();

var el = document.querySelector(".get-time").innerHTML=hour+":"+minute+" "+day+"/"+month+"/"+year;
});
