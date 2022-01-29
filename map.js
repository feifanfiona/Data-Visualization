
var width_map = 750;
var height_map = 750;
var map_svg, paths;
var onState = 'Alabama';


d3.csv("./data/dataset-1.csv", readcsv);

function readcsv(error, rawdata) {

	

	d3.json("./data/usa_mainland.json", drawUSA_map);

	function drawUSA_map(error, states) {

		var projection = d3.geoEquirectangular()
						   .fitExtent([[0,0], [width_map, height_map]], states);
		
		var geoGenerator = d3.geoPath()
							 .projection(projection);

		map_svg = d3.select("#map_svg")
					.append('svg')
					.attr("width", width_map)
	        		.attr("height", height_map)

		paths = map_svg.selectAll('path')
						   .data(states.features).enter()
						   .append('path')
						   .attr('d', geoGenerator)
						   .style('fill', '#ddd')
						   .style('stroke', '#aaa');

		//console.log(states.features);			

		var texts = map_svg.selectAll('text')
			.data(states.features).enter()
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('alignment-baseline', 'middle')
			.attr('opacity', 0.5)
			.text(function(d) { return d.properties.STUSPS10; })
			.attr('transform', function(d) {
				var center = geoGenerator.centroid(d); // center of state 
				return 'translate (' + center + ')';
			});

		function get_radius(statename) {
			var radius = 0;
			for (const row of rawdata){
				if (row['state'] == statename){
					radius = Number(row['total_cases'])/15000;
				}
			}
			//console.log(statename, radius);
			return radius;

		}


		map_svg.selectAll('circle')
			   .data(states.features).enter()
			   .append('circle')
			   .attr('cx', function(d) {
			   		var center = geoGenerator.centroid(d); 
			   		return center[0];
			   })
			   .attr('cy', function(d) {
			   		var center = geoGenerator.centroid(d); 
			   		return center[1];
			   })
			   .attr("id", function(d) {
			   		var stateabbr = d.properties.STUSPS10;
			   		statename = abbrState(stateabbr, 'name');
			   		return statename;
			   })
			   .attr('r', function(d) {
			   		var stateabbr = d.properties.STUSPS10;
			   		statename = abbrState(stateabbr, 'name');
			   		return get_radius(statename);
			   })
			   .attr('fill', 'steelblue')
			   .attr('opacity', 0.55)
			   // .on("mouseover", selectOnState)
			   // .on("mouseout", handleMouseOut);




	}


}