 //d3 timeline js doc can be found here https://github.com/jiahuang/d3-timeline#method-calls 
 //d3 regular docs can be found here https://github.com/mbostock/d3/wiki/Selections
 
 var testData = [
        {times: [{"starting_time": 1355752800000, "ending_time": 1355759900000}, {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
        {times: [{"starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
        {times: [{"starting_time": 1355761910000, "ending_time": 1355763910000}]},
      ];
      var width = 900;
function timelineCircle() {
        var chart = d3.timeline()
          .tickFormat( //
            {format: d3.time.format("%I %p"),
            tickTime: d3.time.hours,
            tickInterval: 1,
            tickSize: 30})
          .display("circle"); // toggle between rectangles and circles

        var svg = d3.select("#timeline2").append("svg").attr("width", width)
          .datum(testData).call(chart);
      }

$(document).ready(function() {
$('body').append('<h1 id="loader">Loading</h1>');
setTimeout(function() {
    
	var tmp_db=page_data;
	console.log("*********** function start");
	console.log(tmp_db);
	//array
	var container = document.getElementsByClassName("view-content");

	for ( i = 0; i < tmp_db.length; i++) {
	
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

		for ( j = 0; j < tmp_db[i].children.length ; j++) {
			var item = document.createElement("div");
			item.className = "cluster-overview-item";

			var hexagon = document.createElement("div");
			hexagon.className = "cluster-overview-item-hexagon";
			//hexagon.css('background', 'red');
			var link = document.createElement("a");
			link.setAttribute('href', tmp_db[i].children[j].url);
			link.id = "cluster-overview-item";
			//link.css('background-image', 'url(' + tmp_db[i].children[j].img_url + ')');
			link.setAttribute('data-mf-related', "");
			/* */
			link.style.backgroundImage = 'url(' + tmp_db[i].children[j].img_url + ')';
			/* */
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
    timelineCircle();
    
	}, 4000);
}); 

function getRoots() {
	for ( i = 0; i < page_data.length; i++)
	//if (page_data[i].is_root.toString == true){
		console.log(page_data[i].title);
	//}
}