 //d3 timeline js doc can be found here https://github.com/jiahuang/d3-timeline#method-calls 
 //d3 regular docs can be found here https://github.com/mbostock/d3/wiki/Selections


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
   
    
	}, 4000);
}); 

function getRoots() {
	for ( i = 0; i < page_data.length; i++)
	//if (page_data[i].is_root.toString == true){
		console.log(page_data[i].title);
	//}
}


(function () {
  d3.timeline = function() {
    var DISPLAY_TYPES = ["circle", "rect"];

    var hover = function () {},
        mouseover = function () {},
        mouseout = function () {},
        click = function () {},
        scroll = function () {},
        orient = "bottom",
        width = null,
        height = null,
        tickFormat = { format: d3.time.format("%I %p"),
          tickTime: d3.time.hours,
          tickInterval: 1,
          tickSize: 6 },
        colorCycle = d3.scale.category20(),
        colorPropertyName = null,
        display = "rect",
        beginning = 0,
        ending = 0,
        margin = {left: 30, right:30, top: 30, bottom:30},
        stacked = false,
        rotateTicks = false,
        timeIsRelative = false,
        itemHeight = 20,
        itemMargin = 5,
        showTodayLine = false,
        showTodayFormat = {marginTop: 25, marginBottom: 0, width: 1, color: colorCycle},
        showBorderLine = false,
        showBorderFormat = {marginTop: 25, marginBottom: 0, width: 1, color: colorCycle}
      ;

    function timeline (gParent) {
      var g = gParent.append("g");
      var gParentSize = gParent[0][0].getBoundingClientRect();

      var gParentItem = d3.select(gParent[0][0]);

      var yAxisMapping = {},
        maxStack = 1,
        minTime = 0,
        maxTime = 0;

      setWidth();

      // check if the user wants relative time
      // if so, substract the first timestamp from each subsequent timestamps
      if(timeIsRelative){
        g.each(function (d, i) {
          d.forEach(function (datum, index) {
            datum.times.forEach(function (time, j) {
              if(index === 0 && j === 0){
                originTime = time.starting_time;               //Store the timestamp that will serve as origin
                time.starting_time = 0;                        //Set the origin
                time.ending_time = time.ending_time - originTime;     //Store the relative time (millis)
              }else{
                time.starting_time = time.starting_time - originTime;
                time.ending_time = time.ending_time - originTime;
              }
            });
          });
        });
      }

      // check how many stacks we're gonna need
      // do this here so that we can draw the axis before the graph
      if (stacked || (ending === 0 && beginning === 0)) {
        g.each(function (d, i) {
          d.forEach(function (datum, index) {

            // create y mapping for stacked graph
            if (stacked && Object.keys(yAxisMapping).indexOf(index) == -1) {
              yAxisMapping[index] = maxStack;
              maxStack++;
            }

            // figure out beginning and ending times if they are unspecified
            if (ending === 0 && beginning === 0){
              datum.times.forEach(function (time, i) {
                if (time.starting_time < minTime || (minTime === 0 && timeIsRelative === false))
                  minTime = time.starting_time;
                if (time.ending_time > maxTime)
                  maxTime = time.ending_time;
              });
            }
          });
        });

        if (ending === 0 && beginning === 0) {
          beginning = minTime;
          ending = maxTime;
        }
      }

      var scaleFactor = (1/(ending - beginning)) * (width - margin.left - margin.right);

      // draw the axis
      var xScale = d3.time.scale()
        .domain([beginning, ending])
        .range([margin.left, width - margin.right]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient(orient)
        .tickFormat(tickFormat.format)
        .ticks(tickFormat.tickTime, tickFormat.tickInterval)
        .tickSize(tickFormat.tickSize);

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 +","+(margin.top + (itemHeight + itemMargin) * maxStack)+")")
        .call(xAxis);

      // draw the chart
      g.each(function(d, i) {
        d.forEach( function(datum, index){
          var data = datum.times;
          var hasLabel = (typeof(datum.label) != "undefined");
          var hasId = (typeof(datum.id) != "undefined");

          g.selectAll("svg").data(data).enter()
            .append(display)
            .attr("x", getXPos)
            .attr("y", getStackPosition)
            .attr("width", function (d, i) {
              return (d.ending_time - d.starting_time) * scaleFactor;
            })
            .attr("cy", getStackPosition)
            .attr("cx", getXPos)
            .attr("r", itemHeight / 2)
            .attr("height", itemHeight)
            .style("fill", function(d, i){
              if (d.color) return d.color;
              if( colorPropertyName ){
                return colorCycle( datum[colorPropertyName] );
              }
              return colorCycle(index);
            })
            .on("mousemove", function (d, i) {
              hover(d, index, datum);
            })
            .on("mouseover", function (d, i) {
              mouseover(d, i, datum);
            })
            .on("mouseout", function (d, i) {
              mouseout(d, i, datum);
            })
            .on("click", function (d, i) {
              click(d, index, datum);
            })
            .attr("id", function (d, i) {
              if (hasId){
                return "timelineItem_"+datum.id;
              }else{
                return "timelineItem_"+index;
              }
            })
          ;

          g.selectAll("svg").data(data).enter()
            .append("text")
            .attr("x", getXTextPos)
            .attr("y", getStackTextPosition)
            .text(function(d) {
              return d.label;
            })
          ;

          // add the label
          if (hasLabel) {
            gParent.append("text")
              .attr("class", "timeline-label")
              .attr("transform", "translate("+ 0 +","+ (itemHeight * 0.75 + margin.top + (itemHeight + itemMargin) * yAxisMapping[index])+")")
              .text(hasLabel ? datum.label : datum.id);
          }

          if (typeof(datum.icon) !== "undefined") {
            gParent.append("image")
              .attr("class", "timeline-label")
              .attr("transform", "translate("+ 0 +","+ (margin.top + (itemHeight + itemMargin) * yAxisMapping[index])+")")
              .attr("xlink:href", datum.icon)
              .attr("width", margin.left)
              .attr("height", itemHeight);
          }

          function getStackPosition(d, i) {
            if (stacked) {
              return margin.top + (itemHeight + itemMargin) * yAxisMapping[index];
            }
            return margin.top;
          }
          function getStackTextPosition(d, i) {
            if (stacked) {
              return margin.top + (itemHeight + itemMargin) * yAxisMapping[index] + itemHeight * 0.75;
            }
            return margin.top + itemHeight * 0.75;
          }
        });
      });

      if (width > gParentSize.width) {
        var move = function() {
          var x = Math.min(0, Math.max(gParentSize.width - width, d3.event.translate[0]));
          zoom.translate([x, 0]);
          g.attr("transform", "translate(" + x + ",0)");
          scroll(x*scaleFactor, xScale);
        };

        var zoom = d3.behavior.zoom().x(xScale).on("zoom", move);

        gParent
          .attr("class", "scrollable")
          .call(zoom);
      }

      if (rotateTicks) {
        g.selectAll("text")
          .attr("transform", function(d) {
            return "rotate(" + rotateTicks + ")translate("
              + (this.getBBox().width / 2 + 10) + "," // TODO: change this 10
              + this.getBBox().height / 2 + ")";
          });
      }

      var gSize = g[0][0].getBoundingClientRect();
      setHeight();

      if (showBorderLine) {
        g.each(function (d, i) {
          d.forEach(function (datum) {
            var times = datum.times;
            times.forEach(function (time) {
              appendLine(xScale(time.starting_time), showBorderFormat);
              appendLine(xScale(time.ending_time), showBorderFormat);
            });
          });
        });
      }

      if (showTodayLine) {
        var todayLine = xScale(new Date());
        appendLine(todayLine, showTodayFormat);
      }

      function getXPos(d, i) {
        return margin.left + (d.starting_time - beginning) * scaleFactor;
      }

      function getXTextPos(d, i) {
        return margin.left + (d.starting_time - beginning) * scaleFactor + 5;
      }

      function setHeight() {
        if (!height && !gParentItem.attr("height")) {
          if (itemHeight) {
            // set height based off of item height
            height = gSize.height + gSize.top - gParentSize.top;
            // set bounding rectangle height
            d3.select(gParent[0][0]).attr("height", height);
          } else {
            throw "height of the timeline is not set";
          }
        } else {
          if (!height) {
            height = gParentItem.attr("height");
          } else {
            gParentItem.attr("height", height);
          }
        }
      }

      function setWidth() {
        if (!width && !gParentSize.width) {
          throw "width of the timeline is not set. As of Firefox 27, timeline().with(x) needs to be explicitly set in order to render";
        } else if (!(width && gParentSize.width)) {
          if (!width) {
            width = gParentItem.attr("width");
          } else {
            gParentItem.attr("width", width);
          }
        }
        // if both are set, do nothing
      }

      function appendLine(lineScale, lineFormat) {
        gParent.append("svg:line")
          .attr("x1", lineScale)
          .attr("y1", lineFormat.marginTop)
          .attr("x2", lineScale)
          .attr("y2", height - lineFormat.marginBottom)
          .style("stroke", lineFormat.color)//"rgb(6,120,155)")
          .style("stroke-width", lineFormat.width);
      }

    }

    // SETTINGS

    timeline.margin = function (p) {
      if (!arguments.length) return margin;
      margin = p;
      return timeline;
    };

    timeline.orient = function (orientation) {
      if (!arguments.length) return orient;
      orient = orientation;
      return timeline;
    };

    timeline.itemHeight = function (h) {
      if (!arguments.length) return itemHeight;
      itemHeight = h;
      return timeline;
    };

    timeline.itemMargin = function (h) {
      if (!arguments.length) return itemMargin;
      itemMargin = h;
      return timeline;
    };

    timeline.height = function (h) {
      if (!arguments.length) return height;
      height = h;
      return timeline;
    };

    timeline.width = function (w) {
      if (!arguments.length) return width;
      width = w;
      return timeline;
    };

    timeline.display = function (displayType) {
      if (!arguments.length || (DISPLAY_TYPES.indexOf(displayType) == -1)) return display;
      display = displayType;
      return timeline;
    };

    timeline.tickFormat = function (format) {
      if (!arguments.length) return tickFormat;
      tickFormat = format;
      return timeline;
    };

    timeline.hover = function (hoverFunc) {
      if (!arguments.length) return hover;
      hover = hoverFunc;
      return timeline;
    };

    timeline.mouseover = function (mouseoverFunc) {
      if (!arguments.length) return mouseoverFunc;
      mouseover = mouseoverFunc;
      return timeline;
    };

    timeline.mouseout = function (mouseoverFunc) {
      if (!arguments.length) return mouseoverFunc;
      mouseout = mouseoverFunc;
      return timeline;
    };

    timeline.click = function (clickFunc) {
      if (!arguments.length) return click;
      click = clickFunc;
      return timeline;
    };

    timeline.scroll = function (scrollFunc) {
      if (!arguments.length) return scroll;
      scroll = scrollFunc;
      return timeline;
    };

    timeline.colors = function (colorFormat) {
      if (!arguments.length) return colorCycle;
      colorCycle = colorFormat;
      return timeline;
    };

    timeline.beginning = function (b) {
      if (!arguments.length) return beginning;
      beginning = b;
      return timeline;
    };

    timeline.ending = function (e) {
      if (!arguments.length) return ending;
      ending = e;
      return timeline;
    };

    timeline.rotateTicks = function (degrees) {
      rotateTicks = degrees;
      return timeline;
    };

    timeline.stack = function () {
      stacked = !stacked;
      return timeline;
    };

    timeline.relativeTime = function() {
      timeIsRelative = !timeIsRelative;
      return timeline;
    };

    timeline.showBorderLine = function () {
        showBorderLine = !showBorderLine;
        return timeline;
    };

    timeline.showBorderFormat = function(borderFormat) {
      if (!arguments.length) return showBorderFormat;
      showBorderFormat = borderFormat;
      return timeline;
    };

    timeline.showToday = function () {
      showTodayLine = !showTodayLine;
      return timeline;
    };

    timeline.showTodayFormat = function(todayFormat) {
      if (!arguments.length) return showTodayFormat;
      showTodayFormat = todayFormat;
      return timeline;
    };

    timeline.colorProperty = function(colorProp) {
      if (!arguments.length) return colorPropertyName;
      colorPropertyName = colorProp;
      return timeline;
    };

    return timeline;
  };
})();