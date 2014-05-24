window.onload = function(){	 
	console.log("*********** function start");
	
	//array
	var container = document.getElementsByClassName("view-content");	
	
	//for ( i=0;i<page_data.length;i++)
		//if (true || page_data[i].is_root.toString == true){		//if root
			//console.log(page_data[i].title);
			var url="http://google.com";
			console.log("*********** function start22"+container);
			
			
			
			var row = document.createElement("div");
			row.className="row";
			
				var head_container = document.createElement("div");
				head_container.className="cluster-teaser";
				
					var head = document.createElement("div");
					head.className="hexagon-small";
					
						var pic = document.createElement("a");
						pic.className="hexagon-small-inner";
						pic.setAttribute('href', url);
						pic.innerHTML="<span><span style=\"background-image: url(http://upload.wikimedia.org/wikipedia/commons/2/26/Microchip_PIC24HJ32GP202.jpg);\" class=\"loaded\"></span></span>"
						
						var text = document.createElement("a");
						text.className="text";
						text.setAttribute('href', url);
						text.innerHTML="google";
				
			head.appendChild(text);
			head.appendChild(pic);
			head_container.appendChild(head);
			row.appendChild(head_container);
			
				
			
			//if have childes create: item-list - overview-items - overview-items-row even - 
			//for ( i=0;i<page_data[i].childes.length;i++)
				var item_list = document.createElement("div");
				item_list.className="item-list";
				
					var items = document.createElement("div");
					items.className="overview-items";
				
						var items_row = document.createElement("div");
						items_row.className="overview-items-row even";
				
				
				
				
				
							var item = document.createElement("div");
							item.className="cluster-overview-item";
				
								var hexagon = document.createElement("div");
								hexagon.className="cluster-overview-item-hexagon";
								
									var link = document.createElement("a");
									link.setAttribute('href', url);
									link.id="cluster-overview-item";
									link.setAttribute('data-mf-related', "");

									
								var line_clear = document.createElement("div");
								line_clear.className="line horizontal";
							
							var clear = document.createElement("div");
							clear.className="clear";
							
							var line_horizontal = document.createElement("div");
							line_horizontal.className="line horizontal";
							
				
				
		hexagon.appendChild(link);
		item.appendChild(hexagon);
		item.appendChild(line_clear);
		
		
		items_row.appendChild(item);
		items_row.appendChild(clear);
		items_row.appendChild(line_horizontal);
		items.appendChild(items_row);
		item_list.appendChild(items);
		row.appendChild(item_list);
		
				var clear_end = document.createElement("div");
				clear_end.className="clear";
				
		row.appendChild(clear_end);
		
		
		console.log("*********** function end.");
		
		container[0].appendChild(row);
};



function getRoots(){
	for ( i=0;i<page_data.length;i++)
		//if (page_data[i].is_root.toString == true){
			console.log(page_data[i].title);
		//}
}