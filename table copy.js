
function drawTable(groupedData) {
d3.csv("./data/dataset-1.csv", readcsv);

function readcsv(error, rawdata) {

	console.log(rawdata);


			// Create a table
			tabulate(["state", "total_cases"], rawdata);


			function tabulate(columnNames, data) {
				var table = d3.select('#table_svg').append('table')
					.attr("width", 150)
	    			.attr("height", 250);;
				var thead = table.append('thead');
				var	tbody = table.append('tbody');

				// append the header row
				thead.append('tr')
				  .selectAll('th')
				  .data(columnNames)
				  .enter()
				  .append('th')
				  .text(function (d) { 
				  	return d; 
				  });

				// create a row for each object in the data
				var rows = tbody.selectAll('tr')
				  .data(data)
				  .enter()
				  .append('tr')
				  .attr("id", function (d){
				  	return d.state;
				  })
				  .on("mouseover", selectOnState)
		  		  // .on("mouseout", function(d) {
				    // d3.select(this['id']).select('#bar_svg').attr('fill', 'black').attr('d', arc);
				    // d3.select(this['id']).select('#bar_sv').attr('fill', 'black')
				  ;

		  		  // create function selectOnState
		  		  function selectOnState(){
		  		  	var onState = this['id'];
		  		  	console.log(onState);
		  		  	// update the bar chart:
					d3.select('#bar_svg').select("svg").remove();
					draw_barChart(monthDatabyState(onState));
					//update pie chart:
					d3.select('#pie_svg').select("svg").remove();
					draw_pieChart(monthDatabyState(onState));

		  		  }

					 // // create function handleMouseOut
		  		//   function handleMouseOut(){
		  		//   	d3.select(this['id']).select("svg").remove();
		  		  	  
		  		//   }

		  			//create month by state function
			  		 function monthDatabyState(state){
						total_month_state = [];
						for (const row of groupedData) {
							if (row['state'] == state) {
								total_month_state.push(row);
							}
						}
						return total_month_state;
					}
		  		 



				// create a cell in each row for each column
				var cells = rows.selectAll('td')
				  .data(function (row) {
				    return columnNames.map(function (columnName) {
				      return {
				      	key: columnName, 
				      	value: row[columnName]
				      };
				    });
				  })
				  .enter()
				  .append('td')
				  .text(function (d) { 
				  	return d.value; 
				  });

			  return table;
			}
}

}