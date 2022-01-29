
function draw_pieChart(dataset) {

	//console.log(dataset);


	// set the dimensions and margins of the graph
	var width = 450
	    height = 450
	    margin = 40

	// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
	var radius = Math.min(width, height) / 2.5 - margin

	// append the svg object to the div called 'my_dataviz'
	var svg = d3.select("#pie_svg")
				.append("svg")
				    .attr("width", width)
				    .attr("height", height)
				  .append("g")
				    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var color = d3.scaleOrdinal(d3.schemeCategory10);


	// Compute the position of each group on the pie:
	var pie_fn = d3.pie()
	  .value(function(d) {
	  	//console.log(d);
	  	return d.value.cases; })

	var data_ready = pie_fn(d3.entries(dataset))

	//arc generator function.
	var arcGenerator = d3.arc()
		.innerRadius(0)
		.outerRadius(radius)

	svg.selectAll('mySlices')
	  	   .data(data_ready).enter()
	  	  .append('text')
	  	   .text(function(d) {  
	  	   		return d.data['value']['month']; })
	       .attr("transform", function(d) { 
	       		return "translate(" + arcGenerator.centroid(d) + ")";  
	       	})
	       .style("text-anchor", "middle")
	       .style("font-size", 10 )


	// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
	svg
	  .selectAll('whatever')
	  .data(data_ready)
	  .enter()
	  .append('path')
	  .attr('d', d3.arc()
	    .innerRadius(0)
	    .outerRadius(radius)
	  )
	  .attr('fill', function(d,i){ return(color(i)) })
	  .attr("stroke", "black")
	  .style("stroke-width", "2px")
	  .style("opacity", 0.7)

	

}



