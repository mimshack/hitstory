 //d3 timeline js doc can be found here https://github.com/jiahuang/d3-timeline#method-calls 
 //d3 regular docs can be found here https://github.com/mbostock/d3/wiki/Selections
var mydata = [];
function Line(icon,timeStart,timeEnd){
	var line = {
		icon: icon,
		times: [{
			"starting_time":timeStart,
			"ending_time":timeEnd
		}]
	};
	return line;
}
// mydata.push(Line("jackie.png",1402975304308,1402998503844));
// mydata.push(Line("jackie.png",1402975762471,1402998503844));
// mydata.push(Line("jackie.png",1402975770882,1402998503844));
// mydata.push(Line("jackie.png",1402975771750,1402998503844));
// var iconTestData = [
        // {icon: , times: [{"starting_time": , "ending_time": }, 
        							// {"starting_time": , "ending_time": }]},
        // {icon: "troll.png", times: [{"starting_time": , "ending_time": }, ]},
        // {icon: "wat.png", times: [{"starting_time": , "ending_time": }]},
      // ];
var start;
var end;
var width = $(window).width()-50;
//https://github.com/jiahuang/d3-timeline   -- all functionality
function timelineStackedIcons() {
        var chart = d3.timeline()
          .beginning(start) // we can optionally add beginning and ending times to speed up rendering a little
          .ending(end)
          .stack() // toggles graph stacking
          .margin({left:70, right:30, top:0, bottom:0})
          ;
        var svg = d3.select("#timeline5").append("svg").attr("width", width)
          .datum(mydata).call(chart);
      }

$(document).ready(function() {
$('body').append('<h1 id="loader">Loading</h1>');
setTimeout(function() {
    
	var tmp_db=page_data;
	console.log("*********** function start");
	console.log(tmp_db);
	//array
	var container = document.getElementsByClassName("view-content");

	start=page_data[0].created;
	end = new Date().getTime();
	for ( i = 0; i < tmp_db.length; i++) {
		//console.log("check values-- created: "+tmp_db[i].created +" close: " + tmp_db[i].closed);
		mydata.push(Line( tmp_db[i].img_url, tmp_db[i].created , end)); //tmp_db[i].closed
		var url = tmp_db[i].url;
		console.log("*********** function start22" + container);

		var row = document.createElement("div");
		row.className = "row";

		var head_container = document.createElement("div");
		head_container.className = "cluster-teaser";

		var head = document.createElement("div");
		head.className = "hexagon-small";

		var pic = document.createElement("a");
		pic.className = "hexagon-small-inner";
		pic.setAttribute('href', url);
		//pic.innerHTML="<span><span style=\"background-image: url(http://upload.wikimedia.org/wikipedia/commons/2/26/Microchip_PIC24HJ32GP202.jpg);\" class=\"loaded\"></span></span>"

		var span = document.createElement("span");

		var imageUrl = tmp_db[i].img_url;
		var span_fill = document.createElement("span");
		span_fill.style.backgroundImage = 'url(' + imageUrl + ')';
		span_fill.className = "loaded";
		//span_fill.setAttribute('style', "background-image: url("+imageUrl+");");

		var text = document.createElement("a");
		text.className = "text";
		text.setAttribute('href', tmp_db[i].url);
		text.innerHTML = (tmp_db[i].title)? tmp_db[i].title : 'No title';

		span.appendChild(span_fill);
		pic.appendChild(span);

		head.appendChild(text);
		head.appendChild(pic);
		head_container.appendChild(head);
		row.appendChild(head_container);

		//if have childes create: item-list - overview-items - overview-items-row even -
		//for ( i=0;i<page_data[i].childes.length;i++)
		var item_list = document.createElement("div");
		item_list.className = "item-list";

		var items = document.createElement("div");
		items.className = "overview-items";

		var items_row = document.createElement("div");
		items_row.className = "overview-items-row even";

		for ( j = 0; j < 6; j++) {
			var item = document.createElement("div");
			item.className = "cluster-overview-item";

			var hexagon = document.createElement("div");
			hexagon.className = "cluster-overview-item-hexagon";

			var link = document.createElement("a");
			link.setAttribute('href', url);
			link.id = "cluster-overview-item";
			link.setAttribute('data-mf-related', "");

			hexagon.appendChild(link);
			item.appendChild(hexagon);
			items_row.appendChild(item);
		}

		var line_horizontal = document.createElement("div");
		line_horizontal.className = "line horizontal";

		items_row.appendChild(line_horizontal);
		items.appendChild(items_row);
		item_list.appendChild(items);
		row.appendChild(item_list);

		var clear = document.createElement("div");
		clear.className = "clear";

		row.appendChild(clear);

		container[0].appendChild(row);

		console.log("*********** function end.");
	}//--end 1st for --
	// start all chrome storage ready functions
	$('#loader').remove();
	// var width = 800;
	// var height = 800;
	// var d3_data = [20,40,60];
	// var scale_width = d3.scale.linear()
	                   // .domain([0,60])
	                   // .range([0,width]);
	// var canvas = d3.select('.chart')
                // .append("svg")
                // .attr("width", width )
                // .attr("height",500);
    // var bars = canvas.selectAll("rect")
                // .data(d3_data)
                // .enter()
                    // .append('rect')
                    // .attr('width', function(d){ return scale_width(d);})
                    // .attr('height', 50)
                    // .attr('y',function(d, i){ return i*70; });
    timelineStackedIcons();
    console.table(mydata);
	}, 4000);
}); 

function getRoots() {
	for ( i = 0; i < page_data.length; i++)
	//if (page_data[i].is_root.toString == true){
		console.log(page_data[i].title);
	//}
}