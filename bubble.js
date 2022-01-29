
d3.csv("./data/dataset-1.csv", readcsv);

function readcsv(error, rawdata) {

    console.log(rawdata);

    // convert the dict data to hierarchy format
    var hier_data = {"children": rawdata};
    

	var diameter = 380;
	var color = d3.scaleOrdinal(d3.schemeCategory20);



    var bubble = d3.pack(hier_data)
        .size([diameter, diameter])
        .padding(1.5);

    svg_bubble = d3.select("#bubble_svg")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

        var nodes = d3.hierarchy(hier_data)
        .sum(function(d) { return d["total_cases"]; });

    var node = svg_bubble.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        }) // filter out the outer bubble
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d["state"] + ": " + d["total_cases"];
        });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d, i) { return color(i); })
        .on("click", function(d) {
        	// store the selected manufacturer name
        	selected_state = d.data['state'];
        	// change the highlighting product names
        	update_manuf(rawdata, state);
    	});

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
        	// console.log(d)
            return d.data["state"].substring(0, d.r / 3);
        })
        .attr("font-size", function(d){
            return d.r/4;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Count;
        })
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");

  

}

function update_manuf(rawdata, state) {
    /* update the selected manufacturer to highlight 
       bars in the bar chart */
    update_barColors(selected_state);
    /* redraw the heatmap */
    update_heatmap(rawdata, selected_state); 








}